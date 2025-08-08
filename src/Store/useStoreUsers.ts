import { create } from "zustand";
import type { IUser } from "../types/IUser";
import { getAllUsers, getByUsername } from "../cruds/crudUsers";

interface IUseStoreUsers {
    users : IUser[]
    activeUser: IUser | null
    loginUser : IUser | null
    setLoginUSer : (incommingUSer : string | null) => void
    setActiveUser : (incommingUser : IUser | null) => void,
    fetchUser : () => Promise<void>
}

export const useStoreUser = create<IUseStoreUsers>((set) => ({
    users : [],
    activeUser: null,
    loginUser : null, // Usuario logueado

    setLoginUSer : async(incommingUser) => {
        if (incommingUser === null){
            set({loginUser : null})
        } else {
            const fetchedUser = await getByUsername(incommingUser)
            set({loginUser : fetchedUser})
        }
    }, 

    setActiveUser : (incommingUser) => set({activeUser: incommingUser}),

    fetchUser: async() => {
        const fetchedUser = await getAllUsers()
        if (fetchedUser) {
            set({users : fetchedUser})
        } else {
            set({users : []})
        }
        
    }

}))