// Function, that generate random string as a product name and random price for mocking purposes

export function generateTestProducts(count: number): Array<string> {
    const products = [];

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < count; i++) {
        const nameLength = Math.floor(Math.random() * 10) + 15;

        let productName = '';
        for (let j = 0; j < nameLength; j++) {
            productName += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        productName = productName.charAt(0).toUpperCase() + productName.slice(1);

        products.push(productName.trim());
    }

    return products;
}