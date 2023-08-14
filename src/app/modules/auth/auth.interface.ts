export type ILoginPayload = {
  phoneNumber: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
