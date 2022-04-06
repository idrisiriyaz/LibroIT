import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
    bookItems: [],
};


const book = (state = initialState, action) => {

	const { type, payload } = action;

	switch (type) {

		case actionTypes.SET_BOOK_ITEMS:
			return {
				...state,
				bookItems: [...payload],
			};

		case actionTypes.ADD_INTO_BOOK:
			if (state.bookItems.indexOf(payload) === -1) {
				return {
					...state,
					bookItems: [...state.bookItems, payload],
				}
			}
			return state;

		case actionTypes.REMOVE_FROM_BOOK:
			const modifiedCartItems = state.bookItems.filter(e => e !== payload);
			return {
				...state,
				bookItems: modifiedCartItems,
			};

		default:
			return state;
	}
};

export default book;