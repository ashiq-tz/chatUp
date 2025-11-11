import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useChatStore = create ((set,get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    messagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,


    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab: (tab) => {
        set({activeTab: tab})
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser: selectedUser})
    }, 
    
    getAllContacts: async () => {
        set({isUsersLoading: true})

        try {
            const res = await axiosInstance.get("/messages/contacts")
            set({allContacts: res.data})

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in useChatStore/getAllContacts", error)
        }finally{
            set({isUsersLoading: false})
        }
    },

    getMyChatPartners: async () => {
        set({isUsersLoading: true})

        try {
            const res = await axiosInstance.get("/messages/chats")
            set({chats: res.data})
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in useChatStore/getMyChatPartners", error);
        }finally{
            set({isUsersLoading: false})
        }
    },

}))