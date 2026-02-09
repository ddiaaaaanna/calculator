let calculatorInput = document.getElementById("calculator-input");
let calculationSpan = document.getElementById("calculation");

let firstNumber = 0;
let secondNumber = 0;
let action = "+";
let answer = 0;

let history = [];

function onNumberClick(number) {
  if (calculatorInput.value === "" && number === 0) {
    return;
  }
  if (calculatorInput.value === "" && number === ".") {
    return;
  }

  calculatorInput.value += number;
}

function onActionClick(clickedAction) {
  if (calculatorInput.value.endsWith(action)) {
    return;
  }
  calculatorInput.value += "" + clickedAction + "";
  action = clickedAction;
}

function onCountClick() {
  let splitted = calculatorInput.value.split(action);
  firstNumber = parseFloat(splitted[0]);
  secondNumber = parseFloat(splitted[1]);

  calculateAnswer();
  calculatorInput.value = answer;

  calculationSpan.innerText = `${firstNumber} ${action} ${secondNumber}`;

  addToHistory();
}

function calculateAnswer() {
  switch (action) {
    case "+":
      answer = firstNumber + secondNumber;
      break;
    case "-":
      answer = firstNumber - secondNumber;
      break;
    case "x":
      answer = firstNumber * secondNumber;
      break;
    case "/":
      answer = firstNumber / secondNumber;
      break;
  }
}

function onCleanClick() {
  firstNumber = 0;
  secondNumber = 0;
  action = "+";
  answer = 0;
  calculatorInput.value = "";
  calculationSpan.innerText = "";
}

function addToHistory() {
  let historyItem = {
    firstNumber,
    action,
    secondNumber,
    answer,
  };
  history.push(historyItem);
  showHistoryBtn.disabled = false;
}

const showHistoryBtn = document.getElementById("show-history");
const historyBlock = document.querySelector(".calculator .history-items");
const clearHistoryBtn = document.getElementById("clear-history");

showHistoryBtn.addEventListener("click", () => {
  if (
    historyBlock.style.display === "none" ||
    historyBlock.style.display === ""
  ) {
    let formatted = history.map(
      (x) =>
        `<p>${x.firstNumber} ${x.action} ${x.secondNumber} = ${x.answer}</p>`,
    );

    historyBlock.innerHTML = formatted.join("");
    historyBlock.style.color = "white";
    historyBlock.style.display = "block";
    showHistoryBtn.innerText = "Hide history";
    clearHistoryBtn.classList.remove("hidden");
  } else {
    historyBlock.style.display = "none";
    showHistoryBtn.innerText = "Show history";
    clearHistoryBtn.classList.add("hidden");
  }
});

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  historyBlock.innerHTML = "";
  showHistoryBtn.innerText = "Show history";
  clearHistoryBtn.classList.add("hidden");
  showHistoryBtn.disabled = true;
});
