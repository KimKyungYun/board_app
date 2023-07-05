export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams extends LoginParams {}

export interface CheckIdDuplicateParams {
  account?: string;
}

export interface User {
  password: string;
  username: string;
  created_at: string;
  updated_at: string;
}
