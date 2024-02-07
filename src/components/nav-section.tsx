import NavElements from "./nav-elements"

type NavItems = {
        name:string,
    
}

const navItems:NavItems[] = [
    {
        name:"About Us"
    },
    {name:"Blog"},
    {name:"Categories"}
    
    
]
const NavSection = () => {
    return (
       <>
       <div className="flex items-center space-x-2">
       {
        navItems.map(el=>(
            <NavElements key={el.name} name={el.name} />
        ))
       }
       </div>
       
      
       </>
    )
}
export default NavSection;