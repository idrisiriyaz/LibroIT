import axios from "axios";
import { BOOK_URL } from "./server";



//book
export const getBookListApi = () => {
    return axios.get(`${BOOK_URL}/new`);
};
export const getBookDetailsApi = (isbn13) => {
    return axios.get(`${BOOK_URL}/books/${isbn13}`);
};
export const getBookSearchListApi = (text) => {
    return axios.get(`${BOOK_URL}/search/${text}`);
};
// export const SCREEN_WIDTH = Dimensions.get('window').width;
