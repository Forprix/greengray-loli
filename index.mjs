import process from 'process'

(async () => {


const toRgb = (hue, saturation, value) => {
    let d = 0.0166666666666666 * hue
    let c = value * saturation
    let x = c - c * Math.abs(d % 2.0 - 1.0)
    let m = value - c
    c += m
    x += m
    switch (d >>> 0) {
        case 0: return [c, x, m]
        case 1: return [x, c, m]
        case 2: return [m, c, x]
        case 3: return [m, x, c]
        case 4: return [x, m, c]
    }
    return [c, m, x]
}

const message = 'Дружочек, ты видимо не понял с кем общаешься. Вот эта твоя манера речи "клоунская" меня не впечатляет, давай встретимся, объясню на понятном тебе языке, языке боли.'
let i = 0
const sleep = (ms) => new Promise(res => setTimeout(res, ms))

while (true) {
    await sleep(50)
    const color = toRgb(i / message.length * 360, 1, 1).map(x => Math.floor(x * 255))
    process.stdout.write(`\x1b[38;2;${color.join(';')}m${message[i]}`)
    i++
    if (i >= message.length)
        break
}
console.log('\x1b[m')

})()

