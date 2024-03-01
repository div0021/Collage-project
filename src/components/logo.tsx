import { useNavigate } from "react-router-dom";

const Logo = ({className}:{className?:string}) => {
    const navigate = useNavigate()
    return (
        <div className={className} onClick={()=> navigate("/")}>
            <img src="/brandlogo.png" alt="brand pic" className="h-10 sm:h-12 cursor-pointer"/>

        </div>
    )
}
export default Logo;