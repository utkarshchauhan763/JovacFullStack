// Sum of Positive Numbers
let numbers = [1, -2, 3, 4, -5];
let posSum = 0;
for (let n of numbers) {
    if (n > 0) posSum += n;
}
console.log("Sum of positive numbers:", posSum);