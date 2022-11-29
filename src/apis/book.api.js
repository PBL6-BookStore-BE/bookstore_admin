import apiClient from "../utils/apiClient"
async function getListBook() {
    return apiClient.get('/books').then(res => res.data)
};

async function getBookById(id) {
    return apiClient.get(`/book/${id}`).then(res => res.data)
};

const createBook = (data) => {
    let formData = new FormData();
    console.log(data.list_img);
    formData.append("Name", data.Name);
    formData.append("Description", data.Description);
    formData.append("IdAuthors", data.IdAuthors);
    formData.append("IdCategory", data.IdCategory);
    formData.append("IdPublisher", data.IdPublisher);
    formData.append("Pages", data.Pages);
    formData.append("Price", data.Price);
    formData.append("PublicationDate", data.PublicationDate);
    formData.append("list_img", data.list_img);
    return apiClient.post('/books', formData, {
        headers: {
          "content-Type": "multipart/form-data",
    }})
}

export {
    getListBook,
    getBookById,
    createBook
}