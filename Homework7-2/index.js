//BTVN1
let str = 'Hôm nay ngày thứ 7';
let str1, str2, str3, str4, result;
str1 = str.charAt(0).toLowerCase();
str2 = str.slice(1, 8);
str3 = str.charAt(8).toUpperCase();
str4 = str.slice(9, 18);
result = str1.concat(str2, str3, str4)
console.log(result);
//BTVN2
let str5, str6, result2;
str5 = str.slice(1, 3);
str6 = str.slice(4, 17);
result2 = str1.concat(str5, str6, "8");
console.log(result2);