import { Box, Button, Searchbar, useStore } from "zmp-framework/react";
import { District } from '../models'

function Inquiry() {
  return <Searchbar className="inquiry" placeholder="Tìm kiếm" />;
}

export function QuickFilter() {
  const selectedDistrict = useStore('selectedDistrict') as number;
  const districts = useStore('districts') as District[];
  return <div className="overflow-auto no-scrollbar snap-x snap-mandatory">
    <div className="flex w-max">
      <Button typeName={!selectedDistrict ? 'primary' : 'tertiary'} className="mr-3 snap-start" fill>Tất cả</Button>
      {districts.map(district => <Button key={district.id} typeName={selectedDistrict === district.id ? 'primary' : 'tertiary'} className="mr-3 snap-start" fill>{district.name}</Button>)}
    </div>
  </div>;
}

export default Inquiry;