// jQuery(document).ready(function ($) {
// 	$(".swiper-container").each(function () {
// 		let effect = $(this).data("effect"),
// 			autoHeight = $(this).data("autoHeight"),
// 			direction = $(this).data("vertical") ? "vertical" : "horizontal",
// 			slidesPerView = $(this).data("slidesPerView"),
// 			spaceBetween = $(this).data("spaceBetween"),
// 			speed = $(this).data("speed"),
// 			autoplay = $(this).data("autoplay"),
// 			autoplayDelay = $(this).data("autoplayDelay"),
// 			disableOnInteraction = $(this).data("disableOnInteraction"),
// 			loop = $(this).data("loop"),
// 			freeMode = $(this).data("freeMode"),
// 			grabCursor = $(this).data("grabCursor"),
// 			bulletClickable = $(this).data("bulletClickable"),
// 			scrollbar = $(this).data("scrollbar"),
// 			scrollbarHide = $(this).data("scrollbarHide"),
// 			scrollbarDraggable = $(this).data("scrollbarDraggable");

// 		let swiperOptions = {
// 			effect: effect,
// 			autoHeight: autoHeight,
// 			direction: direction,
// 			slidesPerView: slidesPerView,
// 			spaceBetween: spaceBetween,
// 			speed: speed,
// 			grabCursor: grabCursor,
// 			loop: loop,
// 			freeMode: freeMode,
// 			autoplay: {
// 				delay: autoplayDelay,
// 				enabled: autoplay > 0,
// 				disableOnInteraction: disableOnInteraction,
// 			},
// 			pagination: {
// 				el: ".swiper-pagination",
// 				clickable: bulletClickable,
// 			},
// 			navigation: {
// 				nextEl: ".swiper-button-next",
// 				prevEl: ".swiper-button-prev",
// 			},
// 			// breakpoints: {
// 			// 	1024: {
// 			// 		slidesPerView: $items,
// 			// 		spaceBetween: $margin
// 			// 	},
// 			// 	768: {
// 			// 		slidesPerView: $items_tablet,
// 			// 		spaceBetween: $margin_tablet
// 			// 	},
// 			// 	320: {
// 			// 		slidesPerView: $items_mobile,
// 			// 		spaceBetween: $margin_mobile
// 			// 	}
// 			// }
// 		};

// 		let swiperSlider = new Swiper($(this), swiperOptions);
// 	});
// });

// // window.addEventListener("DOMContentLoaded", (event) => {
// // 	var swipers = document.querySelectorAll(".swiper-container");

// // 	for (swiper of swipers) {
// // 		const slidesPerView = swiper.getAttribute("data-slides-per-view");
// // 		const spaceBetween = swiper.getAttribute("data-space-between");
// // 		const speed = swiper.getAttribute("data-speed");
// // 		const vertical = swiper.getAttribute("data-vertical") === "true";
// // 		const effect = swiper.getAttribute("data-effect");
// // 		const freeMode = swiper.getAttribute("data-free-mode") === "true";
// // 		const loop = swiper.getAttribute("data-loop") == "true";
// // 		const autoplay = swiper.getAttribute("data-autoplay") === "true";
// // 		const autoplayDelay = swiper.getAttribute("data-autoplay-delay");
// // 		const navigation = swiper.getAttribute("data-navigation") === "true";
// // 		const pagination = swiper.getAttribute("data-pagination") === "true";
// // 		const bulletClickable =
// // 			swiper.getAttribute("data-bullet-clickable") === "true";
// // 		const scrollbar = swiper.getAttribute("data-scrollbar") === "true";
// // 		const scrollbarHide = swiper.getAttribute("data-scrollbar-hide") === "true";
// // 		const scrollbarDraggable =
// // 			swiper.getAttribute("data-scrollbar-draggable") === "true";

// // 		window.mySwiper = null;
// // 		window.mySwiper = new Swiper(".swiper-container", {
// // 			autoplay: autoplay
// // 				? {
// // 						delay: autoplayDelay,
// // 				  }
// // 				: false,
// // 			loop: loop,
// // 			freeMode: freeMode,
// // 			direction: vertical ? "vertical" : "horizontal",
// // 			navigation: navigation
// // 				? {
// // 						nextEl: ".swiper-button-next",
// // 						prevEl: ".swiper-button-prev",
// // 				  }
// // 				: false,
// // 			pagination: pagination
// // 				? {
// // 						el: ".swiper-pagination",
// // 						clickable: bulletClickable,
// // 				  }
// // 				: false,
// // 			scrollbar: scrollbar
// // 				? {
// // 						el: ".swiper-scrollbar",
// // 						hide: scrollbarHide,
// // 						draggable: scrollbarDraggable,
// // 				  }
// // 				: false,
// // 			slidesPerView: slidesPerView,
// // 			spaceBetween: spaceBetween,
// // 			speed: speed,
// // 			effect: effect,
// // 		});
// // 	}
// // });
