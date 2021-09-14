const DIMENSIONS = [16, 16];
let gridOfDivs = [];
let currentMode = "NORMAL";
let currentColor = "#000000";

const root = document.querySelector(":root");
const rootStyle = getComputedStyle(root);

const containerDiv = document.querySelector("#container");

const colorButton = document.querySelector("#normal");
colorButton.addEventListener("click", function() {
  changeMode(this.getAttribute("id"));
  deactivateAllButtons();
  this.classList.add("buttonOn");
});

const colorPicker = document.querySelector("#currentColorInput");
colorPicker.addEventListener("input", function(e) {
  currentColor = e.target.value;
  root.style.setProperty("--color", currentColor);
});

const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", function() {
  changeMode(this.getAttribute("id"));
  deactivateAllButtons();
  this.classList.add("buttonOn");
});

const shadowButton = document.querySelector("#shadow");
shadowButton.addEventListener("click", function() {
  changeMode(this.getAttribute("id"));
  deactivateAllButtons();
  this.classList.add("buttonOn");
});

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", function() {
  changeMode(this.getAttribute("id"));
  deactivateAllButtons();
  this.classList.add("buttonOn");
});

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  let newSquaresPerSide = prompt("How many squares per side? (same as now by default)");

  if (newSquaresPerSide != undefined) {
    if (newSquaresPerSide.trim() == "") {
      newSquaresPerSide = DIMENSIONS[0];
    }
    
    if (!isNaN(Number(newSquaresPerSide))) {
      if (Number(newSquaresPerSide) > 0 && Number(newSquaresPerSide) <= 100) {
        resetPad(Number(newSquaresPerSide));
      }
      else {
        alert("ERROR: Enter a correct number (Max: 100)");
      }
    }
    else {
      alert("ERROR: Enter a correct number");
    }
  }
});

const buttonList = document.querySelectorAll("button");

function createDivs() {
  gridOfDivs = [];
  for (let i=0; i < DIMENSIONS[0]; i++) {
    let currentX = [];
    for (let j=0; j < DIMENSIONS[1]; j++) {
        currentX.push(document.createElement("div"));
    }
    gridOfDivs.push(currentX);
  }

  for (let i=0; i < DIMENSIONS[0]; i++) {
    for (let j=0; j < DIMENSIONS[1]; j++) {
        gridOfDivs[i][j].addEventListener("mousedown", function(e) {
          paintDiv(this);
        });
        gridOfDivs[i][j].addEventListener("mouseenter", function(e) {
          if (e.buttons > 0)
            paintDiv(this);
        });
    }
  }

  for (let i=0; i < DIMENSIONS[0]; i++) {
    for (let j=0; j < DIMENSIONS[1]; j++) {
        containerDiv.appendChild(gridOfDivs[i][j]);
    }
  }
}

function resetDivs() {
  for (let i=0; i < DIMENSIONS[0]; i++) {
    for (let j=0; j < DIMENSIONS[1]; j++) {
        gridOfDivs[i][j].classList.remove("painted");
    }
  }
}

function paintDiv(div) {
  div.style["background-color"] = currentColor;
}

function eraseDiv(div) {
  div.style["background-color"] = "#ffffff";
}

function resetPad(squaresPerSide) {
  DIMENSIONS[0] = squaresPerSide;
  DIMENSIONS[1] = squaresPerSide;

  root.style.setProperty("--rows", DIMENSIONS[1]);
  root.style.setProperty("--columns", DIMENSIONS[0]);

  containerDiv.textContent = "";

  createDivs();
}

function changeMode(newMode) {
  if (currentMode != newMode) {
    currentMode = newMode;
    let interactWithDiv = false;

    switch(newMode) {
      case "normal": {
        interactWithDiv = paintDiv;
        break;
      }
      case "eraser": {
        interactWithDiv = eraseDiv;
        break;
      }
      case "shadow": {
        interactWithDiv = paintDiv;
        break;
      }
      case "rainbow": {
        interactWithDiv = paintDiv;
        break;
      }
      default: {
      }
    }

    if (interactWithDiv) {
      for (let i=0; i < DIMENSIONS[0]; i++) {
        for (let j=0; j < DIMENSIONS[1]; j++) {
            gridOfDivs[i][j].addEventListener("mousedown", function(e) {
                interactWithDiv(this);
            });
            gridOfDivs[i][j].addEventListener("mouseenter", function(e) {
              if (e.buttons > 0)
                interactWithDiv(this);
            });
        }
      }
    }
  }
}

function deactivateAllButtons() {
  buttonList.forEach((button) => {
    button.classList.remove("buttonOn");
  })
}

createDivs();