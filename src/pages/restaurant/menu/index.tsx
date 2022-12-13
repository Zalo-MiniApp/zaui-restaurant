import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Tabs } from "zmp-ui";
import { menuState } from "../../../state";
import FoodItem from "./food";

function MenuTable() {
  const menu = useRecoilValue(menuState);
  const [selectedCategory, setSelectedCategory] = useState(menu.categories[0].id);

  return <>
    <Box className="overflow-x-auto no-scrollbar snap-mandatory snap-x scroll-p-4">
      <Tabs activeKey={selectedCategory} onChange={setSelectedCategory}>
        {menu.categories.map(category => <Tabs.Tab key={category.id} label={category.name}>
          <Box flex flexWrap justifyContent="center" className="gap-4 p-5">
            {category.foods.map(food => <Box key={food.id} style={{ flexBasis: 'calc((100vw - 56px)/2)' }}>
              <FoodItem food={food} />
            </Box>)}
          </Box>
        </Tabs.Tab>)}
      </Tabs>
    </Box>

  </>;
}

export default MenuTable;