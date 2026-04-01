export interface LoginResponse {
  success: boolean;
  message: string;
  error: string;
  redirect: string;
  data: {
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}
