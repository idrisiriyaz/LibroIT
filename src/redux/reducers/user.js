import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
	userId: null,
	name: "",
	email: "",
	phNo: "",
	gender: null,
	dob: null,
	anniversaryDate: null,
	token: null,
	referralCode: "",
	referredByReferralCode: null,
	isSignedIn: false,
	highlightMessageId: 0,
};

const user = (state = initialState, action) => {

	const { type, payload } = action;

	switch (type) {
		case actionTypes.SET_USER:
			return {
				...state,
				userId: payload,
			};
		case actionTypes.SET_IS_SIGNIN:
			return {
				...state,
				isSignedIn: payload,
			};
		case actionTypes.SET_NAME:
			return {
				...state,
				name: payload,
			};

		case actionTypes.SET_PHONE_NUMBER:
			return {
				...state,
				phNo: payload,
			};
		case actionTypes.CLEAR_SESSION:
			return {
				isSignedIn: false,
			};
		default:
			return state;
	}
};

export default user;