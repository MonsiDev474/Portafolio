// BURGER BUTTON --------------------------------------------------------------------------------------

const burgerMenuToggle = document.querySelector("#burger-menu-toggle");
const navCollapsibles = document.querySelector(".nav-collapsibles");

burgerMenuToggle.addEventListener("click", () => {
	const isOpen = navCollapsibles.classList.toggle("open");

	burgerMenuToggle.setAttribute("aria-expanded", isOpen);
	burgerMenuToggle.setAttribute(
		"aria-label",
		isOpen ? "Close navigation menu" : "Open navigation menu",
	);
});

function resetBurgerOnBigWindow() {
	if (window.innerWidth >= 850) {
		navCollapsibles.classList.remove("open");
		burgerMenuToggle.setAttribute("aria-expanded", "false");
		burgerMenuToggle.setAttribute("aria-label", "Open navigation menu");
	}
}

window.addEventListener("resize", resetBurgerOnBigWindow);
resetBurgerOnBigWindow();
