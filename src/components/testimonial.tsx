import { Carousel } from "@material-tailwind/react";
import TestimonialItem from "./testimonial-item";
import userData from "../data/user-testimonial.json";

const Testimonial = () => {
  return (
    <div className="w-full border-2 mt-10">
      <div className="pb-10 bg-[#708090]/70">
        <Carousel
          loop
          autoplay
          transition={{ type: "spring", duration: 0.5 }}
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2 items-center">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block cursor-pointer  transition-all content-[''] ${
                    activeIndex === i
                      ? "w-8 h-1  bg-white rounded-2xl"
                      : "w-2 h-2 bg-white/50 rounded-full"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {userData.map((el) => (
            <TestimonialItem
              key={el.id}
              name={el.name}
              description={el.description}
              image={el.image}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default Testimonial;
