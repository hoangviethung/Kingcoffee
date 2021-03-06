// import here !!!
import loading from './lib/loading';
import GGMapInit from './lib/map';
// Script Cho Tab
class Tab {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]")
			this.contentList = this.selector.querySelectorAll("[tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				targetDOM.style.display = "block",
					setTimeout(() => {
						targetDOM.classList.add("show")
					}, 50);
			})
		})
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

// CONTROL SVG
function SVG() {
	jQuery('img.svg').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');
	});
}

// SLIDER
function homeSlider() {
	var homeSlider = new Swiper('.slider-Home .swiper-container', {
		speed: 400,
		effect: 'fade',
		simulateTouch: false,
		pagination: {
			el: '.slider-Home .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		// Disable preloading of all images
		preloadImages: false,
		// Enable lazy loading
		lazy: true
	});
}

function branchSlider() {
	var branchSlider = new Swiper('.slider-Branch .swiper-container', {
		speed: 400,
		slidesPerView: 5,
		spaceBetween: 40,
		simulateTouch: false,
		breakpoints: {
			768: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			375: {
				slidesPerView: 2,
				spaceBetween: 10,
			}
		},
		// Disable preloading of all images
		preloadImages: false,
		// Enable lazy loading
		lazy: true,
		navigation: {
			nextEl: '.slider-Branch .swiper-button-prev',
			prevEl: '.slider-Branch .swiper-button-next',
		},
	});
}

function sliderCustomer() {
	var sliderCustomer = new Swiper('.slider-Customer .swiper-container', {
		speed: 400,
		effect: 'fade',
		autoplay: {
			delay: 3000,
		},
		simulateTouch: false,
		loop: true,
		navigation: {
			nextEl: '.slider-Customer .swiper-button-prev',
			prevEl: '.slider-Customer .swiper-button-next'
		}
	})
}
// SHOW MENU IN MOBILE
function showMenuMobile() {
	$('.button-mobile').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).siblings('.list-nav').toggleClass('active');
		$('body').toggleClass('disabled');
		$('.overlay').toggleClass('active');
	});

	$('.overlay').click(function(e) {
		e.preventDefault();
		$(this).removeClass('active')
		$('.list-nav').removeClass('active');
		$('body').removeClass('disabled');
		$('.button-mobile').toggleClass('active');
	});
}

function activeMenu() {
	if ($(window).scrollTop() > 0) {
		$("header").addClass("active")
	} else {
		$("header").removeClass("active")
	}
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	// LOADING
	loading();
	// SVG CONTROL
	SVG();
	// GOOGLE MAP
	GGMapInit();
	// SLIDER
	homeSlider();
	branchSlider();
	sliderCustomer();
	// HEADER
	showMenuMobile();
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {
	activeMenu();
})