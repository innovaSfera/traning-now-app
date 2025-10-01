"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

type Gym = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  distance: string;
  openNow: boolean;
  type: string;
  image: string;
};

interface Props {
  gyms: Gym[];
  onSelect: (gym: Gym) => void;
}

export default function Map({ gyms, onSelect }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
  });

  const [center] = useState({ lat: -23.626, lng: -46.738 });

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <div className="h-full w-full bg-white dark:bg-dark-2">
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerClassName="w-full h-full rounded-none"
        options={{
          disableDefaultUI: true,
          styles: [],
        }}
      >
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            position={{ lat: gym.lat, lng: gym.lng }}
            onClick={() => onSelect(gym)}
            icon={{
              url: "/pin-green.svg",
              scaledSize: new google.maps.Size(36, 36),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
