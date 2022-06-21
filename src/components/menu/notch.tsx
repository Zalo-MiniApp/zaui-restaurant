import { FunctionComponent } from "react";
import { Box } from "zmp-framework/react";

interface NotchProps {
  color?: string;
}

const Notch: FunctionComponent<NotchProps> = ({ color = 'white' }) => {
  return <Box m="0" p="4" className="absolute w-full" flex justifyContent="center">
    <Box m="0" height={3} className="w-12 absolute rounded-md" style={{ backgroundColor: color }}></Box>
  </Box>;
}

export default Notch;