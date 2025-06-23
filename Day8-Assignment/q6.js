// Frequency Counter
let nums = [1, 2, 2, 3, 3, 3, 4];
let freq = {};
for (let n of nums) {
    freq[n] = (freq[n] || 0) + 1;
}
console.log("Frequency count:", freq);