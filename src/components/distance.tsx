import React from "react";
import { FunctionComponent, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Location } from "../models";
import { allowLocationState, positionState } from "../state";
import { calcCrowFliesDistance } from "../utils/location";

interface DistanceProps {
  location: Location
}

const Distance: FunctionComponent<DistanceProps> = ({ location }) => {
  const position = useRecoilValue(positionState);
  const setAllowance = useSetRecoilState(allowLocationState)
  const allowLocation = () => setAllowance(true);
  const distance = useMemo(() => {
    if (position) {
      const d = calcCrowFliesDistance(position, location);
      if (d > 1) {
        return `${Math.round(d * 10) / 10} km`;
      }
      return `${Math.round(d * 1000)} m`;
    }
    return 0;
  }, [position, location]);
  return position ? <>{distance}</> : <span className="text-primary" onClick={e => {
    e.stopPropagation();
    allowLocation();
  }}>Bật vị trí</span>;
}

export default Distance;