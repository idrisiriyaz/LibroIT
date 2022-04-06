import * as actionTypes from '../actionTypes/actionTypes';
const initialState = {
	cartItems: [],
	isCartModalVisible: false,
	totalAmount: 0,
	isProductAdded: false,
};

const cart = (state = initialState, action) => {

	const { type, payload } = action;

	switch (type) {

		case actionTypes.SET_CART_ITEMS:
			return {
				...state,
				cartItems: [...payload],
			};

		case actionTypes.ADD_A_PRODUCT_INTO_CART:
			if (state.cartItems.indexOf(payload) === -1) {
				return {
					...state,
					cartItems: [...state.cartItems, payload],
				}
			}
			return state;

		case actionTypes.REMOVE_A_PRODUCT_FROM_CART:
			const modifiedCartItems = state.cartItems.filter(e => e !== payload);
			return {
				...state,
				cartItems: modifiedCartItems,
			};

		case actionTypes.HIDE_CART_MODAL:
			return {
				...state,
				isCartModalVisible: false,
			};

		case actionTypes.SHOW_CART_MODAL:
			return {
				...state,
				isCartModalVisible: true,
			};

		//TOTAL AMOUNT

		case actionTypes.SET_TOTAL_AMOUNT:
			return {
				...state,
				totalAmount: payload,
			};

		case actionTypes.INCREMENT_TOTAL_AMOUNT_BY:
			return {
				...state,
				totalAmount: state.totalAmount + payload,
			};

		case actionTypes.DECREMENT_TOTAL_AMOUNT_BY:
			return {
				...state,
				totalAmount: state.totalAmount - payload,
			};

		case actionTypes.TOGGLE_IS_PRODUCT_ADDED:
			return {
				...state,
				isProductAdded: !state.isProductAdded,
			};

		default:
			return state;
	}
};

export default cart;