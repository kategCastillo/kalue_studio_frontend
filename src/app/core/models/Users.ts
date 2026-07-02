export interface Contacts {
  _id: string;
  userId: string;
  label: string;
  receiverName: string;
  address: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id?: string;
  name?: string;
  nickname: string;
  email: string;
  password: string;
  role?: string;
  status?: boolean;
  avatar: string;
  contacts: [Contacts];
  createdAt?: string;
  updatedAt?: string;
}

export interface ResponseUsers {
  msg: string;
  data: [User];
}
