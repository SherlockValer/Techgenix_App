
export const starRatingsGenerator = (rating) => {
    const fullStars = Math.floor(rating)

    const noStars = 5 - (fullStars)

    const totalRating = "★".repeat(fullStars) +  "☆".repeat(noStars)
    return totalRating
}

