import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import KyupidMap from "./KyupidMap";
import LoadAreasTask from "../tasks/LoadAreasTask";
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";

const Kyupid = () => {
  const [areas, setAreas] = useState([]);

  const legendItemsReverse = [...legendItems].reverse();

  const load = () => {
    const loadAreasTask = new LoadAreasTask();
    loadAreasTask.load((areas) => setAreas(areas));
  };

  useEffect(load, []);
  return (
    <div>
      {areas.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <KyupidMap areas={areas} />
          <Legend legendItems={legendItemsReverse} />
        </div>
      )}
    </div>
  );
};

export default Kyupid;
