import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const btnClose = document.querySelector(".js-lightbox button[data-action='close-lightbox']");

const pictureList = [];
galleryItems.forEach((el, i) => {
	pictureList.push(`<li><a href="#"><img id="image-${i}" src=${el.preview} data-source=${el.original} alt="${el.description}"></a></li>`);
});
gallery.insertAdjacentHTML("afterbegin", pictureList.join(""));

[...gallery.children].forEach(el => {
	el.classList.add("gallery__item");
	el.querySelector("a").classList.add("gallery__link");
	el.querySelector("img").classList.add("gallery__image");
});

lightbox.insertAdjacentHTML("beforeend", "<button type='button' class='lightbox__button button-left' data-action='show-left'></button>");
lightbox.insertAdjacentHTML("beforeend", "<button type='button' class='lightbox__button button-right' data-action='show-right'></button>");
const btnLeft = document.querySelector(".js-lightbox button[data-action='show-left']");
const btnRight = document.querySelector(".js-lightbox button[data-action='show-right']");

gallery.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);
lightboxOverlay.addEventListener("click", closeModal);
window.addEventListener("keyup", checkKeyboardKey);
btnLeft.addEventListener("click", showGallery);
btnRight.addEventListener("click", showGallery);


function openModal(event) {
	if (event.target.getAttribute("class") === "gallery__image") {
		lightbox.classList.add("is-open");
		lightboxImage.src = event.target.dataset.source;
		lightboxImage.alt = event.target.id;
		checkButtonStatus(+event.target.id.slice(event.target.id.lastIndexOf("-") + 1));
	}
}

function closeModal() {
	lightbox.classList.remove("is-open");
	lightboxImage.src = "";
	lightboxImage.alt = "";
}

function checkKeyboardKey({ key }) {
	if (key === "Escape") {
		lightbox.classList.remove("is-open");
		lightboxImage.src = "";
		lightboxImage.alt = "";
	}
}

function showGallery(event) {
	const index = +lightboxImage.alt.slice(lightboxImage.alt.lastIndexOf("-") + 1);
	const imageList = gallery.querySelectorAll(".gallery__image");

	if (event.target.dataset.action === "show-left") {
		lightboxImage.src = imageList[index - 1].dataset.source;
		lightboxImage.alt = imageList[index - 1].id;
		checkButtonStatus(index - 1);
	} else {
		lightboxImage.src = imageList[index + 1].dataset.source;
		lightboxImage.alt = imageList[index + 1].id;
		checkButtonStatus(index + 1);
	}
}

function checkButtonStatus(index) {
	index === 0 ? btnLeft.disabled = true : btnLeft.disabled = false;
	index === gallery.children.length - 1 ? btnRight.disabled = true : btnRight.disabled = false;
}



