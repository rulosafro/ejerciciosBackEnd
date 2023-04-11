let array = [1, 2, 3, 4, 5]

const callback = (x) => {
  return x * 2
}

let newArray = array.map(callback)

console.log(newArray)
