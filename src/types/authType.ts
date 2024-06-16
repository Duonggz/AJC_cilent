export interface Auth {
  id: string
  fullName: string
  email: string
}

export interface AuthResponse {
  user: Auth
  token: string
}
