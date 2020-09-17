export interface LoginArgs {
  input: {
    email: string;
    password: string;
  };
}

export interface SignUpArgs {
  input: {
    name: string;
    email: string;
    password: string;
  };
}

export interface UpdateProfileArgs {
  input: {
    name: string;
    email: string;
  };
}

export interface ChangePasswordArgs {
  input: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

export interface ResetPasswordArgs {
  input: {
    newPassword: string;
    confirmNewPassword: string;
    token: string;
  };
}
