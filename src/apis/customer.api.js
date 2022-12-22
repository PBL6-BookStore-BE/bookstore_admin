import apiClient from "../utils/apiClient";


async function updateState (data){
  return apiClient.put(`/dashboard/user?id=${data.id}&state=${data.state}`, data);
}

export {
  updateState,
}