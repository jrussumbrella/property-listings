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
