let a = []
let b = [0]
let c = []
let i = 0, j = 0, k = 0

while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
        c[k] = a[i]
        i++
        k++
    } else if (a[i] === b[j]) {
        c[k] = a[i]
        i++
        k++
    } else if (a[i] > b[j]) {
        c[k] = b[j]
        j++
        k++
    }
}
if (i !== a.length) {
    c.push(a[i])
} else if (j !== b.length) {
    c.push(b[j])
}

console.log(c);