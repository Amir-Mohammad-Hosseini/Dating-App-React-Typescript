import {create} from "zustand"
import {devtools , persist} from "zustand/middleware"
import createUserSlice, { type UserSlice } from "./slices/createUserSlice"
const useAppStore = create<UserSlice>()(
    devtools(
        persist((...args) =>({
            ...createUserSlice(...args)
        }) , {
            name  : "ember-dating-store"
        })
    )
)

export default useAppStore