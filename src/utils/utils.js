export const calculatePrice = (price = null, ...percentages) => {
    if (!price || percentages.length === 0) {
        return price;
    }

    let newPrice = price;

    percentages.forEach(p => {
        if (p && p > 0) {
            newPrice = newPrice * (1 + p / 100);
        }
    });

    return newPrice;
};