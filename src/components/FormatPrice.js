export default price => {
    price = price.toString().split('')

    let ret = ''
    let ar = []

    function cat() {
        if (ar.length === 0) {
            return
        }
        if (ret) {
            ret = '.' + ret
        }
        ret = ar.reverse().join('') + ret
        ar = []
    }

    while (price.length > 0) {
        ar.push(price.pop())
        if (ar.length === 3) {
            cat()
        }
    }
    cat()

    return ret
}