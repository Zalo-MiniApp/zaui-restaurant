import React from "react";
import { FunctionComponent, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { districtsState } from "../state";

interface DistrictNameProps {
  id: number;
}

const DistrictName: FunctionComponent<DistrictNameProps> = ({ id }) => {
  const districts = useRecoilValue(districtsState);
  const name = useMemo(() => {
    return districts.find((d) => d.id === id)?.name ?? "";
  }, [id, districts]);
  return <>{name}</>;
};

export default DistrictName;
