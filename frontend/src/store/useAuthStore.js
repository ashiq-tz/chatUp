import {create} from 'zustand'

export const useAuthStore = create((set,get) => ({
    authUser: {name:"john",_id:123,age:23},
    isLoading: false,

    login: ()=> {
        console.log("logged in");
    }
}))