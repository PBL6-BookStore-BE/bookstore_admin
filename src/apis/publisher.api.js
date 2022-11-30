import apiClient from "../utils/apiClient"

async function getPublishers(){
    return apiClient.get('/publishers').then(res => res.data)
};

const createPublisher = (data) => {
    return apiClient.post('/publishers', data)
}

const editPublisher = (data) => {
    return apiClient.put(`/publisher/${data.id}`, data)
}

const deletePublisher = (dataId) => {
    return apiClient.delete(`/publisher/${dataId}`)
}
export {
    getPublishers,
    createPublisher,
    editPublisher,
    deletePublisher,
}