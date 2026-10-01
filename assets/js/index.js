
// https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript

var settingsSidebar = document.getElementById("settings-sidebar");
var settingsToggleBtn = document.getElementById("settings-toggle");
var themeToggleBtn = document.getElementById("theme-toggle-button");
var html = document.getElementById("rootElement");
var fontBtns = document.querySelectorAll(".font-option");
var themeColorsGrid = document.getElementById("theme-colors-grid");
var spanContent = document.getElementsByTagName("span");
var changeBgLinear = document.querySelector(".bg-linear-to-b");
var changeBgPrimary = document.querySelectorAll(".bg-primary");
var bgLinearToR = document.querySelectorAll(".bg-linear-to-r");
var links = document.querySelectorAll(".nav-links a");
links[0].classList.add("active");
var heroSection = document.getElementById("hero-section");
var sectionAbout = document.getElementById("about");
var sectionPortfolio = document.getElementById("portfolio");
var sectionExperience = document.getElementById("experience");
var testimonials = document.getElementById("testimonials");
var contact = document.getElementById("contact");

var portfolioItems = document.querySelectorAll(".portfolio-item");
var btnPortfolioFilter = document.querySelectorAll(".portfolio-filter");



var selectedFont = localStorage.getItem("selectedFont") || "font-tajawal";
var bodyElement = document.body;
bodyElement.classList.remove("font-tajawal");
bodyElement.classList.add(`${selectedFont}`)
var isGearClicked = false;
var isLightMode = false;
var colors = ["#6366f1", "#ec4899", "#10b981", "#3b82f6", "#ef4444", "#f59e0b"];
var themeContainer = ``;

settingsToggleBtn.addEventListener("click", function () {
    isGearClicked = !isGearClicked;
    if (isGearClicked) {
        settingsSidebar.classList.remove("translate-x-full");
        settingsSidebar.classList.add("translate-x-0");
    } else {
        closeToogleMenu();
    }
});

themeToggleBtn.addEventListener("click", function () {
    isLightMode = !isLightMode;
    if (isLightMode) {
        html.classList.remove("dark");
        return;
    }
    html.classList.add("dark");
});

for (var i = 0; i < fontBtns.length; i++) {
    fontBtns[i].addEventListener("click", function (eventInfo) {
        var currentFont = eventInfo.currentTarget.dataset["font"];
        localStorage.setItem("selectedFont", `font-${currentFont}`);
        bodyElement.classList.remove("font-tajawal");
        bodyElement.classList.add(`font-${currentFont}`);
    })
}

function closeToogleMenu() {
    settingsSidebar.classList.add("translate-x-full");
    settingsSidebar.classList.remove("translate-x-0");
}

for (var i = 0; i < colors.length; i++) {
    themeContainer += `<div data-color = "${colors[i]}" style="background-color: ${colors[i]};" onclick = "changeColor(${i})">
    
                      </div>`
}

themeColorsGrid.innerHTML = themeContainer;

function changeColor(colorIndex) {
    for (var j = 0; j < spanContent.length; j++) {
        spanContent[j].setAttribute("style", `color:${colors[colorIndex]};`);
    }

    changeBgLinear.classList.remove("bg-linear-to-b");
    changeBgLinear.setAttribute("style", `background-color : ${colors[colorIndex]}`);

    for (var i = 0; i < changeBgPrimary.length; i++) {
        changeBgPrimary[i].setAttribute("style", `background-color : ${colors[colorIndex]}`);
    }

    for (var a = 0; a < bgLinearToR.length; a++) {
        bgLinearToR[a].classList.remove("bg-linear-to-r");
        bgLinearToR[a].setAttribute("style", `background-color : ${colors[colorIndex]}`)
    }
}

window.addEventListener("scroll", function () {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
    var heroTop = heroSection.offsetTop;
    var heroBottom = heroTop + heroSection.offsetHeight;
    
    var aboutTop = sectionAbout.offsetTop;
    var aboutBottom = aboutTop + sectionAbout.offsetHeight;

    var portfolioTop = sectionPortfolio.offsetTop;
    var portfolioBottom = portfolioTop + sectionPortfolio.offsetHeight;
    
    var experienceTop = sectionExperience.offsetTop;
    var experienceBottom = experienceTop + sectionExperience.offsetHeight;

    var testimonialsTop = testimonials.offsetTop;
    var testimonialsBottom = testimonialsTop + testimonials.offsetHeight;

    var contactTop = contact.offsetTop;
    var contactBottom = contactTop + contact.offsetHeight;

    if (scrollY >= heroTop && scrollY < heroBottom) {
        activateLink(heroSection);
    }

    if (scrollY >= aboutTop && scrollY < aboutBottom) {
        activateLink(sectionAbout);
    }
    else if (scrollY >= portfolioTop && scrollY < portfolioBottom) {
        activateLink(sectionPortfolio);
    }
    else if (scrollY >= experienceTop && scrollY < experienceBottom) {
        activateLink(sectionExperience);
    } 
    else if (scrollY >= testimonialsTop && scrollY < testimonialsBottom) {
        activateLink(testimonials);
    } 
    else if (scrollY >= contactTop && scrollY < contactBottom) {
        activateLink(contact);
    }
})

function activateLink(element) {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
    var sectionId = element.getAttribute("id");
    var link = document.querySelector(`a[href="#${sectionId}"]`);
    link.classList.add("active");
}


for (var i = 0; i < btnPortfolioFilter.length; i++) {
    btnPortfolioFilter[i].addEventListener("click", function (e) {
        if (e.target.dataset.filter == "all") {
            showAllCategories(e.target);
            return;
        }
        showCategories(e.target.dataset.filter, e.target);
    });

}


function showCategories(cat, btnCategoryElement) {
    btnCategoryElement.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "shadow-lg");
    for (var i = 0; i < portfolioItems.length; i++) {
        if (portfolioItems[i].dataset.category == `${cat}`) {
            portfolioItems[i].classList.add("block");
            portfolioItems[i].classList.remove("hidden");

        } else {
            portfolioItems[i].classList.remove("block");
            portfolioItems[i].classList.add("hidden");

        }
    }

    for (var j = 0; j < btnPortfolioFilter.length; j++) {
        if (btnPortfolioFilter[j].dataset.filter !== `${cat}`) {
            btnPortfolioFilter[j].classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "shadow-lg");
        }
    }

}

function showAllCategories(btnCategoryElement) {
    btnCategoryElement.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "shadow-lg");
    for (var i = 0; i < portfolioItems.length; i++) {
        portfolioItems[i].classList.add("block");
        portfolioItems[i].classList.remove("hidden");
    }

    for (var j = 0; j < btnPortfolioFilter.length; j++) {
        if (btnPortfolioFilter[j].dataset.filter !== `all`) {
            btnPortfolioFilter[j].classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "shadow-lg");
        }
    }
}