import { createStore } from "vuex";

// Modules
import { loginInfo } from "./modules/loginInfo";
import { userData } from "./modules/userData";

export default createStore({
	modules: {
		loginInfo,
		userData,
	},
});
