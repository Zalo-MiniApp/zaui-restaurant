import { FunctionComponent, useMemo } from "react";
import { useStore } from "zmp-framework/react";
import { Location } from "../models";

interface DistanceProps {
  location: Location
}

const Distance: FunctionComponent<DistanceProps> = ({ location }) => {
  const position = useStore('position') as Location;
  const distance = useMemo(() => Math.round(10 * Math.sqrt(Math.pow(position.lat - location.lat, 2) + Math.pow(position.long - location.long, 2))) / 10, [position, location]);
  return <>{distance} km</>;
}

export default Distance;