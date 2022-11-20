export interface SigninPayload {
  identifier: string;
  password: string;
  ac_type: string;
  email_master?: string;
}
