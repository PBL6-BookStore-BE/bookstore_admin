import apiClient from "../utils/apiClient";

async function getUser(email) {
    return apiClient.get(`/user/${email}`).then(res => res.data);
}

export { getUser }