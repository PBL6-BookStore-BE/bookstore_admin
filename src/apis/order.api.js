import apiClient from "../utils/apiClient";

async function getOrders() {
  return apiClient.get('/order').then(res => res.data);
};

async function updateStatus(data) {
  return apiClient.post('/order/changestatus', data).then(res => res.data);
}

export {
  getOrders,
  updateStatus,
}