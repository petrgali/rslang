const Calculate = {
    total: (total, page) => {
        let out = []
        total.reduce((mapPages, obj) => {
            mapPages.set(obj.group, mapPages.get(obj.group) + 1 || 1)
            return mapPages
        }, new Map())
            .forEach((value, key) => out[key] = Math.ceil(value / 20))
        return {
            total: out.reduce((acc, value) => {
                acc += value
                return acc
            }, 0),
            request: Calculate.properties(page, out),
        }
    },
    properties: (num, out) => {
        let accumulatedValue = 0
        let page = num
        for (let idx in out) {
            if (!out[idx]) continue
            page = num - accumulatedValue
            accumulatedValue += out[idx]
            if (num <= accumulatedValue) return { group: idx, page: page - 1 }
        }
    },
}

export default Calculate