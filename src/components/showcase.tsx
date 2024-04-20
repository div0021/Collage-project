
const ShowCaseData = [
    {
        name:"Quality",
        img:'/premium.jpg',
        desc:"We prioritizes quality by meticulously selecting products that are sustainably sourced, ethically produced, and crafted with care, ensuring a positive impact on health and the environment."
    },
    {
        name:"Best Price",
        img:'/best_price.jpg',
        desc:"We offer carefully selected products that are sustainably sourced and crafted with care, all at competitive prices. Our commitment to eco-friendly and health-conscious products ensures you get the best value."
    },
    {
        name:"Organic",
        img:'/organic_icon.jpg',
        desc:"We prefer organic excellence, sourcing and curating products that meet the highest organic standards. Experience the purity and benefits of organic living at accessible prices."
    },
]
const ShowCase = () => {
  return (
    <div className='w-full grid grid-cols-3 gap-5 px-5 lg:px-10 xl:px-20 2xl:px-36 py-10'>

        {ShowCaseData.map(showcase=>(
            <div className="w-full rounded-xl px-5 py-3 col-span-1 border space-y-2  border-gray-500 shadow-sm shadow-gray-500 hover:border-gray-800 hover:shadow-lg transition-all duration-300 ease-linear" key={showcase.img}>
                <div className="w-full">
                    <img src={showcase.img} alt={`${showcase.name}_pic`} className="w-full"/>
                </div>
                <h4 className="text-center font-medium text-lg">{showcase.name}</h4>

                <p className="text-sm">{showcase.desc}</p>
            </div>
        ))}

       
    </div>
  );
};

export default ShowCase;