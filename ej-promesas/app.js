console.log(1)

setTimeout(() => {
  console.log(2)
  console.log(3)
}, 0)


const p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(n1 => {
  console.log({n1})
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 3000)
  })
}).then(n2 => {
  console.log({n2})
})