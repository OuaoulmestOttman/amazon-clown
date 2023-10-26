import {cart, saveOnLocalStorage} from '../../data/cart.js';
import {products} from '../../data/products.js';
import { money } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOption.js';
import { displayAllPrices } from './paymentSummary.js';

const today = dayjs();

export function displayOrderSummary() {
  let orderSummaryHtml = document.querySelector('.js-order-summary');
  orderSummaryHtml.innerHTML = '';
  cart.forEach((cartItem, index)=> {
    products.forEach((product)=> {
      if(cartItem.productId === product.id) { 
        orderSummaryHtml.innerHTML += `
          <div class="cart-item-container">
            <div class="js-delivery-date-${index} delivery-date">
                Delivery date: ${today.add(7, 'days').format('dddd, MMMM DD')}
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image"
              src=${product.image}>
      
              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${money(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="js-delete-quantity-link delete-quantity-link link-primary" data-item-index="${index}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="js-delivery-options-${index} delivery-options">
              </div>
            </div>
          </div>
        `;
      }
    })
    displayDeliveryOptionsHtml(index);
  })
  document.querySelectorAll('.js-delete-quantity-link').forEach((span)=> {
    span.addEventListener('click', ()=> {
      const itemIndex = span.dataset.itemIndex;
      cart.splice(itemIndex, 1);
      saveOnLocalStorage();
      displayOrderSummary();
      displayAllPrices();
    })
  })
}

function displayDeliveryOptionsHtml(index) {
  let defaultChecked = 'checked';
  let deliveryOptionHtml = document.querySelector(`.js-delivery-options-${index}`);
  deliveryOptionHtml.innerHTML = `
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
  `;
  deliveryOptions.forEach((element) =>{
    if(element.id != 1) {
      defaultChecked = ``;
    } 
    deliveryOptionHtml.innerHTML += `
      <div class="js-delivery-option delivery-option">
        <input type="radio" ${defaultChecked}
          class="js-delivery-option-input delivery-option-input"
        name="delivery-option-${index}" data-index="${index}" data-price="${element.price}" data-number-days="${element.days}">
        <div>
          <div class="delivery-option-date">
            ${today.add(element.days, 'days').format('dddd, MMMM DD')}
          </div>
          <div class="delivery-option-price">
            ${money(element.price)}$ - Shipping
          </div>
        </div>
      </div>
    `;
  })
  document.querySelectorAll(`.js-delivery-option`).forEach((element) => {
    element.addEventListener('click', ()=>{
      const inputRadio = element.querySelector('.js-delivery-option-input');
      inputRadio.checked = true;
      
      const index = inputRadio.dataset.index;
      const days = inputRadio.dataset.numberDays;
      document.querySelector(`.js-delivery-date-${index}`).innerHTML = `Delivery date: ${today.add(days, 'days').format('dddd, MMMM DD')}`;
      displayAllPrices();
    })
  })
}











