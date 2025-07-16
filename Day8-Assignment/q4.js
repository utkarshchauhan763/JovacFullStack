// Input Validation
let input;
do {
    input = parseInt(prompt("Enter a number between 1 and 10:"));
} while (input < 1 || input > 10);
console.log("Valid input received:", input);