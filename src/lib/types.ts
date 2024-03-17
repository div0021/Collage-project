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

// export type RegisterFormDataType = {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   name:string;
// };
// export type RegisterFormDataType = {
//     registeremail:string;
//     registerpassword:string;
//     registerconfirmPassword:string;
//   }

export type RegisterValidFieldNames =
  | "email"
  | "password"
  | "confirmPassword"
  | "name"

// export type LoginFormDataType = {
//   email: string;
//   password: string;
// };
//   export type LoginFormDataType = {
//     loginemail:string;
//     loginpassword:string;
//   }

export type LoginValidFieldNames = "email" | "password";

export type FormDataType = {
  email: string;
  password: string;
} & ({ confirmPassword: string; name:string; } |{forget?:string});

export type ValidFieldNames = LoginValidFieldNames | RegisterValidFieldNames;

