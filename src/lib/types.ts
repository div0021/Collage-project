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