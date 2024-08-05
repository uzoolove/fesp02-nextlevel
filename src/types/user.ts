export interface UserData {
  _id: number,
  email: string,
  name: string,
  phone?: string,
  address?: string,
  type: 'user' | 'seller' | 'admin',
  loginType?: 'email' | 'kakao',
  image?: string,
  token?: {
    accessToken: string,
    refreshToken: string,
  },
  createdAt: string,
  updatedAt: string,
}

export type UserInToken = Required<Pick<UserData, '_id' | 'name'>> & Pick<UserData, 'image'> & {
  accessToken: string,
  refreshToken: string,
};

export type UserForm = Pick<UserData, 'name' | 'email' | 'image'> & {
  type: 'user' | 'seller',
  password: string,
  attach?: string | string[],
};

export type UserLoginForm = Pick<UserForm, 'email' | 'password'>;


export type ReplyUser = Pick<UserData, '_id' | 'name' | 'image'>;