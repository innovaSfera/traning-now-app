"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Gym } from "@/types/Gym";

interface Props {
  gyms: Gym[];
  onSelect: (gym: Gym) => void;
  selectedGym: Gym | null;
}

export default function Map({ gyms, onSelect, selectedGym }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
  });

  const [center] = useState({ lat: -23.626, lng: -46.738 });
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (selectedGym && mapRef.current) {
      mapRef.current.panTo({ lat: selectedGym.lat, lng: selectedGym.lng });
      mapRef.current.setZoom(16);
    }
  }, [selectedGym]);

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <div className="h-full w-full bg-white dark:bg-dark-2">
      <GoogleMap
        center={center}
        zoom={14}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        mapContainerClassName="w-full h-full rounded-none"
        options={{
          disableDefaultUI: true,
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
