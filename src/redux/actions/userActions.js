
import * as actionTypes from '../actionTypes/actionTypes';


export const setUserId = payload => ({
	type: actionTypes.SET_USER,
	payload,
});

export const setName = payload => ({
	type: actionTypes.SET_NAME,
	payload,
});

export const setEmail = payload => ({
	type: actionTypes.SET_EMAIL,
	payload,
});

export const setPhone = payload => ({
	type: actionTypes.SET_PHONE_NUMBER,
	payload,
});

export const setDob = payload => ({
	type: actionTypes.SET_DOB,
	payload,
});

export const setAnniversaryDate = payload => ({
	type: actionTypes.SET_ANNIVERSARY_DATE,
	payload,
});

export const setSignedIn = payload => ({
	type: actionTypes.SET_IS_SIGNIN,
	payload,
});

export const clearSession = () => ({
	type: actionTypes.CLEAR_SESSION,
});

export const setHighlightMessageId = payload => ({
	type: actionTypes.SET_HIGHLIGHT_MESSAGE_ID,
	payload,
});