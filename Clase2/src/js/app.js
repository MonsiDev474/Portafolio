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
		main: {
			about: `<div class='about-intro-text'>A curious guy who really gets into it once he gets a grasp of whatever he's doing</div>
			\nHi, I'm Manu. Programming technician who really likes python and would rather avoid java like the plague. Jokes\
			aside though, I like coding in projects of any size and especially seeing the results: a nice, working and efficient program\
			that does what it's supposed to do. I <i>am</i> a bit shy tho, you have to get me out of my shell most of the time, but once I've warmed up to everybody things usually go smoothly.
			\nMy favourite pastimes are listening to music (mostly game OSTs, EDM and nu metal), playing and modding games (mostly PAYDAY 2 and Source games), reading manga or rewatching old movies that I'd religiously watch as a kid.`
		}
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
		main: {
			about: "Placeholder",
		}
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
			// element.textContent = translation;
			element.innerHTML = translation;
		}
	});

	// languageToggle.textContent = language === "en" ? "🌎EN" : "🌎ES";
	languageToggle.innerHTML = language === "en" ? "🌎EN" : "🌎ES";
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

function resetMenuOnSmallMobile() {
    if (window.innerWidth <= 616) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
}

window.addEventListener("resize", resetMenuOnSmallMobile);
resetMenuOnSmallMobile();
