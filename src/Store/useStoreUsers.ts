import { create } from "zustand";
import type { IUser } from "../types/IUser";
import { getAllUsers } from "../cruds/crudUsers";

interface IUseStoreUsers {
    users : IUser[]
    activeUser: IUser | null
    loginUser : IUser | null
    setLoginUSer : (incommingUSer : IUser | null) => void
    setActiveUser : (incommingUser : IUser | null) => void,
    fetchUser : () => Promise<void>
}

export const useStoreUser = create<IUseStoreUsers>((set) => ({
    users : [],
    activeUser: null,
    loginUser : null, // Usuario logueado
    

    setLoginUSer : (incommingUser) => set({loginUser : incommingUser}), 


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