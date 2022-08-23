// Tong S1
let sum = 0;
let sum1 = 2;
for (let i = 100; i >= 1; i--){
    sum = Math.sqrt(i + sum);
    sum1 = Math.sqrt(sum1);
}
console.log(sum/sum1)

// So chinh phuong
//     for (let i = 1; i <= 100; i++) {
//     console.log(i*i)
// }
let y = 0;
for (let x = 1; x <= 10000; x++){
    if(y < 10000){
        y = x*x;
        console.log(y)
    }
}