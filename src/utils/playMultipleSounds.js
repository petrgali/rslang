let sound = new Audio()

const playSound = (source, arr) => {
    let idx = 1
    sound.src = `${source + arr[idx - 1]}`
    sound.play()
    sound.onended = () => {
        if (idx < arr.length) {
            sound.src = `${source + arr[idx]}`
            sound.play()
            idx++
        }
    }
}

export default playSound