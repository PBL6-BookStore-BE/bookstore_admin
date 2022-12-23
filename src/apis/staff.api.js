import apiClient from "../utils/apiClient"

const createStaff = (data) => {
    return apiClient.post('/dashboard', data);
}

export {
    createStaff,
}