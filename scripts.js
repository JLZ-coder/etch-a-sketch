const DIMENSIONS = [16, 16];
let gridOfDivs = [];
let currentMode = "normal";
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
  console.log(e);
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
  resetDivs(DIMENSIONS[0]);
});

const buttonList = document.querySelectorAll("button");


const sliderGridSize = document.querySelector("#sliderGridSize");
const gridSizeDiv = document.querySelector("#gridSizeDiv");
sliderGridSize.addEventListener("change", function() {
  gridSizeDiv.textContent = `Grid Size ${this.value}x${this.value}`;
  resizePad(this.value);
})
sliderGridSize.addEventListener("mousemove", function() {
  gridSizeDiv.textContent = `Grid Size ${this.value}x${this.value}`;
})

gridSizeDiv.textContent = `Grid Size ${DIMENSIONS[0]}x${DIMENSIONS[1]}`;

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
        gridOfDivs[i][j].style["background-color"] = "#ffffff";
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
        eraseDiv(gridOfDivs[i][j]);
    }
  }
}

function interactWithDiv(div) {
  if (currentMode != "shadow") {
    div.style["filter"] = "";
  }
  
  switch(currentMode) {
    case "normal": {
      paintDiv(div);
      break;
    }
    case "eraser": {
      eraseDiv(div);
      break;
    }
    case "shadow": {
      addShadowDiv(div);
      break;
    }
    case "rainbow": {
      rainbowDiv(div);
      break;
    }
    default: {
    }
  }
}

function paintDiv(div) {
  div.style["background-color"] = currentColor;
}

function eraseDiv(div) {
  div.style["background-color"] = "#ffffff";
  div.style["filter"] = "";
}

function addShadowDiv(div) {
  let fullString = div.style["filter"];
  
  if (fullString == "") {
    div.style["filter"] = `brightness( ${1 - 0.1} )`;
  }
  else {
    div.style["filter"] = `brightness( ${div.style["filter"].slice(11, -1) - 0.1} )`;;
  }
}

function rainbowDiv(div) {
  const randomNumber = Math.floor(Math.random() * 256**3);
  div.style["background-color"] = "#" + randomNumber.toString(16);
}

function resizePad(squaresPerSide) {
  DIMENSIONS[0] = squaresPerSide;
  DIMENSIONS[1] = squaresPerSide;

  root.style.setProperty("--rows", DIMENSIONS[1]);
  root.style.setProperty("--columns", DIMENSIONS[0]);

  containerDiv.textContent = "";

  createDivs();
}

function changeMode(newMode) {
  currentMode = newMode;
}

function deactivateAllButtons() {
  buttonList.forEach((button) => {
    button.classList.remove("buttonOn");
  })
}

createDivs();