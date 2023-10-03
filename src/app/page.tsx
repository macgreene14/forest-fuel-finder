'use client'
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

function Legend() {
  return (
    <div className="bg-white p-4 rounded-md shadow-md absolute left-6 top-6 z-10 text-black">
      <h4 className="font-bold mb-2">Legend</h4>
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 mr-2 bg-red-500"></div>
        <span>No Collection</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2 bg-black border-2 border-solid border-black" style={{backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, #ffffff 2px, #ffffff 5px)'}}></div>
        <span>Private</span>
      </div>
    </div>
  );
}

export default function Home() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_APIKEY as string

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/macgreene14/cln97lyn5008b01rc3xskca5f", 
      center: [-111.1,45.5],
      zoom: 10.5,
      pitch: 70,
      bearing: 180,
    });

    // Navigation map icon
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Full Screen  map icon
    // map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
  }

  

  
  );
  return (
    <main className="bg-gray-900 w-screen h-screen p-2">
      <div ref={mapContainer} className="w-full h-full rounded-lg" ></div>
      <Legend/>
    </main>
  )
}
