
export const discountPercentage = (actualPrice, discountPrice) => {
    const discount = actualPrice - discountPrice
    const percentage = Math.floor((discount / actualPrice) * 100)
    return percentage
}