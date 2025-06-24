import { databases } from "$lib/appwrite"
import { user } from "$lib/auth/user"
import { ID, Permission, Role } from "appwrite"
import { get } from "svelte/store"

const DB_ID = "685af11d000aebaf03dc"
const listsId ="685af1340002ad7b4eb9"
const tasksId = "685af16400286555ca26"


const loadTasks = async () => {
    var docs = await databases.listDocuments(DB_ID, listsId)
    console.log(docs)
}

const createList = async (name : string) => {
    var userData = get(user)
    var userId = userData.userId
    var userRole = Role.user(userId)
    var newDoc = await databases.createDocument('685af11d000aebaf03dc', '685af1340002ad7b4eb9', ID.unique(), {
        name: "Daglige ting 2"
    }, [Permission.read(userRole), Permission.write(userRole), Permission.update(userRole), Permission.delete(userRole)])
}


export { loadTasks, createList };