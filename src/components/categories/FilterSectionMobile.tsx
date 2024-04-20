import { List, ListItem } from "@material-tailwind/react";
import FilterOptionMobile from "./FilterOptionMobile";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { Category, addFilterSubCategoryOptions, removeFilterSubCategoryOptions, selectFilterCategory } from "../../app/features/filterSlice";
import { useCallback, useEffect, useMemo } from "react";


interface FilterSectionMobileProps {
  // Define your component props here
  data: {label:string}[];
  filterHeading:string;
  categoryTitle:Category
}

const FilterSectionMobile = ({ data,categoryTitle,filterHeading }: FilterSectionMobileProps) => {
  const dispatch = useDispatch();
  
  
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

    if(sub && sub.length>0)
    sub.forEach((subcategory) => {
      params.append("subcategory", subcategory);
    });

    const newURL = `${currentUrl.split("?")[0]}?${params.toString()}`;

    window.history.pushState({ path: newURL }, "", newURL);
  }, [sub]);

  const handleMutlpleCheck = useCallback(
    (label: string, action: boolean) => {
      if (action) {
        dispatch(addFilterSubCategoryOptions({subCategory:label,category:categoryTitle}));
      } else if (!action) {
        dispatch(removeFilterSubCategoryOptions({subCategory:label,category:categoryTitle}));
      }
    },
    [dispatch, categoryTitle],
  );

  return (
    <div>
      <h6 className="font-semibold text-xl text-green-800">{filterHeading}</h6>

        <List>
          {data.map((el) => (
            <ListItem className="p-0" key={el.label}>
              <FilterOptionMobile categoryTitle={categoryTitle} handlemultipleCheck={handleMutlpleCheck} actives={sub} label={el.label} />
            </ListItem>
          ))}
        </List>
    </div>
  );
};

export default FilterSectionMobile;
