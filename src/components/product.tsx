import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../lib/formatCurrency";
import {
  Card,
  CardBody,
  CardHeader,
  Rating,
  Typography,
} from "@material-tailwind/react";

interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  orginalPrice: number;
  description: string;
  rating: string;
}

const Product = ({
  id,
  image,
  name,
  discount,
  orginalPrice,
  price,
  description,
  rating,
}: ProductProps) => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-[24rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none cursor-pointer"
        onClick={() => navigate(`/products/${id}`)}
      >
        <img src={image} alt={name} />
      </CardHeader>
      <CardBody className="spacey2">
        <Typography variant="h4" color="blue-gray">
          {name}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 font-normal text-sm"
        >
          <p className="line-clamp-2">{description}</p>
        </Typography>
        <div className="flex justify-start items-center gap-x-3">
          <Typography className="line-through text-gray-400/90">
            {formatCurrency(orginalPrice)}
          </Typography>
          <Typography className="font-semibold">
            {formatCurrency(price)}
          </Typography>
          <Typography className="text-green-500 font-bold">
            ({Math.round(discount)}% OFF)
          </Typography>
        </div>
        <Rating value={Number(rating)} readonly />
      </CardBody>
    </Card>
  );
};
export default Product;
