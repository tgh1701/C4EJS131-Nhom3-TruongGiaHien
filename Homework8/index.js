// Tong S1
let sum = 0;
let sum1 = 2;
for (let i = 100; i >= 1; i--){
    sum = Math.sqrt(i + sum);
    sum1 = Math.sqrt(sum1);
}
console.log(sum/sum1)

// So chinh phuong
    for (let i = 1; i <= 100; i++) {
    console.log(i*i)
}