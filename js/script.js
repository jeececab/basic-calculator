(() => {
  const buttons = document.querySelectorAll('.btn');
  const displayHist = document.querySelector('.history');
  const displayNb = document.querySelector('.result');

  let stringNb, history, prevNb, activeNb, storedNb, storedOp, result;

  function init() {
    stringNb = "";
    history = "";
    prevNb = "";
    activeNb = 0;
    storedNb = 0;
    storedOp = "";
    result = 0;
    displayHist.innerHTML = " ";
    displayNb.innerHTML = activeNb;
  };

  init();

  Array.from(buttons).forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.className === "btn number-btn") {
        stringNb += e.target.innerHTML;
        displayNb.innerHTML = stringNb;
        activeNb = parseFloat(stringNb);
      } else if (e.target.className === "btn operator-btn") {
        if (storedOp !== "") {
          equation(storedOp, storedNb, activeNb);
          activeNb = result;
        };
        storedNb = activeNb;
        storedOp = e.target.innerHTML;
        displayNb.innerHTML = storedNb;
        displayHist.innerHTML += stringNb + " " + storedOp + " ";
        stringNb = "";
      } else if (e.target.className === "btn equal-btn"){
        equation(storedOp, storedNb, activeNb);
        displayNb.innerHTML = result;
        activeNb = result;
        storedNb = result;
        displayHist.innerHTML = "";
        storedOp = "";
        stringNb = storedNb;
      } else if (e.target.innerHTML === "C") {
        init();
      } else if (e.target.innerHTML === "CE") {
        activeNb = 0;
        displayNb.innerHTML = activeNb;
        stringNb = "";
      } else if (e.target.innerHTML === "+/-") {
        if (stringNb.charAt(0) !== "-") {
          stringNb = "-" + stringNb;
          displayNb.innerHTML = stringNb;
          activeNb = parseFloat(stringNb);
        } else {
          stringNb = stringNb.slice(1);
          displayNb.innerHTML = stringNb;
          activeNb = parseFloat(stringNb);
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

  function equation(op, stNb, acNb) {
    switch(op) {
      case "+":
        result = stNb + acNb;     
        break;
      case "-":
        result = stNb - acNb;      
        break;
      case "x":
        result = stNb * acNb;      
        break;
      case "÷":
        result = stNb / acNb;
        break;
    }
  };
})();

