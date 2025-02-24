// const nums = [1,2,3,4,5];

// const totalValue = nums.reduce((acc, current, i , array) => {
//   console.log(acc, current, i, array)
//   return acc + current;
// }, 0)

// console.log(typeof totalValue);


// const evenNumbers = [10,2,3,4,50,6,70,8,90];

// const result = evenNumbers.some((num,i) => {
//   // console.log(i)
//   return `(${num % 2 === 1}) : ${i}`;
// })

// console.log(result)

let arr = [1, 2, 3, 4];
const result = arr.splice(2, 1, 'a', 'b');
console.log(arr, result)