

interface NavElementsProps {
    name:string
}
const NavElements = ({name}:NavElementsProps) => {
    return (
        <div className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer px-1 relative before:w-0 before:h-0.5  before:absolute before:-bottom-0.5  before:rounded-xl before:left-0 before:bg-black hover:before:w-full before:transition-all before:duration-500 before:ease-in-out">
         {name}
        </div>
    )
}
export default NavElements;