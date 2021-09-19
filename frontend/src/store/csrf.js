import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET"; //get method by defualt
  options.headers = options.headers || {}; //no headers by default

  // if method is not get, set content type to app/json, and get xsrf-token from cookie
  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }

  // call fetch with url and options
  const res = await window.fetch(url, options);

  // // if err then throw response as error
  // if (res.status >= 400) throw res;

  // status code under 400, return res to next chain
  return res;
}

export function restoreCSRF() {
  return csrfFetch("/api/csrf/restore");
}
