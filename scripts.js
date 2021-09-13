const DIMENSIONS = [16, 16];
let gridOfDivs = [];
let isEraserMode = false;

const root = document.querySelector(":root");
const rootStyle = getComputedStyle(root);

const containerDiv = document.querySelector("#container");

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  let newSquaresPerSide = prompt("How many squares per side? (same as now by default)");

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
});

const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", function() {
  isEraserMode = !isEraserMode;
  if (isEraserMode)
    this.classList.add("buttonOn");
  else
    this.classList.remove("buttonOn");
});

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
            interactWithDiv(this);
        });
        gridOfDivs[i][j].addEventListener("mouseenter", function(e) {
          if (e.buttons > 0)
            interactWithDiv(this);
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

function interactWithDiv(div) {
  if (isEraserMode) {
    eraseDiv(div);
  }
  else {
    paintDiv(div);
  }
}

function paintDiv(div) {
  div.classList.add("painted");
}

function eraseDiv(div) {
  div.classList.remove("painted");
}

function resetPad(squaresPerSide) {
  DIMENSIONS[0] = squaresPerSide;
  DIMENSIONS[1] = squaresPerSide;

  root.style.setProperty("--rows", DIMENSIONS[1]);
  root.style.setProperty("--columns", DIMENSIONS[0]);

  containerDiv.textContent = "";

  createDivs();
}

createDivs();