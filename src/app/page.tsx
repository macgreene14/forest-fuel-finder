'use client'
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import iFly from "./components/iFly"
import iLegend from "./components/iLegend"
import LogCam from "./components/LogCam"


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

    // Collapsible Legend
    const legendItems = [
      {
        title: "Boundary",
        tailwind: "w-4 h-4 mr-2 bg-white border-2 border-solid border-black", 
        css: ""

      },
      {
        title: "No Collection",
        tailwind: "w-4 h-4 mr-2 bg-red-500",
        css: ""
      },
      {
        title: "Private",
        tailwind: "w-4 h-4 mr-2 bg-black border-2 border-solid border-black", 
        css: "background-image: repeating-linear-gradient(-45deg, transparent, transparent 2px, #ffffff 2px, #ffffff 5px)"

      },
    ];

    const mapLegend = new iLegend(legendItems)
    map.current.addControl(mapLegend, "top-left")

    // Collapsible Fly To 
    const locations = [
      {name: "Hebgen Lake South", lng: -111.27, lat: 44.80, zoom: 12, bearing: 150}, 
      {name: "Hebgen Lake North", lng: -111.26, lat: 45.10, zoom: 11, bearing: 176}, 
      {name: "Bozeman South", lng: -111.27, lat: 45.34, zoom: 11, bearing: 176}, 
      {name: "Gallatin Canyon", lng: -111.20, lat: 45.49, zoom: 11, bearing: 176}, 
      {name: "Hyalite Bozeman", lng: -111.01, lat: 45.52, zoom: 11, bearing: 150}, 
      {name: "Bridgers", lng: -110.89, lat: 45.77, zoom: 11, bearing: -10}, 
      {name: "Crazies", lng: -110.53, lat: 46.13, zoom: 11, bearing: 0},
      {name: "Big Timber", lng: -110.14, lat: 45.49, zoom: 11, bearing: 0},
      {name: "Main Boulder", lng: -110.16, lat: 45.37, zoom: 11, bearing: 0}]
    const mapFlyTo = new iFly(locations);
    map.current.addControl(mapFlyTo, "top-left");
  }

  );
  return (
    <main className="bg-gray-900 w-screen h-[90vh] sm:p-6">
      <div ref={mapContainer} className="w-full h-full rounded-lg" ></div>
      {/* <LogCam map={map}/> */}
    </main>
  )
}
