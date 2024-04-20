import { UserInfoTypes } from "../app/features/authSlice";
import { ProductType } from "./schema";

export type ProductDataType = {
  id: string;
  name: string;
  description: string;
  image: {
    url: string;
    label: string;
  }[];
  rating: string;
  price: {
    original: string;
    discount: string;
    percent: string;
  };
  categories: string[];
};

export type CategoryDataType = {
  _id:string;
  name:string;
  description:string;
  subCategories:string[]
}

export type ProfileDataType = {
  user: Omit<UserInfoTypes,'id'> & {_id:string};
  firstName: string;
  lastName: string;
  age:number;
  contact:number;
  gender:string;
  address?:string;
  city?:string;
  state?:string;
  pincode?:number;
}

export type OrdersType = {
  products:{data:ProductType,quantity:number}[],
  razorpay_order_id:string;
  razorpay_payment_id:string;
  address:{
    address:string;
    pincode:number;
    city:string;
    state:string;
  }
  amount:number;
  shipment:number;
  isPaymentLegit:boolean;
  createdAt:Date;
  updatedAt:Date;
}