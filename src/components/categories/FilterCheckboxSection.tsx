import { List, ListItem, Radio, Typography } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { extractNumericValues } from "../../lib/extractNumbericValue";
import {
  Category,
  addFilterPrice,
  selectFilterCategory,
} from "../../app/features/filterSlice";
import { formatCurrency } from "../../lib/formatCurrency";

interface FilterCheckboxSectionProps {
  // Define your component props here
  data: { label: string }[];
  filterHeading: string;
  categoryTitle: Category;
}

const FilterCheckboxSection = ({
  data,
  filterHeading,
  categoryTitle,
}: FilterCheckboxSectionProps) => {
  const dispatch = useAppDispatch();


  const selectCategory = useAppSelector(selectFilterCategory);

  let price:{min:number,max:number}|undefined = undefined
  
  selectCategory.forEach(item=>{
    if(item.category===categoryTitle){
      price=item.filterPriceOption
    }
  })

  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (!price) {
      setSelectedValue("");
    } else if (price) {
      const str = `${formatCurrency(price.min)} - ${formatCurrency(price.max)}`;

      setSelectedValue(str);
    }
  }, [price]);

  const handleRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.currentTarget.value);

    const { maxValue, minValue } = extractNumericValues(e.currentTarget.value);

    dispatch(
      addFilterPrice({ min: minValue, max: maxValue, category: categoryTitle })
    );
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const currentUrl = window.location.href;
    const params = new URLSearchParams(url.search);

    params.delete("price");
    if (price) params.append("price", price?.min + "-" + price?.max);

    const newURL = `${currentUrl.split("?")[0]}?${params.toString()}`;

    window.history.pushState({ path: newURL }, "", newURL);
  }, [price]);

  return (
    <div>
      <h6 className="font-semibold text-xl text-green-800">{filterHeading}</h6>

      <List>
        {data.map((el) => (
          <ListItem className="p-0" key={el.label}>
            <div className="w-full">
              <Radio
                crossOrigin={""}
                name={filterHeading.toLowerCase()}
                className=""
                color="green"
                checked={selectedValue === el.label}
                onChange={handleRadioButtonChange}
                value={el.label}
                label={
                  <div>
                    <Typography color="blue-gray" className="font-medium">
                      {el.label}
                    </Typography>
                  </div>
                }
                containerProps={{
                  className: "",
                }}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FilterCheckboxSection;
