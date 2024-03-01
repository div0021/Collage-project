import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { SlArrowUp } from "react-icons/sl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavSection = () => {
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const navigate = useNavigate()

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-500 hover:text-gray-800 hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer px-1">
          About Us
        </div>
        <div className="text-sm text-gray-500 hover:text-gray-800 hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer px-1">
          Blog
        </div>
        <Menu
          placement="top-start"
          allowHover
          open={openCategory}
          handler={setOpenCategory}
        >
          <MenuHandler>
            <div
              className={`flex items-center justify-center gap-2 text-sm ${
                !openCategory
                  ? "text-gray-500 scale-100"
                  : "text-gray-800 scale-105"
              } transition-all duration-150 ease-in-out cursor-pointer px-1`}
            >
              Categories
              <SlArrowUp
                className={`h-3 w-3 transition-transform ${
                  openCategory ? "rotate-0" : "rotate-180"
                }`}
              />
            </div>
          </MenuHandler>
          <MenuList className="w-52 overflow-x-hidden pr-10">
            <MenuItem onClick={()=>navigate("/category/ayurvedic")}>Ayurvedic</MenuItem>
            <MenuItem>Organic</MenuItem>
            <MenuItem>Eco-friendly</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};
export default NavSection;
