import { FunctionComponent, useState } from "react";
import { Box, Button, Title } from "zmp-framework/react";
import { Extra } from "../../models";

interface ExtraSelectionProps {
  extra: Extra
}

const ExtraSelection: FunctionComponent<ExtraSelectionProps> = ({ extra }) => {
  const [selected, setSelected] = useState(extra.options[0].key);
  return <>
    <Title size="small">{extra.label}</Title>
    <Box m="0" mt="4" flex alignItems="center" justifyContent="space-between">
      {extra.options.map(option => <Button className="flex-1 mx-2 first:ml-0 last:mr-0" key={option.key} onClick={() => setSelected(option.key)} typeName={selected === option.key ? 'primary' : 'tertiary'}>{option.label}</Button>)}
    </Box>
  </>;
}

export default ExtraSelection;