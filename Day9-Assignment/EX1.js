// Digital Alarm Assistant
function setAlarm(time, message) {
    const now = new Date();
    const alarmTime = new Date(time);
    const delay = alarmTime - now;
    if (delay > 0) {
        setTimeout(() => {
            alert(message);
        }, delay);
    } else {
        console.log("Time must be in the future.");
    }
}

// TAX Calculator
function calculateTax(amount, ...taxPercentages) {
    let totalTax = taxPercentages.reduce((sum, tax) => sum + tax, 0);
    return amount + (amount * totalTax / 100);
}

// Recursive Countdown Timer
function countdown(n) {
    if (n < 1) {
        console.log("Blast Off!");
        return;
    }
    console.log(n);
    setTimeout(() => countdown(n - 1), 1000);
}

// Even Number Checker (without %)
function isEven(n) {
    n = Math.abs(n);
    if (n === 0) return true;
    if (n === 1) return false;
    return isEven(n - 2);
}

// Basic Calculator with Callback
function calculate(a, b, operation) {
    return operation(a, b);
}

// Book Search Simulator
function searchBook(bookName, callback) {
    setTimeout(() => {
        const results = [`${bookName} - Author A`, `${bookName} - Author B`];
        callback(results);
    }, 2000);
}