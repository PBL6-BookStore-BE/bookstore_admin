import apiClient from "../utils/apiClient";

async function getYearlySales(data) {
  return apiClient.post('/order/getYearlySales', data).then(res => res.data);
}

async function getMonthlySales(data) {
  return apiClient.post('/order/getMonthlySales', data).then(res => res.data);
}

async function getDailySales(data) {
  return apiClient.post('/order/getDailySales', data).then(res => res.data);
}

async function getDailyTotalOrders(data) {
  return apiClient.get(`/order/daily-total-orders/?date=${data}`, data).then(res => res.data);
}

async function getPendingOrders() {
  return apiClient.get('/order/pending-orders').then(res => res.data);
}

async function getDailyPaypalIncome(data) {
  return apiClient.get(`/order/daily-paypal-income/?date=${data}`, data).then(res => res.data);
}

export {
  getYearlySales,
  getMonthlySales,
  getDailySales,
  getDailyTotalOrders,
  getPendingOrders,
  getDailyPaypalIncome,
}