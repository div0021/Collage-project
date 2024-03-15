
interface TestimonialItemProps {
    name:string;
    description:string;
    image:string;
}

const TestimonialItem = ({description,image,name}:TestimonialItemProps) => {
  return (
    <div className="w-full h-96 flex flex-col justify-center items-center pt-10 pb-16 gap-y-5">
      <div className="text-center">
        <h3 className="font-bold text-green-500 tracking-wide text-lg">
          Testimonial
        </h3>

        <h1 className="text-5xl font-semibold">What client say</h1>
      </div>

      <div className="mt-10">
        <img
          src={image}
          alt="person"
          className="w-20 h-20 object-contain rounded-full border-2 border-[#679F0A] ring-offset-2 ring ring-[#679F0A]"
        />
      </div>

      <div className="space-y-5 flex flex-col justify-start items-center">
        <p className="text-semibold text-xl text-center">{name}</p>
        <p className="px-10 sm:px-0 sm:w-[70%] text-center tracking-wide text-sm">
          {description.substring(0,248)}...
        </p>
      </div>
    </div>
  );
};

export default TestimonialItem;
