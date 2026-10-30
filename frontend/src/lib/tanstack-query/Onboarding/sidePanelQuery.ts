import { getPhotoFromIndexedDb } from "../../indexedDB/indexedDB"
import queryKeys from "../queryKeys"

const sidePanelQuery = () => {
    return {
        queryKey : queryKeys.onboarding.photo,
        queryFn : getPhotoFromIndexedDb
    }
}

export default sidePanelQuery