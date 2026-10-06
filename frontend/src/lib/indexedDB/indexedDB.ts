import {set , get , del} from "idb-keyval"

const KEY = "onboarding-photo"

export const savePhotoIntoIndexedDb =async (file : File) => {
    await set(KEY , file)
}
export const getPhotoFromIndexedDb = () => {
    return get(KEY)
}
export const deletePhotoFromIndexedDb = async () => {
    await del(KEY)
}
