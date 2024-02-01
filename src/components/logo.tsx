const Logo = ({className}:{className?:string}) => {
    return (
        <div className={className}>
            <img src="/brandlogo.png" alt="brand pic" className="h-10 sm:h-12 cursor-pointer"/>

        </div>
    )
}
export default Logo;