(() => {
  const buttons = document.querySelectorAll('.btn');
  const displayHist = document.querySelector('.history');
  const displayNb = document.querySelector('.result');

  let stringNb, activeNb, storedNb, storedOp, history, result;

  function init() {
    activeNb = 0;
    storedNb = 0;
    storedOp = "";
    history = "";
    result = 0;
    stringNb = activeNb;
    displayHist.innerHTML = "";
    displayNb.innerHTML = activeNb;
  };

  init();

  Array.from(buttons).forEach(el => {
    el.addEventListener('click', e => {

      // Clicking on a number
      if (e.target.className === "btn number-btn") {
        if (stringNb === 0) {
         stringNb = "";
        };
        if (stringNb.length < 20) { // Maximum number display length in screen
          stringNb += e.target.innerHTML;
          displayNb.innerHTML = stringNb;
          activeNb = parseFloat(stringNb);
        };

      // Clicking on an operator
      } else if (e.target.className === "btn operator-btn") {
        if (storedOp !== "") { // If no operator is stored, this part is skipped
          equation(storedOp, storedNb, activeNb); // The equation is compiled
          activeNb = result;
        };
        if (stringNb === "") { // Happens when no number is entered before clicking
          stringNb = storedNb;
        };
        storedNb = activeNb; // The number on the screen, the active number, becomes stored
        storedOp = e.target.innerHTML; // The operator in question is stored
        displayNb.innerHTML = storedNb;
        history += `${stringNb} ${storedOp} `;
        if (history.length > 27) { // Maximum history display length
          history = `${activeNb} ${storedOp} ` ;
        };
        displayHist.innerHTML = history;
        stringNb = "";

      // Clicking on the equal button
      } else if (e.target.innerHTML === "=") {
        equation(storedOp, storedNb, activeNb); // The equation is compiled
        activeNb = storedNb = result;
        displayNb.innerHTML = activeNb;
        history = "";
        displayHist.innerHTML = "";
        storedOp = "";
        stringNb = activeNb;

      // Clicking on the "C" button
      } else if (e.target.innerHTML === "C") {
        init();

      // Clicking on the "CE" button
      } else if (e.target.innerHTML === "CE") {
        activeNb = 0;
        displayNb.innerHTML = activeNb;
        stringNb = "";

      // Clicking on the "+/-" button
      } else if (e.target.innerHTML === "+/-") {
        if (activeNb !== 0) { // If number is 0, nothing happens
          if (Math.sign(activeNb) === 1) { // If number is pos, it becomes neg
            activeNb = -activeNb;
            displayNb.innerHTML = activeNb;
            stringNb = activeNb;
          } else { // If number is neg, it becomes pos
            activeNb = Math.abs(activeNb);
            displayNb.innerHTML = activeNb;
            stringNb = activeNb;
          };
        };

      // Clicking on the "." button
      } else if (e.target.innerHTML === ".") {
        stringNb = displayNb.innerHTML;
        if (stringNb.includes(".") === false) { // Prevents adding more than one dot
          stringNb = stringNb + '.';
          displayNb.innerHTML = stringNb;
        };

      // Clicking on the "%" button
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
      case "x":
        result = a * b;      
        break;
      case "÷":
        result = a / b;
        break;
    }
  };
})();

