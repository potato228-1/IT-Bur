<script setup>
import { ref, onMounted, watch } from "vue";

const theme = ref("lightTheme");
const html = ref(null);

onMounted(() => {
  html.value = document.querySelector("html");
  const localTheme = localStorage.getItem("theme");
  if (localTheme) {
    theme.value = localTheme;
  }
});

watch(theme, (newTheme) => {
  if (newTheme === "lightTheme") {
    html.value?.classList.remove("darkTheme");
    html.value?.classList.add("lightTheme");
  } else {
    html.value?.classList.remove("lightTheme");
    html.value?.classList.add("darkTheme");
  }
  localStorage.setItem("theme", newTheme);
});

const toggleTheme = () => {
  theme.value = theme.value === "lightTheme" ? "darkTheme" : "lightTheme";
};
</script>

<template>
  <div class="switcher_container">
    <input
      type="checkbox"
      id="themeSwitcher"
      class="input_switcher"
      @change="toggleTheme"
      :checked="theme === 'darkTheme'"
    />
    <label class="switcher" for="themeSwitcher">
      <svg
        class="switcher_icon icon_sun"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>

      <svg
        class="switcher_icon icon_moon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>

      <div class="switcher_circle"></div>
    </label>
  </div>
</template>

<style scoped>
.switcher {
  display: flex;
  align-items: center;
  border-radius: 100px;
  gap: 16px;
  padding: 8px 16px;
  position: relative;
  background: var(--textColor);
  cursor: pointer;
}

.switcher_icon {
  width: 22px;
  fill: var(--main-bg);
  stroke: var(--main-bg);
}

.input_switcher {
  display: none;
}

.switcher_circle {
  background: var(--main-bg);
  border-radius: 100px;
  width: 24px;
  aspect-ratio: 1;
  position: absolute;
  left: 60%;
  transition: 0.3s all;
}

.input_switcher:checked + .switcher .switcher_circle {
  left: 20%;
}

.input_switcher:checked + .switcher {
  background: white;
}
</style>
