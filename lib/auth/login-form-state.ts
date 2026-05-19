export type AuthFormState = {
  error: string | null;
  success: string | null;
};

export const authFormInitialState: AuthFormState = {
  error: null,
  success: null,
};
