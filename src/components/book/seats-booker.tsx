import React from "react";
import { FunctionComponent } from "react";
import { Button, Icon, Text } from "zmp-ui";

const { Title } = Text;

interface SeatsBookerProps {
  value: number;
  onChange: (value: number) => void;
}

const SeatsBooker: FunctionComponent<SeatsBookerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-36 space-y-2">
      <Title size="small">Số ghế</Title>
      <div className="flex rounded-full bg-white h-14 items-center justify-between px-1">
        <Button
          variant="secondary"
          icon={<Icon icon="zi-minus-circle" />}
          onClick={() => onChange(Math.max(value - 1, 1))}
        >
          <div className="border-t border-primary w-4" />
        </Button>
        <Text>{value}</Text>
        <Button
          icon={<Icon icon="zi-plus-circle" />}
          variant="secondary"
          onClick={() => onChange(value + 1)}
        ></Button>
      </div>
    </div>
  );
};

export default SeatsBooker;
