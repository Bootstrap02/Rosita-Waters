import { API_BASE_URL } from './data/config.js';

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const apiPath = `/api/${String(path).replace(/^\/+/, '')}`;
  const response = await fetch(`${API_BASE_URL}${apiPath}`, {
    ...options,
    headers,
    credentials: 'include',
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || `API request failed (${response.status}).`);
  }
  return result.data;
}
