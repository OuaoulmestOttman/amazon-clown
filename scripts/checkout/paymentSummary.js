import { money } from '../utils/money.js';
import {cart, cartQuantity} from '../../data/cart.js';
import {products} from '../../data/products.js';

export function displayAllPrices() {
  const cartQ = cartQuantity()
  document.querySelector('.js-return-to-home-link').innerHTML =`${cartQ} items`;

  const itemsPrice = totalCartPrice();
  document.querySelector('.js-payment-summary-row').innerHTML =`
  <div>Items (${cartQ}):</div>
  <div class="payment-summary-money">$${money(itemsPrice)}</div>
`;

  const deliveryPrice = totalDeliveryPrice();
  document.querySelector('.js-payment-shipping').innerHTML =`$${money(deliveryPrice)}`; 

  const totalWithoutTax = itemsPrice + deliveryPrice;
  document.querySelector('.js-payment-before-tax').innerHTML =`$${money(totalWithoutTax)}`;
  document.querySelector('.js-payment-tax').innerHTML =`$${money((totalWithoutTax*10)/100)}`;
  document.querySelector('.js-payment-total').innerHTML =`$${money(totalWithoutTax+(totalWithoutTax*10)/100)}`;
} 

function totalCartPrice() {
  let cartPrice = 0;
  cart.forEach((cartItem, index)=> {
    products.forEach((product)=> {
      if(cartItem.productId === product.id) {
        cartPrice += product.priceCents*cartItem.quantity;
      }
    })
  })
  return cartPrice;
}

function totalDeliveryPrice() {
  let deliveryPrice = 0;
  document.querySelectorAll('.js-delivery-option-input').forEach((input) => {
    if(input.checked) {
      deliveryPrice += Number(input.dataset.price);
    }
  })
  return deliveryPrice;
}