<template>
	<div class="alert alert-danger" role="alert" v-if="wrongData">
		Неверно введён логин или пароль
	</div>
	<LoginForm
		v-model:login="login"
		v-model:password="password"
		@sendData="sendData()"
	/>
</template>
<script>
import LoginForm from "@/components/forms/LoginForm.vue";

export default {
    name: "LoginPage",
    beforeCreate() {
        (document.body.className = "text-center"),
            (document.getElementById("app").style.width = "100%");
    },
    components: {
        LoginForm,
    },
    data() {
        return {
            login: "",
            password: "",
            wrongData: false,
        };
    },
    methods: {
        sendData() {
            let self = this;
            this.$store
                .dispatch("login", {
                    login: this.login,
                    password: this.password,
                })
                .then(() => this.$router.push({ path: "/admin" }))
                .catch(() => {
                    self.wrongData = true;
                });
        },
    },
};
</script>
<style scoped src="@/assets/css/signin.css"></style>
