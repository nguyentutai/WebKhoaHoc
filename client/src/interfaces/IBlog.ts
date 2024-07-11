export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  like: number;
  content: string;
  status: boolean;
  image_url: string;
}
