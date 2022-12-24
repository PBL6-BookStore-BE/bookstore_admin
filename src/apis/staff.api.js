import apiClient from "../utils/apiClient"

const createStaff = (data) => {
    return apiClient.post('/dashboard', data);
}

const updateStaff = (data) => {
    return apiClient.put('/user', data);
}

export {
    createStaff,
    updateStaff,
}