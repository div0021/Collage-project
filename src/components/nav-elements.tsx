

interface NavElementsProps {
    name:string
}
const NavElements = ({name}:NavElementsProps) => {
    return (
        <div className="text-sm text-gray-500 hover:text-gray-800 hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer px-1">
         {name}
        </div>
    )
}
export default NavElements;