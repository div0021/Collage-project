import { Card, List, ListItem } from "@material-tailwind/react";
import FilterOption, { FilterOptionProps } from "./FilterOption";


interface FilterSectionProps {
  // Define your component props here
  data: FilterOptionProps[];
  filterHeading:string;
}

const FilterSection = ({ data,filterHeading }: FilterSectionProps) => {
  return (
    <div>
      <h6 className="font-semibold text-xl text-green-800">{filterHeading}</h6>

      <Card>
        <List>
          {data.map((el: FilterOptionProps) => (
            <ListItem className="p-0" key={el.label}>
              <FilterOption label={el.label} />
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default FilterSection;
