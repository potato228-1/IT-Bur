import axios from "axios"
import store from "@/store"

export const userData = {
    state(){
        return {
            user: {},
        }
    },
    
    getters: {
        getUser(state){
            return state.user
        },
    },

    mutations: {
        setUser(state, payload){
            state.user = payload
            console.log("setUser commited")
        }
    },

    actions: {
        async fetchUserData({ commit }){
            console.log("function fetchUserData dispatched")
            const response = await axios.get("https://webcomp.bsu.ru/api/userData", {
                headers:{
                    Authorization: `Bearer ${store.getters.getToken}`
                }
            })
            const data = response.data.data
            commit("setUser", data)
        }
    }
}