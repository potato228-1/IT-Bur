import axios from "axios";
import store from "@/store";

export const bids = {
	state() {
		return {
			allBids: [],
			userBids: {},
		};
	},

	getters: {
		getAllBids(state) {
			return state.allBids;
		},

		getUserBids(state) {
			return state.userBids;
		},
	},

	mutations: {
		setAllBids(state, payload) {
			state.allBids = payload;
		},

		setUserBids(state, payload) {
			state.userBids = payload;
		},
	},

	actions: {
		async fetchUserBids({ commit }) {
			try {
				const response = await axios.get(
					"https://webcomp.bsu.ru/api/2025/userBids",
					{
						headers: {
							Authorization: `Bearer ${store.getters.getToken}`,
						},
					}
				);
				const data = response.data.data;
				commit("setUserBids", data);
			} catch (error) {
				console.error("Error fetching user bids : ", error);
			}
		},

		async fetchAllBids({ commit }) {
			try {
				const response = await axios.get(
					"https://webcomp.bsu.ru/api/2025/allBids"
				);
				const data = response.data.data;
				commit("setAllBids", data);
			} catch (error) {
				console.error("Error fetching all bids : ", error);
			}
		},
	},
};
