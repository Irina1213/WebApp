import cookie from "js-cookie";
const process = require("process");

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value), {
      expires: 1,
    });
  }
};

//remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//get from cookie is such as stored token
export const getCookie = (key) => {
  if (process.browser) {
    return localStorage.getItem(key);
  }
};
