import * as actionsTypes from '../actionTypes/actionTypes';

export const addToCart = (productId) => ({
	type: actionsTypes.ADD_INTO_BOOK,
	payload: productId,
});

export const removeFromCart = (productId) => ({
	type: actionsTypes.REMOVE_FROM_BOOK,
	payload: productId,
});

export const setCart = (cartItems) => ({
	type: actionsTypes.SET_BOOK_ITEMS,
	payload: cartItems,
});