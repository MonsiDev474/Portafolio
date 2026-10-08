const languageToggle = document.querySelector("#language-toggle");
const cache = {};

async function loadTranslations(language) {
	if (cache[language]) return cache[language];

	const response = await fetch(`src/loc/${language}.json`);
	if (!response.ok) throw new Error(`Could not load ${language}.json`);

	cache[language] = await response.json();
	return cache[language];
}

function getTranslation(key, translations) {
	return key
		.split(".")
		.reduce((object, property) => object?.[property], translations);
}

async function setLanguage(language) {
	try {
		const translations = await loadTranslations(language);

		document.documentElement.lang = language;
		try {
			localStorage.setItem("language", language);
		} catch (_e) {}

		document.querySelectorAll("[data-i18n]").forEach((element) => {
			const translation = getTranslation(element.dataset.i18n, translations);
			if (translation === undefined) return;

			if ("i18nHtml" in element.dataset) {
				element.innerHTML = translation;
			} else {
				element.textContent = translation;
			}
		});

		languageToggle.textContent = language === "en" ? "🌎EN" : "🌎ES";
	} catch (error) {
		console.error(error);
	}
}

function getInitialLanguage() {
	let saved = null;
	try {
		saved = localStorage.getItem("language");
	} catch (_e) {}

	if (saved === "en" || saved === "es") return saved;
	return navigator.language.startsWith("es") ? "es" : "en";
}

setLanguage(getInitialLanguage());

languageToggle.addEventListener("click", () => {
	const newLanguage = document.documentElement.lang === "en" ? "es" : "en";
	setLanguage(newLanguage);
});