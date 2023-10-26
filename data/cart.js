export let cart = JSON.parse(localStorage.getItem('cart'));
cart === null && (cart = []);

export function addProductToCart(productId){
  let alreadyInCart;
  cart.forEach((cartItem)=> {
    cartItem.productId === productId && (alreadyInCart = cartItem);
  });

  if(alreadyInCart) {
    alreadyInCart.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveOnLocalStorage();
}


export function cartQuantity(){
  let totalQuantity = 0;
  cart.forEach((cartItem)=> {
    totalQuantity += cartItem.quantity;
  });
  return totalQuantity;
}


export function saveOnLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


