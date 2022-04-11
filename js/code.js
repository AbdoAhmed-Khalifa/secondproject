let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".color-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}
// select landing
let landPage = document.querySelector(".landing");
// select icon
let setIcon = document.querySelector(".set-icon .fa-cog");
// select setDiv
let settingBox = document.querySelector(".settings-box");
//change color
const colorList = document.querySelectorAll(".color-list li");

// get array of imgs
let imgArray = [
  "download(1).jpg",
  "download(2).jpg",
  "download(3).jpg",
  "download(4).jpg",
  "download(0).jpg",
];
// chage background image
let randomImgsValue = true;
let backgroundInterval;

let backgroundLocal = localStorage.getItem("background_option");
if (backgroundLocal !== null) {
  if (backgroundLocal === "true") {
    randomImgsValue = true;
  } else {
    randomImgsValue = false;
  }

  document.querySelectorAll(".random-background span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocal === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no ").classList.add("active");
  }
}

//toggle class to icon
setIcon.onclick = function () {
  this.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
};
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});
const randBack = document.querySelectorAll(".random-background span");
randBack.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      randomImgsValue = true;
      randomImg();
      localStorage.setItem("background_option", true);
    } else {
      randomImgsValue = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
function randomImg() {
  if (randomImgsValue === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landPage.style.backgroundImage = `url('image/download(${randomNumber}).jpg')`;
    }, 1000);
  }
}
randomImg();

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillOffsetTop = ourSkills.offsetTop;

  let skillOuterHight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOuterHight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallary = document.querySelectorAll(".gallary img");
ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    overlay.className = "overlay-pop";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");

      let imgText = document.createTextNode(img.alt);

      imgHeading.appendChild(imgText);

      popupBox.appendChild(imgHeading);
    }

    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");

    let closeButtonText = document.createTextNode("x");

    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-button")) {
    e.target.parentElement.remove();

    document.querySelector(".overlay-pop").remove();
  }
});

let allbullets = document.querySelectorAll(".nav-bullets .bullets");
let allLinks = document.querySelectorAll(".landing .header .links");
// scrollIntoView function
function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(allLinks);
scrollToSomeWhere(allbullets);
// active function
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".show-bullets span");
let bulletsConainer = document.querySelector(".nav-bullets");
let bulletsLocalStorage = localStorage.getItem("bullets_option");
if (bulletsLocalStorage !== null) {
  bulletsSpan.forEach((s) => {
    s.classList.remove("active");
    if (bulletsLocalStorage === "block") {
      bulletsConainer.style.display = "block";
      document.querySelector(".show-bullets span.yes").classList.add("active");
    } else {
      bulletsConainer.style.display = "none";
      document.querySelector(".show-bullets span.no").classList.add("active");
    }
  });
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.bullets === "yes") {
      bulletsConainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsConainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
};
