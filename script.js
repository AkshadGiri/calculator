
    const display = document.querySelector('.display');
    let currentOperand = '';
    let previousOperand = '';
    let operator = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentOperand || '0';
    }

    function appendNumber(number) {
        if (shouldResetDisplay) {
            currentOperand = number;
            shouldResetDisplay = false;
        } else {
            currentOperand = currentOperand === '0' ? number : currentOperand + number;
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (shouldResetDisplay) {
            currentOperand = '0.';
            shouldResetDisplay = false;
        } else if (!currentOperand.includes('.')) {
            currentOperand += '.';
        }
        updateDisplay();
    }

    function handleOperator(op) {
        const operatorMap = { '÷': '/', '×': '*', '+': '+', '-': '-' };
        const actualOp = operatorMap[op] || op;

        if (operator !== null && !shouldResetDisplay) {
            compute();
        }
        previousOperand = currentOperand;
        operator = actualOp;
        shouldResetDisplay = true;
    }

    function compute() {
        if (operator === null || shouldResetDisplay) return;

        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        let result;

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': 
                result = current === 0 ? 'Error' : prev / current;
                break;
            default: return;
        }

        currentOperand = result.toString();
        operator = null;
        previousOperand = '';
        shouldResetDisplay = true;
        updateDisplay();
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    function applyPercentage() {
        const value = parseFloat(currentOperand);
        if (!isNaN(value)) {
            currentOperand = (value / 100).toString();
            updateDisplay();
        }
    }

    // Event Listeners
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('clear')) {
                clear();
            } else if (button.classList.contains('equals')) {
                compute();
            } else if (button.classList.contains('operator')) {
                if (value === '%') {
                    applyPercentage();
                } else {
                    handleOperator(value);
                }
            } else if (value === '.') {
                appendDecimal();
            } else if (!isNaN(value) || value === '0') {
                appendNumber(value);
            }
        });
    });
