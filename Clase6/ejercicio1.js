Math.ceil(Math.random() * 20)

let obj = {}

for (let i = 1; i <= 10000; i++) {
  let number = Math.ceil(Math.random() * 20)
  if (!obj[number]) {
    obj[number] = 1
  } else {
    obj[number]++
  }
}

console.log(obj)
