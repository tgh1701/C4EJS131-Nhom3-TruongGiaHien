function numberOneTriangle(n) {
  for (let i = 1; i <= n; i++) {
    let s = "";
    for (let j = 1; j <= i; j++) {
      s = s + "*";
    }
    console.log(s);
  }
}

// numberOneTriangle(4)
// numberOneTriangle(2)
