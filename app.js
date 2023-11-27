const notificationPanel = document.querySelector(".notification-panel");
const notificationBtn = document.querySelector(".notification-btn");

const profileMenu = document.querySelector(".store-menu");
const profileMenuBtn = document.querySelector(".avatar");

const selectplanPanel = document.querySelector(".select-plan");
const selectplanPanelCloseBtn = Array.from(document.querySelectorAll(".close"));

const setupAccordionBtn = document.querySelector(".setup-accordion button img");
const setups = document.querySelector(".setup");
const numberCompleted = document.querySelector(".progress p span");
const indicator = document.querySelector(".indicator");

var imageElements = document.querySelector("#preloadImages img");

const options = Array.from(document.querySelectorAll(".option"));
const optionHeadings = Array.from(document.querySelectorAll(".option-head"));
const optionContents = Array.from(document.querySelectorAll(".option-content"));
const optionCheckBox = Array.from(
  document.querySelectorAll(".option-form input")
);

// close notification panel and profile menu when anywhere out side it is clicked
window.addEventListener("click", function (e) {
  if (e.target != notificationPanel && !e.target.closest(".notification-btn")) {
    close(notificationPanel);
  }
  if (e.target != profileMenu && !e.target.closest(".avatar")) {
    close(profileMenu);
  }
});

// preload background image used in animation
for (var i = 0; i < imageElements.length; i++) {
  new Image().src = imageElements[i].src;
}

// function to open/display an onboarding step or close
const toggleOptions = (option) => {
  var contentBody = option.children.item(0).children.item(1);
  var contentImg = option.children.item(1);
  options.forEach((optiond) => {
    if (optiond != option) {
      optiond.children.item(0).children.item(1).style.maxHeight = 0;
      optiond.children.item(1).style.maxHeight = 0;
      optiond.style.backgroundColor = "transparent";
    }
  });
  if (
    contentBody.style.maxHeight == "0px" ||
    contentBody.style.maxHeight == ""
  ) {
    option.style.backgroundColor = "#f3f3f3";
    contentBody.style.maxHeight = contentBody.scrollHeight + "px";
    contentImg.style.maxHeight = contentImg.scrollHeight + "px";
  } else {
    // option.style.backgroundColor = "transparent";
    // contentBody.style.maxHeight = 0;
    // contentImg.style.maxHeight = 0;
  }
};

// function to open and close the accordion
const toggleAccordion = (elem) => {
  if (elem.style.maxHeight == "0px" || elem.style.maxHeight == "") {
    elem.style.maxHeight =
      String(
        parseInt(elem.scrollHeight) + parseInt(optionContents[2].scrollHeight)
      ) + "px";
    setupAccordionBtn.style.transform = "rotate(180deg)";
  } else {
    elem.style.maxHeight = 0;
    setupAccordionBtn.style.transform = "rotate(0deg)";
  }
};

// function to close the element selected
const close = (elem) => {
  elem.style.display = "none";
};

// open notification popup when notification button is clicked
notificationBtn.addEventListener("click", () => {
  if (
    notificationPanel.style.display == "none" ||
    notificationPanel.style.display == ""
  ) {
    notificationPanel.style.display = "block";
  } else {
    close(notificationPanel);
  }
});

// open profilw menu when the avatar button is clicked
profileMenuBtn.addEventListener("click", () => {
  if (profileMenu.style.display == "none" || profileMenu.style.display == "") {
    profileMenu.style.display = "block";
  } else {
    close(profileMenu);
  }
});

// close the setup plan panel display to none on click of the close btn
selectplanPanelCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    close(selectplanPanel);
  });
});

// open or close open onboarding steps
options.forEach((option) => {
  option.addEventListener("click", () => {
    toggleOptions(option);
  });
});

// open or close accordion on btn click
setupAccordionBtn.addEventListener("click", () => {
  toggleAccordion(setups);
});

// close and open onboarding step options based on checkbox change
optionCheckBox.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    console.log("something");
    var unCheckedBoxes = optionCheckBox.filter((checkbox) => {
      return !checkbox.checked;
    });
    if (checkbox.checked && unCheckedBoxes.length > 0) {
      toggleOptions(unCheckedBoxes[0].closest(".option"));
    } else {
      checkbox.closest(".option").style.backgroundColor = "transparent";
      checkbox
        .closest(".option")
        .children.item(0)
        .children.item(1).style.maxHeight = 0;
      checkbox.closest(".option").children.item(1).style.maxHeight = 0;
    }
    var numberChecked = optionCheckBox.filter((checkbox) => {
      return checkbox.checked;
    }).length;
    console.log(numberChecked);
    numberCompleted.textContent = `${numberChecked}`;
    indicator.style.transform = `translateX(-${100 - numberChecked * 20}%)`;
  });
});
