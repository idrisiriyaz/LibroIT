import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

// export const HEADER_HEIGHT = 60;

// export const BUTTON_OPACITY = 1;
export const isValidUser = (text) => {

    const regex = /^[a-zA-Z0-9._]+$/;
  
    if (typeof text === 'string') {
  
      if (text.length === 0) {
        return {
          valid: false,
          message: "Field Cannot Be Empty",
        };
      }
  
      else if (!regex.test(text)) {
        return {
          valid: false,
          message: "Please don't enter any special charecter and space except dot(.) and underscore( _ )",
        };
      } else {
        return {
          valid: true,
          message: "",
        }
      }
    } else {
      return {
        valid: false,
        message: "Invalid Username",
      }
    }
  };