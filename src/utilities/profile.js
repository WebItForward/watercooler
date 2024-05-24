import sendRequest from "./send-request";
const BASE_URL = "/api/profile";

export async function getAvatarUrl() {
  return sendRequest(`${BASE_URL}/avatar`);
}

export async function uploadAvatar(formData) {
  return sendRequest(`${BASE_URL}/upload`, "POST", formData);
}
