import { List, ListItem } from "@material-tailwind/react";
import { FilterOptionProps } from "./FilterOption";
import FilterOptionMobile from "./FilterOptionMobile";


interface FilterSectionMobileProps {
  // Define your component props here
  data: FilterOptionProps[];
  filterHeading:string;
}

const FilterSectionMobile = ({ data,filterHeading }: FilterSectionMobileProps) => {
  return (
    <div>
      <h6 className="font-semibold text-xl text-green-800">{filterHeading}</h6>

        <List>
          {data.map((el: FilterOptionProps) => (
            <ListItem className="p-0" key={el.label}>
              <FilterOptionMobile label={el.label} />
            </ListItem>
          ))}
        </List>
    </div>
  );
};

export default FilterSectionMobile;
