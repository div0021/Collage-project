import { formatCurrency } from "./formatCurrency";

export const price:{label:string}[] = [
    { label: `${formatCurrency(0)} - ${formatCurrency(100)}` },
    { label: `${formatCurrency(100)} - ${formatCurrency(500)}` },
    { label: `${formatCurrency(500)} - ${formatCurrency(1000)}` },
    { label: `${formatCurrency(1000)} - ${formatCurrency(2000)}` },
  
    { label: `${formatCurrency(2000)} - ${formatCurrency(10000)}` },
  ];

  export const sort:{label:string,id:string}[]=[
    {
      id:"asc",
      label:"Price(low to high)"
    },{
      id:"dsc",
      label:"Price(high to low)"
    },
    {
      id:"featured",
      label:"Featured"
    }
  ]