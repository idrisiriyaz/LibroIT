import * as actionsTypes from '../actionTypes/actionTypes';

export const addToCart = (productId) => ({
	type: actionsTypes.ADD_A_PRODUCT_INTO_CART,
	payload: productId,
});

export const removeFromCart = (productId) => ({
	type: actionsTypes.REMOVE_A_PRODUCT_FROM_CART,
	payload: productId,
});

export const setCart = (cartItems) => ({
	type: actionsTypes.SET_CART_ITEMS,
	payload: cartItems,
});

export const hideCartModal = () => ({ type: actionsTypes.HIDE_CART_MODAL });

export const showCartModal = () => ({ type: actionsTypes.SHOW_CART_MODAL });

export const toggleIsProductAdded = () => ({ type: actionsTypes.TOGGLE_IS_PRODUCT_ADDED });

//totalamount

export const setTotalAmount = payload => ({ type: actionsTypes.SET_TOTAL_AMOUNT, payload });

export const incrementTotalAmountBy = payload => ({ type: actionsTypes.INCREMENT_TOTAL_AMOUNT_BY, payload });

export const decrementTotalAmountBy = payload => ({ type: actionsTypes.DECREMENT_TOTAL_AMOUNT_BY, payload });