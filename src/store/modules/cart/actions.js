export function addToCart(prod) {
  return {
    type: 'ADD_TO_CART',
    prod,
  };
}

export function removeFromCart(id) {
  return {
    type: 'REMOVE_FROM_CART',
    id,
  };
}

export function updateAmount(id, amount) {
  return {
    type: 'UPDATE_AMOUNT',
    id,
    amount,
  };
}
