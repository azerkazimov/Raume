import { create } from "zustand";
import { UserProps } from "../../helpers/interfaces/user-props";

interface ServiceStore {
    service: UserProps[];
    addService: (item: UserProps) => void;
    removeService: (id: number) => void;
    clearService: () => void;
}


export const useServiceStore = create<ServiceStore>((set) => ({
    service: [],
    addService: (item: UserProps)=> set((state)=>({service: [...state.service, item]})),
    removeService: (id: number)=> set((state)=>({service: state.service.filter((item)=> item.id !== id)})),
    clearService: ()=> set({service: []})
}))