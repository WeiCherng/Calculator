const warning = document.getElementById("warning");
const warningMsg = (msg) => {
  warning.innerHTML = msg;
};

const checkValue = () => {
  if (display.innerHTML.length > 5) {
    return false;
  } else {
    return true;
  }
};

const checkOperator = () => {
  if (operator) {
    return true;
  } else {
    return false;
  }
};

let firstValue = "";
let secondValue = "";
let operator = "";

const add = (num1, num2) => num1 + num2;
const sub = (num1, num2) => num1 - num2;
const times = (num1, num2) => num1 * num2;
const div = (num1, num2) => num1 / num2;

const operatorHandler = (operatorType) => {
  operator = operatorType;
  display.innerHTML = "";
};
const outputReset = (output) => {
  display.innerHTML = output;
  firstValue = `${output}`;
  secondValue = "";
  operator = "";
};

const equal = () => {
  warningMsg("");
  if (firstValue && secondValue && operator) {
    if (operator === "add") {
      const output = add(parseInt(firstValue), parseInt(secondValue));
      outputReset(output);
    } else if (operator === "sub") {
      const output = sub(parseInt(firstValue), parseInt(secondValue));
      outputReset(output);
    } else if (operator === "times") {
      const output = times(parseInt(firstValue), parseInt(secondValue));
      if (`${output}`.length > 13) {
        display.innerHTML = "Math Error";
      } else {
        outputReset(output);
      }
    } else if (operator === "div") {
      let output = div(parseInt(firstValue), parseInt(secondValue));
      outputReset(output.toPrecision(5));
    }
  } else if (!firstValue) {
    warningMsg("Please Enter A First Value");
    operator = "";
  } else {
    warningMsg("Please Enter A Second Value");
  }
};

const deleteOne = () => {
  const deleted = display.innerHTML.substring(0, display.innerHTML.length - 1);
  display.innerHTML = deleted;
};
const clearDisplay = () => {
  warningMsg("");
  display.innerHTML = "";
  firstValue = "";
  secondValue = "";
  operator = "";
};
const addToDisplay = (value) => {
  display.innerHTML += value;
};
const addToFirstValue = () => {
  firstValue = display.innerHTML;
};
const addToSecondValue = () => {
  secondValue = display.innerHTML;
};

let display = document.getElementById("display");
const clear = document.getElementById("clear");
const del = document.getElementById("del");

clear.addEventListener("click", () => {
  clearDisplay();
});
del.addEventListener("click", () => {
  deleteOne();
  if (checkValue()) {
    warningMsg("");
  }
});

const addButton = document.getElementById("add");
const subButton = document.getElementById("sub");
const timesButton = document.getElementById("times");
const divButton = document.getElementById("div");
const equalButton = document.getElementById("equal");

equalButton.addEventListener("click", () => {
  equal();
});
addButton.addEventListener("click", () => {
  operatorHandler("add");
});
subButton.addEventListener("click", () => {
  operatorHandler("sub");
});
timesButton.addEventListener("click", () => {
  operatorHandler("times");
});
divButton.addEventListener("click", () => {
  operatorHandler("div");
});

const nine = document.getElementById("nine");
const eight = document.getElementById("eight");
const seven = document.getElementById("seven");
const six = document.getElementById("six");
const five = document.getElementById("five");
const four = document.getElementById("four");
const three = document.getElementById("three");
const two = document.getElementById("two");
const one = document.getElementById("one");
const zero = document.getElementById("zero");

[nine, eight, seven, six, five, four, three, two, one, zero].forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      const valid = checkValue();
      if (valid) {
        if (checkOperator()) {
          addToDisplay(e.target.value);
          addToSecondValue();
        } else {
          addToDisplay(e.target.value);
          addToFirstValue();
        }
      } else {
        warningMsg("Max value entered");
      }
    });
  }
);

document.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key >= 0 || e.key < 10) {
    const valid = checkValue();
    if (valid) {
      if (checkOperator()) {
        addToDisplay(e.key);
        addToSecondValue();
      } else {
        addToDisplay(e.key);
        addToFirstValue();
      }
    } else {
      warningMsg("Max value entered");
    }
  } else if (e.key === "Backspace") {
    deleteOne();
    if (checkValue()) {
      warningMsg("");
    }
  } else if (e.key === "Enter" || e.key === "=") {
    equal(firstValue, secondValue, operator);
  } else if (e.key === "Escape") {
    clearDisplay();
  } else if (e.key === "-") {
    operatorHandler("sub");
  } else if (e.key === "+") {
    operatorHandler("add");
  } else if (e.key === "*") {
    operatorHandler("times");
  } else if (e.key === "/") {
    operatorHandler("div");
  }
});
