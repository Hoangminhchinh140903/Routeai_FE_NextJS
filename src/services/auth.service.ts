// Mock mode: use local API routes (empty base = same origin)
export const BASE_URL = '';

// Types
export interface RegisterPayload {
  email: string;
  password?: string;
  full_name?: string;
  role?: string;
  language_pref?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface ProfileUpdatePayload {
  full_name?: string;
  language_pref?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: {
    code: string;
    message?: string;
    details?: Array<{ field: string; message: string }>;
  };
}

// Token Management
export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

export const removeTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// API Helper
const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));
  
  if (!response.ok || data.success === false) {
    const message = data.error?.message || data.message || 'An error occurred';
    let errorMessage = `[${data.error?.code || response.status}] ${message}`;
    if (data.error?.details && Array.isArray(data.error.details)) {
       const detailMessages = data.error.details.map((d: any) => `${d.field}: ${d.message}`).join(', ');
       errorMessage += ` (${detailMessages})`;
    }
    
    // Throw error containing status and message as requested
    throw {
      status: response.status,
      message: errorMessage,
      code: data.error?.code
    };
  }
  return data;
};

export const authService = {
  async register(payload: RegisterPayload) {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async login(payload: LoginPayload) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await handleResponse(res);
    
    if (data?.data?.access_token && data?.data?.refresh_token) {
      setTokens(data.data.access_token, data.data.refresh_token);
    }
    return data;
  },

  async refresh() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    const data = await handleResponse(res);
    if (data?.data?.access_token && data?.data?.refresh_token) {
      setTokens(data.data.access_token, data.data.refresh_token);
    }
    return data;
  },

  async logout() {
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();
    
    try {
      if (refreshToken && accessToken) {
        await fetch(`${BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }
    } catch (e) {
      console.error('Logout API failed, continuing local logout', e);
    } finally {
      removeTokens();
    }
  },

  async getProfile() {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('No access token available');

    const res = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return handleResponse(res);
  },

  async updateProfile(payload: ProfileUpdatePayload) {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('No access token available');

    const res = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  }
};
