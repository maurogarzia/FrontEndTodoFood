import { create } from "zustand";
import type { IImage } from "../types/IImage";
import { getAllImages } from "../cruds/crudImages";

interface IUseStoreImages {
    images : IImage[]
    activeImage: IImage | null
    setActiveImage : (incommingImage : IImage | null) => void,
    fetchImage : () => Promise<void>
}

export const useStoreImage = create<IUseStoreImages>((set) => ({
    images : [],
    activeImage: null,

    setActiveImage : (incommingImage) => set({activeImage: incommingImage}),

    fetchImage: async() => {
        const fetchedImage = await getAllImages()
        if (fetchedImage) {
            set({images : fetchedImage})
        } else {
            set({images : []})
        }
        
    }

}))