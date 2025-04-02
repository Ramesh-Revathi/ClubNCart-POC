import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapLibreWithSuggestionsProps {
  deliveryAddress: (data: any) => void;
}

const MapLibreWithSuggestions: React.FC<MapLibreWithSuggestionsProps> = ({ deliveryAddress }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [marker, setMarker] = useState<maplibregl.Marker | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=CBPGOhn92wsOrmZDcu2z",
      center: [0, 0],
      zoom: 14,
    });

    const initialMarker = new maplibregl.Marker({ draggable: true })
      .setLngLat([0, 0])
      .addTo(mapInstance);

    // Handle marker drag
    initialMarker.on("dragend", () => {
      const { lat, lng } = initialMarker.getLngLat();
      fetchAddressFromCoordinates(lat, lng);
    });

    // Handle map click
    mapInstance.on("click", (e) => {
      const { lat, lng } = e.lngLat;
      initialMarker.setLngLat([lng, lat]);
      fetchAddressFromCoordinates(lat, lng);
    });

    setMap(mapInstance);
    setMarker(initialMarker);

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.setCenter([longitude, latitude]);
          initialMarker.setLngLat([longitude, latitude]);
          fetchAddressFromCoordinates(latitude, longitude);
        },
        (error) => console.error("Geolocation error:", error)
      );
    }

    return () => {
      mapInstance.remove();
    };
  }, []);

  const fetchAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setSelectedAddress(data.display_name);
        deliveryAddress(data.display_name);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const handlePincodeSearch = async (pincode: string) => {
    if (!/^\d{5,6}$/.test(pincode)) { // Adjust regex for your country's pincode format
      alert("Please enter a valid pincode");
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lon, lat, display_name } = data[0];
        if (map && marker) {
          map.setCenter([parseFloat(lon), parseFloat(lat)]);
          marker.setLngLat([parseFloat(lon), parseFloat(lat)]);
        }
        //setInputAddress(display_name);
        setSelectedAddress(display_name);
        deliveryAddress(display_name);
      } else {
        alert("No location found for this pincode.");
      }
    } catch (error) {
      console.error("Error fetching location from pincode:", error);
    }
  };
  return (
    <div className="flex flex-col items-center w-full p-3">
  {/* Pincode Input */}
  <div className="relative w-full max-w-xs">
    <input
      type="text"
      placeholder="Enter Pincode"
      onBlur={(e) => handlePincodeSearch(e.target.value)}
      className="w-full p-3 text-center rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>

  {/* Selected Address */}
  <p className="mt-2 text-sm text-white/80">{selectedAddress || "Select a location on the map"}</p>

  {/* Scrollable Map Container */}
  <div
    ref={mapContainerRef}
    className="mt-3 w-full h-60 max-h-[400px] rounded-xl shadow-xl overflow-auto border border-white/20 backdrop-blur-md bg-white/10 custom-scroll"
  />
  <style>{`
  .custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }
  .custom-scroll::-webkit-scrollbar {
    width: 5px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`}</style>
</div>

  );
};

export default MapLibreWithSuggestions;
