let isResultDisplayed = false;

function appendToDisplay(value) {
    const isOperator = ['+', '-', '*', '/'].includes(value);
    const display = document.getElementById('display');

    if (isResultDisplayed && !isOperator) {
        display.value = ''; // Limpia el display si el último valor mostrado es un resultado
        isResultDisplayed = false;
    } else if (isResultDisplayed && isOperator) {
        isResultDisplayed = false; // Continúa desde el resultado si se presiona un operador
    }

    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
    isResultDisplayed = false; // Restablece este estado
}

function calculateResult() {
    const display = document.getElementById('display');
    const expression = display.value;

    try {
        // Divide la expresión en partes basándose en los operadores
        const parts = expression.split(/([+\-*/])/g);

        let result = parseFloat(parts[0]); // Inicializa el resultado con el primer número

        for (let i = 1; i < parts.length; i += 2) {
            const operator = parts[i];
            const nextNumber = parseFloat(parts[i + 1]);

            switch (operator) {
                case '+':
                    result += nextNumber;
                    break;
                case '-':
                    result -= nextNumber;
                    break;
                case '*':
                    result *= nextNumber;
                    break;
                case '/':
                    // Añade protección contra la división por cero
                    if (nextNumber === 0) {
                        throw new Error("Divide by zero error.");
                    }
                    result /= nextNumber;
                    break;
            }
        }

        // Verifica si el resultado es NaN antes de asignarlo al display
        if (isNaN(result)) {
            throw new Error("Result is not a number.");
        }

        display.value = result.toString();
        isResultDisplayed = true;
    } catch (e) {
        display.value = 'Error';
        setTimeout(clearDisplay, 2000);
    }
}


function backspace() {
    const display = document.getElementById('display');
    if (!isResultDisplayed && display.value.length) {
        display.value = display.value.substring(0, display.value.length - 1);
    }
}

document.addEventListener('keydown', function(event) {
    if ((event.key >= 0 && event.key <= 9) || event.key === '.' || ['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});

