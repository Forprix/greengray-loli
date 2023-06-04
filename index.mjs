import process from 'process'

(async () => {


const sleep = (ms) => new Promise(res => setTimeout(res, ms))
const hsv2rgb = (hsv) => {
    let d = 0.0166666666666666 * hsv[0]
    let c = hsv[2] * hsv[1]
    let x = c - c * Math.abs(d % 2.0 - 1.0)
    let m = hsv[2] - c
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


for (const [c, i] of message.split('').map((c, i) => [c, i])) {
    if (/^\s$/.test(c))
        await sleep(150)
    else if (/^[a-zа-я]$/i.test(c))
        await sleep(30)
    else
        await sleep(40)
    const color = hsv2rgb([i / message.length * 360, 1, 1]).map(x => Math.floor(x * 255))
    process.stdout.write(`\x1b[38;2;${color.join(';')}m${c}`)
}
console.log('\x1b[m')
await sleep(800)

})()

