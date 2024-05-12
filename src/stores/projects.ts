import {defineStore} from 'pinia';
import type {Project} from '@/interfaces';

interface State {
    projectList: Map<number, Project>;
    isLoading: boolean;
}

let _database: IDBDatabase;
async function getDatabase(): Promise<IDBDatabase> {
    const promise = new Promise<IDBDatabase>( 
        (resolve, reject): void=>{
            if(_database != undefined){
                resolve(_database)
            }else{
                const request = window.indexedDB.open("asyncdb2",1);
                request.onupgradeneeded = (event) => {
                    const target = event.target as IDBRequest;
                    const database = target.result as IDBDatabase;
                    database.createObjectStore("projects", {keyPath: "id"});
                }
                request.onsuccess = (event) => {
                    const target = event.target as IDBRequest;
                    _database = target.result as IDBDatabase;
                    resolve(_database);
                };
                request.onerror = (event) => {
                    console.log("ERROR: DBをオープンできません。");
                    reject(new Error("ERROR: DBをオープンできません。"));
                }
            }
            
        }
    );
    return promise;
}

export const useProjectsStore = defineStore({
    id: 'projects',
    state: (): State => {
        return {
            projectList: new Map<number, Project>(),
            isLoading: true
        };
    },
    getters: {
        getById: (state) => {
            return (id: number): Project => {
                const project = state.projectList.get(id) as Project;
                return project;
            } 
        }
    },
    actions: {
        async prepareProjectList(): Promise<boolean> {
            const database = await getDatabase();
            const promise = new Promise<boolean>(
                (resolve,reject) => {
                    // トランザクションを取得する
                    const transaction = database.transaction("projects","readonly");
                    // projectsオブジェクトを取得する
                    const objectStore = transaction.objectStore("projects");
                    // 空のprojectsListを生成する
                    const projectList = new Map<number, Project>();
                    // projectsオブジェクトストアの全データを取得する
                    const request = objectStore.openCursor();
                    // データ取得が成功した場合の処理を登録する
                    request.onsuccess = (event) => {
                        // カーソルオブジェクトを取得する
                        const target = event.target as IDBRequest;
                        const cursor = target.result as IDBCursorWithValue;
                        if(cursor){
                            const id = cursor.key as number;
                            const project = cursor.value as Project;
                            projectList.set(id, project)
                            cursor.continue();
                        }
                    }
                    // トランザクションが成功した場合の処理を登録する
                    transaction.oncomplete = () => {
                        this.projectList = projectList;
                        this.isLoading = false;
                        resolve(true)
                    }
                    // トランザクションが失敗した場合の処理を登録する
                    transaction.onerror = (event) => {
                        console.log("ERROR: データ取得に失敗", event);
                        reject(new Error("ERROR: データ取得に失敗"));
                    }
                }
            );
            return promise;
        },
        async insertProject(project: Project): Promise<boolean> {
            // projectオブジェクトを生成する
            const projectAdd: Project = {
                ...project
            };
            // データベースオブジェクトを取得する
            const database = await getDatabase();
            const promise = new Promise<boolean>(
                (resolve,reject)=>{
                    const transaction = database.transaction("projects","readwrite");
                    const objectStore = transaction.objectStore("projects");
                    objectStore.put(projectAdd)
                    transaction.oncomplete = () => {
                        resolve(true)
                    };
                    transaction.onerror = (event) => {
                        console.log("ERROR: データ登録に失敗", event);
                        reject(new Error("ERROR: データ登録に失敗"));
                    }
                }
            );
            return promise
        },
        async updateProject(projectId: number, newStatus: string): Promise<boolean> {
            // データベースオブジェクトを取得する
            const database = await getDatabase();
            const promise = new Promise<boolean>((resolve, reject) => {
                // 読み書きトランザクションを開始する
                const transaction = database.transaction("projects", "readwrite");
                const objectStore = transaction.objectStore("projects");
                
                // プロジェクトを取得し、ステータスを更新する
                const request = objectStore.get(projectId);
                request.onsuccess = () => {
                    const project = request.result as Project;
                    if (project) {
                        // ステータスを更新
                        project.status = newStatus;
                        // プロジェクトを保存
                        const updateRequest = objectStore.put(project);
                        updateRequest.onsuccess = () => {
                            resolve(true);
                        };
                        updateRequest.onerror = (event) => {
                            console.error("Failed to update project:", event);
                            reject(new Error("Failed to update project"));
                        };
                    } else {
                        console.error("Project not found");
                        reject(new Error("Project not found"));
                    }
                };
                request.onerror = (event) => {
                    console.error("Failed to get project:", event);
                    reject(new Error("Failed to get project"));
                };
        
                // トランザクションの完了時の処理を登録する
                transaction.oncomplete = () => {
                    console.log("Transaction completed successfully");
                };
        
                // トランザクションの失敗時の処理を登録する
                transaction.onerror = (event) => {
                    console.error("Transaction failed:", event);
                };
            });
        
            return promise;
        }
        
    },
})
