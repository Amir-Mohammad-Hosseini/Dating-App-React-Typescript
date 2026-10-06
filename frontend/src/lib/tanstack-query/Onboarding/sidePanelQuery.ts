import { getPhotoFromIndexedDb } from "../../indexedDB/indexedDB"

const sidePanelQuery = () => {
    return {
        queryKey : ["onboarding-photo"],
        queryFn : getPhotoFromIndexedDb
    }
}

export default sidePanelQuery