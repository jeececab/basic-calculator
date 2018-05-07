// Vanilla JS calculator challenge. Not using eval(). Works by clicking or using the keyboard.  

(() => {
  const numPad = document.querySelector('.numpad');
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
      case "*":
        result = a * b;      
        break;
      case "÷":
        result = a / b;
        break;
    }
  };
  
  function number(e) {
    if (stringNb === 0) {
      stringNb = "";
    };
    if (stringNb.length < 20) { // Maximum number display length in screen
      stringNb += e;
      displayNb.innerHTML = stringNb;
      activeNb = parseFloat(stringNb);
    }; 
  };

  function operator(e) {
    if (storedOp !== "") { // If no operator is stored, this part is skipped
      equation(storedOp, storedNb, activeNb); // The equation is compiled
      activeNb = result;
    };
    if (stringNb === "") { // Happens when no number is entered before clicking
      stringNb = storedNb;
    };
    storedNb = activeNb; // The number on the screen, the active number, becomes stored
    storedOp = e; // The operator in question is stored
    displayNb.innerHTML = storedNb;
    history += `${stringNb} ${storedOp} `;
    if (history.length > 27) { // Maximum history display length
      history = `${activeNb} ${storedOp} ` ;
    };
    displayHist.innerHTML = history;
    stringNb = "";
  };
  
  function equal() {
    equation(storedOp, storedNb, activeNb);
    activeNb = storedNb = result;
    displayNb.innerHTML = activeNb;
    history = "";
    displayHist.innerHTML = "";
    storedOp = "";
    stringNb = activeNb;
  };
  
  function clearEntry() {
    activeNb = 0;
    displayNb.innerHTML = activeNb;
    stringNb = "";
  };
  
  function changeSign() {
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
  };
  
  function point() {
    stringNb = displayNb.innerHTML;
    if (stringNb.includes(".") === false) { // Prevents adding more than one dot
      stringNb = stringNb + '.';
      displayNb.innerHTML = stringNb;
    };
  };
  
  function percent() {
    activeNb = (storedNb * activeNb) / 100;
    displayNb.innerHTML = activeNb;
    stringNb = "";
  };
  
  numPad.addEventListener('click', e => {
    if (e.target.className === "btn number-btn") {
      number(e.target.innerHTML);
    } else if (e.target.className === "btn operator-btn") {
      operator(e.target.innerHTML);
    } else if (e.target.innerHTML === "=") {
      equal();
    } else if (e.target.innerHTML === "C") {
      init();
    } else if (e.target.innerHTML === "CE") {
      clearEntry();
    } else if (e.target.innerHTML === "+/-") {
      changeSign();
    } else if (e.target.innerHTML === ".") {
      point();
    } else if (e.target.innerHTML === "%") {
      percent();
    };
  });
  
  window.addEventListener('keypress', e => {
    console.log(e);
    if (e.charCode > 47 && e.charCode < 58) {
      number(e.key);
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
      operator(e.key);
    } else if (e.keyCode === 13) {
      equal();
    } else if (e.keyCode === 27) {
      init();
    } else if (e.key === "Delete") {
      clearEntry();
    } else if (e.key === ".") {
      point();
    } else if (e.shiftKey && e.charCode === 37) {
      percent();
    }
  }); 
})();

