let resultDisplay = document.getElementById('result');
let expression = "";
let lastOperation = "";
let lastNumber = "";
let draggedButton = null;
let isEnteringFraction = false;
let numerator = "";
let denominator = "";



function clearResult() {
    expression = "";
    resultDisplay.value = "";
    isEnteringFraction = false;
    numerator = "";
    denominator = "";
}

function addToResult(value) {
    if (resultDisplay.value === "Error") {
        clearResult(); // Reset if the display shows an error
    }

    if (isEnteringFraction) {
        denominator += value;
        resultDisplay.value = numerator + " / " + denominator;
    } else {
        resultDisplay.value += value;
    }
}


function fraction() {
  
    if (resultDisplay.value && !isEnteringFraction) {
  
        isEnteringFraction = true;
        numerator = resultDisplay.value;  
        denominator = "";  
        resultDisplay.value = numerator + " / "; 
    }
}


function divide() {
    setOperation('/');
}

function multiply() {
    setOperation('*');
}

function minus() {
    setOperation('-');
}

function plus() {
    setOperation('+');
}

function percentage() {
    let currentValue = parseFloat(resultDisplay.value);
    if (!isNaN(currentValue)) {
        resultDisplay.value = currentValue / 100; // Calculate percentage
    }
}

function setOperation(operation) {
    lastOperation = operation;
    lastNumber = resultDisplay.value;
    expression += lastNumber + lastOperation; // Store operation in expression
    resultDisplay.value = ""; // Clear display for next number input
}

function equals() {
    if (isEnteringFraction && numerator && denominator) {
        const num = parseFloat(numerator);
        const denom = parseFloat(denominator);

        
        if (isNaN(num) || isNaN(denom)) {
            resultDisplay.value = "Error: Invalid input";
        } else if (denom === 0) {
            resultDisplay.value = "Error: Div by 0";
        } else {
            resultDisplay.value = num / denom; 
        }

        isEnteringFraction = false;
        numerator = "";
        denominator = "";
    } else {
        
        if (resultDisplay.value === "Error") {
            clearResult(); 
        }
        if (lastOperation) {
            expression += resultDisplay.value;
            try {
                let result = eval(expression);
                resultDisplay.value = result;
                expression = "";
            } catch (error) {
                resultDisplay.value = "Error";
                expression = "";
            }
        }
    }
}

function undo() {
    if (resultDisplay.value.length > 0) {
        resultDisplay.value = resultDisplay.value.slice(0, -1); // Remove last character
    }
}

// Drag and drop functions
function drag(event) {
    draggedButton = event.target; // Store the reference to the dragged button
}

function allowDrop(event) {
    event.preventDefault(); // Prevent default to allow drop
}

function drop(event) {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON' && draggedButton !== event.target) {
        let draggedButtonHTML = draggedButton.outerHTML; // Get the HTML of the dragged button
        let targetButtonHTML = event.target.outerHTML; // Get the HTML of the target button

        // Swap the HTML
        draggedButton.outerHTML = targetButtonHTML; 
        event.target.outerHTML = draggedButtonHTML; 

        // Reapply the events to the buttons after swapping
        reapplyEvents();
    }
}

// Function to reapply events after dragging
function reapplyEvents() {
    let buttons = document.querySelectorAll('.grid button');
    buttons.forEach(button => {
        button.addEventListener('dragstart', drag);
        button.addEventListener('dragover', allowDrop);
        button.addEventListener('drop', drop);
    });
}

// Set drag and drop events on buttons
document.querySelectorAll('.grid button').forEach(button => {
    button.addEventListener('dragstart', drag);
    button.addEventListener('dragover', allowDrop);
    button.addEventListener('drop', drop);
});
