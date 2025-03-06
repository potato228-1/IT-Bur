<template>
	<div class="auth-wrapper">
		<form class="auth-form" @submit.prevent>
			<div class="logo-container">
				<router-link to="/">
					<img
						class="logo"
						src="/img/BSU_logo.svg"
						alt="Логотип БГУ"
						width="100"
						height="100"
					/>
				</router-link>
			</div>

			<h1 class="title">Добро пожаловать в личный кабинет</h1>

			<div class="form-group">
				<label for="inputEmail" class="form-label"
					><p class="form-content">E-mail</p></label
				>
				<div class="input-container">
					<input
						type="email"
						id="inputEmail"
						class="form-input"
						placeholder="example@bsu.ru"
						required
						autofocus
						:value="login"
						@input="
							($event) =>
								$emit('update:login', $event.target.value)
						"
					/>
					<i class="icon icon-email"></i>
				</div>
			</div>

			<div class="form-group">
				<label for="inputPassword" class="form-label"
					><p form-content>Пароль</p></label
				>
				<div class="input-container">
					<input
						type="password"
						id="inputPassword"
						class="form-input"
						placeholder="••••••••"
						required
						:value="password"
						@input="
							($event) =>
								$emit('update:password', $event.target.value)
						"
					/>
					<i class="icon icon-lock"></i>
				</div>
			</div>

			<div class="form-options">
				<label class="checkbox-container">
					<input type="checkbox" class="checkbox-input" />
					<span class="checkbox-custom"></span>
					<span class="checkbox-label">Запомнить меня</span>
				</label>
			</div>

			<button class="submit-btn" type="submit" @click="$emit('sendData')">
				Войти
			</button>

			<p class="footer-text">
				© {{ new Date().getFullYear() }} Мы — будущее ИТ Бурятии
			</p>
		</form>
	</div>
</template>

<script>
	export default {
		name: "LoginForm",
		props: ["login", "password"],
		emits: ["update:login", "update:password", "sendData"],
	};
</script>

<style scoped>
	.auth-wrapper {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		padding: 2rem;
	}

	.auth-form {
		padding: 3rem 2.5rem;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 440px;
		transition: transform 0.3s ease;
	}

	.auth-form:hover {
		transform: translateY(-5px);
	}

	.logo-container {
		text-align: center;
		margin-bottom: 2rem;
	}

	.logo {
		transition: transform 0.3s ease;
	}

	.logo:hover {
		transform: rotate(15deg) scale(1.1);
	}

	.title {
		text-align: center;
		color: #ffff;
		font-size: 1.8rem;
		margin-bottom: 2rem;
		font-weight: 600;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-label {
		display: block;
		color: blue;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.input-container {
		position: relative;
	}

	.form-input {
		width: 100%;
		padding: 0.8rem 1rem 0.8rem 2.5rem;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: #4299e1;
		box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
	}

	.icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
	}

	.icon-email {
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23738fad"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>');
	}
	.icon-lock {
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23738fad"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>');
	}

	.form-options {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1.5rem 0;
	}

	.checkbox-container {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.checkbox-input {
		opacity: 0;
		position: absolute;
	}

	.checkbox-custom {
		display: inline-block;
		width: 18px;
		height: 18px;
		border: 2px solid #cbd5e0;
		border-radius: 4px;
		margin-right: 0.5rem;
		position: relative;
		transition: all 0.2s ease;
	}

	.checkbox-input:checked + .checkbox-custom {
		background: #4299e1;
		border-color: #4299e1;
	}

	.checkbox-input:checked + .checkbox-custom::after {
		content: "";
		position: absolute;
		left: 4px;
		top: 1px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.submit-btn {
		width: 100%;
		padding: 1rem;
		background: #4299e1;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.submit-btn:hover {
		background: #3182ce;
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);
	}

	.footer-text {
		text-align: center;
		color: #718096;
		margin-top: 2rem;
		font-size: 0.9rem;
	}
</style>

<style scoped>
	.auth-wrapper {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: none;
	}

	.auth-form {
		padding: 3rem 2.5rem;
		border-radius: 20px;
		border: 2px solid #4299e1;
		box-shadow: none;
		width: 100%;
		max-width: 440px;
		transition: transform 0.3s ease;
	}

	.auth-form:hover {
		transform: translateY(-5px);
	}

	.logo-container {
		text-align: center;
		margin-bottom: 2rem;
	}

	.logo {
		transition: transform 0.3s ease;
	}

	.logo:hover {
		transform: rotate(15deg) scale(1.1);
	}

	.title {
		text-align: center;
		color: inherit;
		font-size: 1.8rem;
		margin-bottom: 2rem;
		font-weight: 450;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-label {
		display: block;
		color: #4a5568;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.form-co .input-container {
		position: relative;
	}

	.form-input {
		width: 100%;
		padding: 0.8rem 1rem 0.8rem 2.5rem;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: #4299e1;
		box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
	}

	.icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
	}

	.icon-email {
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23738fad"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>');
	}
	.icon-lock {
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23738fad"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>');
	}

	.form-options {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1.5rem 0;
	}

	.checkbox-container {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.checkbox-input {
		opacity: 0;
		position: absolute;
	}

	.checkbox-custom {
		display: inline-block;
		width: 18px;
		height: 18px;
		border: 2px solid #cbd5e0;
		border-radius: 4px;
		margin-right: 0.5rem;
		position: relative;
		transition: all 0.2s ease;
	}

	.checkbox-input:checked + .checkbox-custom {
		background: #4299e1;
		border-color: #4299e1;
	}

	.checkbox-input:checked + .checkbox-custom::after {
		content: "";
		position: absolute;
		left: 4px;
		top: 1px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.forgot-password {
		color: #4299e1;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s ease;
	}

	.forgot-password:hover {
		color: #3182ce;
	}

	.submit-btn {
		width: 100%;
		padding: 1rem;
		background: #4299e1;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.submit-btn:hover {
		background: #3182ce;
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);
	}

	.footer-text {
		text-align: center;
		color: #718096;
		margin-top: 2rem;
		font-size: 0.9rem;
	}
</style>
`
