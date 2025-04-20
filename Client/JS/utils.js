// frontend/js/utils.js
export const getToken = () => localStorage.getItem('token');

export const authHeader = () => ({
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
});
