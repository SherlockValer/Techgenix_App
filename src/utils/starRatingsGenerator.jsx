

export const starRatingsGenerator = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStars = rating - fullStars > 0 ? 1 : 0
    const noStars = 5 - (fullStars + halfStars)

    const totalRating = "★".repeat(fullStars) + "⯪".repeat(halfStars) + "☆".repeat(noStars)
    return totalRating
}