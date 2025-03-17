enum Size {
    SM = 640,
    MD = 768,
    LG = 1024,
    XL = 1280,
    XXL = 1536,
}

export const getEnum = (enumName: keyof typeof Size) => {
    return Size[enumName]
}
