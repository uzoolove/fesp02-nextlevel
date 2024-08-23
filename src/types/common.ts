export interface CommonType {
  _id: number;
  extra?: {
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}
