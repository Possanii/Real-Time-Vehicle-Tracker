"use client";

import { RefObject, useEffect, useRef } from "react";
import { useMap } from "@/app/hooks/useMap";
import { DirectionsData } from "@/app/utils/models";

export type MapNewRouteProps = {
  directionsData: DirectionsData;
};

export function MapNewRoute(props: MapNewRouteProps) {
  const { directionsData } = props;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef as RefObject<HTMLDivElement>);

  useEffect(() => {
    if (!map || !directionsData) {
      return;
    }

    map.removeAllRoutes();
    map.addRouteWithIcons({
      routeId: "1",
      startMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: directionsData.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
    });
  }, [map, directionsData]);

  return <div className="w-2/3 h-full" ref={mapContainerRef} />;
}
