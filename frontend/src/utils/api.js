const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api';

export async function apiRequest(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${endpoint}]:`, error);
    throw error;
  }
}

// Authentication
export const authApi = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getProfile: (userId) => apiRequest(`/auth/me/${userId}`),
  updateProfile: (userId, data) => apiRequest(`/auth/profile/${userId}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Emergency SOS
export const sosApi = {
  trigger: (payload) => apiRequest('/sos/trigger', { method: 'POST', body: JSON.stringify(payload) }),
  resolve: (sosId, status = 'Resolved') => apiRequest(`/sos/resolve/${sosId}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getHistory: (userId) => apiRequest(`/sos/history${userId ? `?user_id=${userId}` : ''}`),
};

// Emergency Contacts
export const contactsApi = {
  getAll: (userId = 2) => apiRequest(`/contacts?user_id=${userId}`),
  add: (data) => apiRequest('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/contacts/${id}`, { method: 'DELETE' }),
  testAlert: (data) => apiRequest('/contacts/test-alert', { method: 'POST', body: JSON.stringify(data) }),
};

// AI Safety Assistant
export const aiApi = {
  chat: (message, history = []) => apiRequest('/ai/chat', { method: 'POST', body: JSON.stringify({ message, history }) }),
};

// Crime Analytics & Risk
export const analyticsApi = {
  getOverview: (city = 'All') => apiRequest(`/analytics/overview?city=${encodeURIComponent(city)}`),
  calculateRisk: (payload) => apiRequest('/analytics/calculate-risk', { method: 'POST', body: JSON.stringify(payload) }),
};

// Incident Reporting
export const incidentsApi = {
  getAll: (userId) => apiRequest(`/incidents${userId ? `?user_id=${userId}` : ''}`),
  submit: (data) => apiRequest('/incidents', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id, status) => apiRequest(`/incidents/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Safety Tips
export const tipsApi = {
  getAll: (category = 'All') => apiRequest(`/safety-tips?category=${encodeURIComponent(category)}`),
};

// Emergency Resources & Map
export const resourcesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/resources${query ? `?${query}` : ''}`);
  },
};

// Admin
export const adminApi = {
  getStats: () => apiRequest('/admin/stats'),
};
