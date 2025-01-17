const generateRandomString = (length: number = 100): string => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const len = chars.length

    let random = ""

    for(let i=0; i< length; i++){
        const position = Math.ceil(Math.random()*(len - 1))
        random += chars[position]
    }

    return random
}

export {
    generateRandomString
}