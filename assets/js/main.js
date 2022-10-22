/*=============== Mostrar barramenu ===============*/
const navMenu = document.getElementById("barramenu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
/*===== Mostrar barramenu =====*/

/* Valido si la constante existe */

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-barramenu");
  });
}
/*===== Ocultar barramenu =====*/

/* Valido si la constante existe */

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-barramenu");
  });
}

/*=============== Tabs de habilidades ===============*/

const tabs = document.querySelectorAll("[data-target]"),
  tabContent = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContent.forEach((tabContents) => {
      tabContents.classList.remove("habilidades__active");
    });
    target.classList.add("habilidades__active");

    tabs.forEach((tab) => {
      tab.classList.remove("habilidades__active");
    });
    tab.classList.add("habilidades__active");
  });
});

/*=============== Filtro portafolio ===============*/

let mixerPortfolio = mixitup(".trabajo__container", {
  selectors: {
    target: ".trabajo__card",
  },
  animation: {
    duration: 300,
  },
});

/*===== Trabajo link activo =====*/
const linkWork = document.querySelectorAll(".trabajo__item");

function activeWork() {
  linkWork.forEach((l) => l.classList.remove("active-trabajo"));
  this.classList.add("active-trabajo");
}
linkWork.forEach((l) => l.addEventListener("click", activeWork));

/*===== Popup de trabajos =====*/

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("trabajo__button")) {
    togglePortafolioPopup();
    portafolioItemDetails(e.target.parentElement);
  }
});
function togglePortafolioPopup() {
  document.querySelector(".portafolio__popup").classList.toggle("open");
}
document
  .querySelector(".portafolio__popup-close")
  .addEventListener("click", togglePortafolioPopup);

function portafolioItemDetails(portafolioItem) {
  document.querySelector(".pp__thumbnail img").src =
    portafolioItem.querySelector(".trabajo__img").src;
  document.querySelector(".portafolio__popup-subtitle span").innerHTML =
    portafolioItem.querySelector(".trabajo__titulo").innerHTML;
  document.querySelector(".portafolio__popup-body").innerHTML =
    portafolioItem.querySelector(".portafolio__item-detalles").innerHTML;
}

/*=============== Modal sección servicios ===============*/

const modalViews = document.querySelectorAll(".servicios__modal"),
  modelBtns = document.querySelectorAll(".servicios__button"),
  modalCloses = document.querySelectorAll(".servicios__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};
modelBtns.forEach((modelBtn, i) => {
  modelBtn.addEventListener("click", () => {
    modal(i);
  });
});
modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*=============== Slider de testimonios ===============*/

let swiper = new Swiper(".testimonios__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});
/*=============== Animación de los input ===============*/

const inputs = document.querySelectorAll(".input");
function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}
function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}
inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

/*=============== Link activo cuando se hace scroll ===============*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);
function navHighlighter() {
  let scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

/*=============== Valido formulario ===============*/

var form = document.getElementById("form-contacto");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML =
          "Gracias, tus datos fueron enviados. Pronto estaré en contacto.";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "¡Ups! Hubo un problema al enviar su formulario";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "¡Ups! Hubo un problema al enviar su formulario";
    });
}
form.addEventListener("submit", handleSubmit);
