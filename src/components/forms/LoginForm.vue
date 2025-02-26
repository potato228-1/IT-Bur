<template>
	<form class="form-signin" @submit.prevent>
		<router-link to="/">
			<img
				class="mb-4"
				src="/img/BSU_logo.svg"
				alt=""
				width="72"
				height="72"
			/>
		</router-link>
		<h1 class="h3 mb-3 font-weight-normal">
			Пожалуйста, войдите в личный кабинет
		</h1>
		<label for="inputEmail" class="sr-only">Ваш e-mail</label>
		<input
			type="email"
			id="inputEmail"
			class="form-control mt-1"
			placeholder="E-mail"
			required=""
			autofocus=""
			:value="login"
			@input="($event) => $emit('update:login', $event.target.value)"
		/>
		<label for="inputPassword" class="sr-only mt-3">Пароль</label>
		<input
			type="password"
			id="inputPassword"
			class="form-control mt-1"
			placeholder="Пароль"
			required=""
			@input="($event) => $emit('update:password', $event.target.value)"
		/>
		<div class="checkbox mb-3">
			<label>
				<input type="checkbox" value="remember-me" />
				Запомнить меня
			</label>
		</div>
		<button
			class="btn btn-lg btn-primary btn-block"
			type="submit"
			@click="$emit('sendData')"
		>
			Войти
		</button>
		<p class="mt-5 mb-3 text-muted">
			© {{ new Date().getFullYear() }} Мы будущее ИТ Бурятии
		</p>
	</form>
</template>
<script>
	export default {
		name: "LoginForm",
		props: ["login", "password"],
		emits: ["update:login", "update:password", "sendData"],
	};
</script>
