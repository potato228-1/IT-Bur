import { createStore } from "vuex";

// Modules
import { loginInfo } from "./modules/loginInfo";
import { userData } from "./modules/userData";
import { bids } from "./modules/bids";

export default createStore({
	modules: {
		loginInfo,
		userData,
        bids,
	},
});
