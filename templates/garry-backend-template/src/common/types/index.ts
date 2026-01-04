/* eslint-disable */
export type Nullable<T> = T | null;
export type ID = number | string;
export type UserAttributes = {
  id: number;
  name: string;
  email: string;
};
export type UserCreationAttributes = Omit<UserAttributes, 'id'>;
export type CreateUserRequest = UserCreationAttributes;
