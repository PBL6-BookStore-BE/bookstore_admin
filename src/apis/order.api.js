import apiClient from "../utils/apiClient";

async function getOrders() {
  return apiClient.get('/order').then(res => res.data);
};

export {
  getOrders,
}