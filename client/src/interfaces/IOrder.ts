import IUser from "./Auth/IUser";
import ICousrse from "./ICousrse";

export interface IOrder {
  _id: string;
  userId: IUser;
  courseId: [ICousrse];
  totalPrice: number;
  status: string;
  isHidden: boolean;
}
