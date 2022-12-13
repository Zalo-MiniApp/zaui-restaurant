import React from "react";
import { FunctionComponent } from "react";
import { Button, Icon, Text } from "zmp-ui";

const { Title } = Text;

interface TableBookerProps {
  value: string
  onChange: (table: string) => void
}

const TableBooker: FunctionComponent<TableBookerProps> = ({ value, onChange }) => {
  return <div className="w-36 space-y-2">
    <Title size="small">Bàn số</Title>
    <div className="relative">
      <select className="w-full rounded-full bg-white h-14 flex items-center justify-between px-5 border-none text-sm" value={value} onChange={e => onChange(e.target.value)}>
        {['01', '02', '03', '04', '05'].map(table => <option key={table} value={table}>No.{table}</option>)}
      </select>
      <Button
        icon={<Icon icon="zi-chevron-down" />}
        variant="secondary"
        className="absolute top-1 right-1 pointer-events-none"
      ></Button>
    </div>
  </div>;
}

export default TableBooker;