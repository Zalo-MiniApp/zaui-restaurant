import React, { useTransition } from "react";
import { FunctionComponent, useMemo } from "react";
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Location } from "../models";
import { retryLocationState, positionState } from "../state";
import { calcCrowFliesDistance } from "../utils/location";

interface DistanceProps {
  location: Location
}

const Distance: FunctionComponent<DistanceProps> = ({ location }) => {
  const position = useRecoilValueLoadable(positionState);
  const setRetry = useSetRecoilState(retryLocationState)
  const [loading, startTransition] = useTransition();
  const allowLocation = () => {
    startTransition(() => {
      setRetry(r => r + 1);
    })
  };
  const distance = useMemo(() => {
    if (position.state === 'hasValue' && position.contents) {
      const d = calcCrowFliesDistance(position.contents, location);
      if (d > 1) {
        return `${Math.round(d * 10) / 10} km`;
      }
      return `${Math.round(d * 1000)} m`;
    }
    return 0;
  }, [position, location]);
  return distance ? <>{distance}</> : <span className="text-primary" onClick={e => {
    e.stopPropagation();
    allowLocation();
  }}>Bật vị trí</span>;
}

export default Distance;