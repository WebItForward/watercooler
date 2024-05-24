import * as usersAPI from "./users-api";

export function getToken() {
  return localStorage.getItem("token");
}
