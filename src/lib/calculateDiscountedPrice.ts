export function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    // Calculate discount amount
    const discountAmount: number = (discountPercentage / 100) * originalPrice;

    // Calculate discounted price
    const discountedPrice: number = originalPrice - discountAmount;

    // Round discounted price to two decimal places
    const roundedDiscountedPrice: number = Math.round(discountedPrice * 100) / 100;

    return roundedDiscountedPrice;
}