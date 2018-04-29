// (() => {
  const buttons = document.querySelectorAll('.btn');
  const displayHist = document.querySelector('.history');
  const displayNb = document.querySelector('.result');

  let stringNb, activeNb, storedNb, storedOp, result;

  function init() {
    activeNb = 0;
    storedNb = 0;
    storedOp = "";
    result = 0;
    stringNb = activeNb;
    displayHist.innerHTML = "";
    displayNb.innerHTML = activeNb;
  };

  init();

  Array.from(buttons).forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.className === "btn number-btn") {
        if (stringNb === 0) {
          stringNb = "";
        };
        if (stringNb.length < 20) {
          stringNb += e.target.innerHTML;
          displayNb.innerHTML = stringNb;
          activeNb = parseFloat(stringNb);
        };

      } else if (e.target.className === "btn operator-btn") {
        if (storedOp !== "") {
          equation(storedOp, storedNb, activeNb);
          activeNb = result;
        };
        if (stringNb === "") {
          stringNb = storedNb;
        };
        storedNb = activeNb;
        storedOp = e.target.innerHTML;
        displayNb.innerHTML = storedNb;
        displayHist.innerHTML = `${storedOp} ${stringNb} ` + displayHist.innerHTML;
        stringNb = "";

      } else if (e.target.innerHTML === "=") {
        equation(storedOp, storedNb, activeNb);
        activeNb = storedNb = result;
        displayNb.innerHTML = activeNb;
        displayHist.innerHTML = "";
        storedOp = "";
        stringNb = activeNb;

      } else if (e.target.innerHTML === "C") {
        init();
      } else if (e.target.innerHTML === "CE") {
        activeNb = 0;
        displayNb.innerHTML = activeNb;
        stringNb = "";
      } else if (e.target.innerHTML === "+/-") {
        if (activeNb !== 0) {
          if (Math.sign(activeNb) === 1) {
            activeNb = -activeNb;
            displayNb.innerHTML = activeNb;
            stringNb = activeNb;
          } else {
            activeNb = Math.abs(activeNb);
            displayNb.innerHTML = activeNb;
            stringNb = activeNb;
          };
        };
      } else if (e.target.innerHTML === ".") {
        stringNb = displayNb.innerHTML;
        if (stringNb.includes(".") === false) {
          stringNb = stringNb + '.';
          displayNb.innerHTML = stringNb;
        };
      } else if (e.target.innerHTML === "%") {
        activeNb = (storedNb * activeNb) / 100;
        displayNb.innerHTML = activeNb;
        stringNb = "";
      };  
    });
  });

  function equation(op, a, b) {
    switch(op) {
      case "+":
        result = a + b;     
        break;
      case "-":
        result = a - b;      
        break;
      case "*":
        result = a * b;      
        break;
      case "÷":
        result = a / b;
        break;
    }
  };
// })();

