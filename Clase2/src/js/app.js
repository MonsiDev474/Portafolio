const themeToggle = document.querySelector("#theme-toggle");
const thumbIcon = document.querySelector(".thumb-icon");

function updateThemeIcon() {
	const theme = document.documentElement.dataset.theme;

	thumbIcon.textContent = theme === "dark" ? "☾" : "☀";
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
	const currentTheme = document.documentElement.dataset.theme;
	const newTheme = currentTheme === "dark" ? "light" : "dark";

	document.documentElement.dataset.theme = newTheme;
	localStorage.setItem("theme", newTheme);

	updateThemeIcon();
});

const translations = {
	en: {
		head: {
			profession: "Programming Technician",
		},
		nav: {
			about: "About me",
			projects: "Projects",
			experience: "Experience",
			contact: "Contact",
		},
	},

	es: {
		head: {
			profession: "Técnico en Programación",
		},
		nav: {
			about: "Sobre mí",
			projects: "Proyectos",
			experience: "Experiencia",
			contact: "Contacto",
		},
	},
};

function getTranslation(key, language) {
	return key
		.split(".")
		.reduce((object, property) => object?.[property], translations[language]);
}

function setLanguage(language) {
	document.documentElement.lang = language;
	localStorage.setItem("language", language);

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key = element.dataset.i18n;
		const translation = getTranslation(key, language);

		if (translation) {
			element.textContent = translation;
		}
	});

	languageToggle.textContent = language === "en" ? "🌎EN" : "🌎ES";
}

const languageToggle = document.querySelector("#language-toggle");
const currentLanguage = document.documentElement.lang === "es" ? "es" : "en";

setLanguage(currentLanguage);

languageToggle.addEventListener("click", () => {
	const currentLanguage = document.documentElement.lang;
	const newLanguage = currentLanguage === "en" ? "es" : "en";

	setLanguage(newLanguage);
});

const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});
