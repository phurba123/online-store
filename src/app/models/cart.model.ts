// interface for cart product items

export interface cart {
    items: cartItem[]
}

export interface cartItem {
    id?: number,
    name: string,
    product: string,
    price: number,
    quantity: number
}