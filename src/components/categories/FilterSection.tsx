import { List, ListItem } from "@material-tailwind/react";
import FilterOption from "./FilterOption";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Category,
  addFilterSubCategoryOptions,
  removeFilterSubCategoryOptions,
  selectFilterCategory,
} from "../../app/features/filterSlice";
import { useCallback, useEffect, useMemo } from "react";

interface FilterSectionProps {
  // Define your component props here
  data: { label: string }[];
  filterHeading: string;
  categoryTitle:Category;
}

const FilterSection = ({ data, filterHeading,categoryTitle }: FilterSectionProps) => {
  const dispatch = useAppDispatch();

  const selectCategory = useAppSelector(selectFilterCategory);


  let sub:string[] = useMemo(()=>[],[]);

  selectCategory.forEach(item=>{
    if(item.category===categoryTitle){
      sub=item.subcategories
    }
  })


  useEffect(() => {
    const url = new URL(window.location.href);
    const currentUrl = window.location.href;
    const params = new URLSearchParams(url.search);

    params.delete("subcategory");

    if(sub && sub.length > 0)
    sub.forEach((subcategory) => {
      params.append("subcategory", subcategory);
    });

    const newURL = `${currentUrl.split("?")[0]}?${params.toString()}`;

    window.history.pushState({ path: newURL }, "", newURL);
  }, [sub]);

  const handleMutlpleCheck = useCallback(
    (label: string, action: boolean) => {
      if (action) {
        dispatch(addFilterSubCategoryOptions({category:categoryTitle,subCategory:label}));
      } else if (!action) {
        dispatch(removeFilterSubCategoryOptions({category:categoryTitle,subCategory:label}));
      }
    },
    [dispatch,categoryTitle]
  );
  return (
    <div>
      <h6 className="font-semibold text-xl text-green-800">{filterHeading}</h6>

      <List>
        {data.map((el) => (
          <ListItem className="p-0" key={el.label}>
            <FilterOption
              label={el.label}
              handlemultipleCheck={
                filterHeading === "Sub Categories"
                  ? handleMutlpleCheck
                  : undefined
              }
              actives={sub}
              categoryTitle="Ayurvedic"
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FilterSection;
