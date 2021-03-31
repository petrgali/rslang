let sound = new Audio()
let idx = 1

const Sound = {
    play: (source, arr) => {
        sound.src = `${source + arr[idx - 1]}`
        sound.play()
        sound.onended = () => {
            if (idx < arr.length) {
                sound.src = `${source + arr[idx]}`
                sound.play()
                idx++
            }

        }
    },
    stop: () => {
        sound.pause(
            sound.currentTime = 0
        )
    }
}


export default Sound