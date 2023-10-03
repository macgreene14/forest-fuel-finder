'use client'
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_APIKEY as string

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/macgreene14/cln97lyn5008b01rc3xskca5f", 
      center: [-110.877,45.427],
      zoom: 8,
      pitch: 0,
      bearing: 0,
    });

    // Navigation map icon
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Full Screen  map icon
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
  }

  
  );
  return (
    <main className="bg-gray-900 w-screen h-screen p-6">
      <div ref={mapContainer} className="z-10 w-full h-full rounded-lg" ></div>
    </main>
  )
}
