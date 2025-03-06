import axios from "axios";
import store from "@/store";

export const userData = {
	state() {
		return {
			user: {
                // wallet: 100000,
            },
		};
	},

	getters: {
		getUser(state) {
			return state.user;
		},
	},

	mutations: {
		setUser(state, payload) {
			Object.assign(state.user, payload)
		},
	},

	actions: {
		async fetchUserData({ commit }) {
            try {
                const response = await axios.get(
                    "https://webcomp.bsu.ru/api/userData",
                    {
                        headers: {
                            Authorization: `Bearer ${store.getters.getToken}`,
                        },
                    }
                );
                const data = response.data.data;
                commit("setUser", data);
            } catch(error){
                console.error("Error fetching user data : ", error)
            }
		},
	},
};
