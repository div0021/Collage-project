import Product from "./product";
import productData from "../data/product.json";

const TopProducts = () => {
  const topProduct = productData.filter((_, index) => index < 6);

  return (
    <>
      <div>
        <div className="w-full">
          <div className="w-full flex justify-center items-center text-center mt-10">
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-[#679F0A]">
                Exclusive products
              </p>

              <h2 className="text-4xl font-semibold">Top Products</h2>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:m-10 pt-5">
          <div className="w-full h-full">
            <div className="w-full sm:w-auto grid-cols-1 sm:grid-cols-2 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 justify-end sm:px-2 gap-y-10 sm:gap-y-4">
              {topProduct.map((el) => (
                <div className="w-full h-full flex justify-center items-center" key={el.id}>
                  <Product
                    key={el.id}
                    id={el.id}
                    image={el.image[0].url}
                    name={el.name}
                    discount={Number(el.price.percent)}
                    orginalPrice={Number(el.price.original)}
                    price={Number(el.price.discount)}
                    description={el.description}
                    rating={el.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopProducts;
