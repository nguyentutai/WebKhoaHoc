import IUser from "./Auth/IUser";

export interface IBlog {
  _id?: string;
  title: string;
  authorId: IUser;
  slug: string;
  like: number;
  content: string;
  status: boolean;
  image_url: string;
}
