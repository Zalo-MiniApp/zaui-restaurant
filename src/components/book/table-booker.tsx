import React from "react";
import { FunctionComponent } from "react";
import { Button, Icon, Picker, Text } from "zmp-ui";

const { Title } = Text;

interface TableBookerProps {
  value: string
  onChange: (table: string) => void
}

const TableBooker: FunctionComponent<TableBookerProps> = ({ value, onChange }) => {
  return <div className="w-36 space-y-2">
    <Title size="small">Bàn số</Title>
    <div className="relative w-full rounded-full bg-white h-14 flex items-center justify-between overflow-hidden border-none text-sm table-booker">
      <Picker
        mask
        maskClosable
        title="Bàn số"
        action={{
          text: "Chọn",
          close: true,
        }}
        placeholder="No.01"
        defaultValue={{ value }}
        onChange={({ table }) => onChange(table.value as string)}
        data={[
          {
            options: ['01', '02', '03', '04', '05'].map(table => ({
              value: table,
              displayName: `No.${table}`
            })),
            name: "table",
          },
        ]}
      />
      <Button
        icon={<Icon icon="zi-chevron-down" />}
        variant="secondary"
        className="absolute top-1 right-1 pointer-events-none"
      ></Button>
    </div>
  </div>;
}

export default TableBooker;