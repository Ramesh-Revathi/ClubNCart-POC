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
    <div>
           <div style={{ textAlign: "center", marginBottom: "10px" }}>
  <input
    type="text"
    placeholder="Enter a pincode"
    onBlur={(e) => handlePincodeSearch(e.target.value)}
    style={{
      padding: "10px",
      width: "70%",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginRight: "10px",
    }}
  />
</div>
<p style={{ textAlign: "center", marginTop: "10px", color: "darkslategray" }}>
        {selectedAddress || "Select a location on the map"}
      </p>
      <div
        ref={mapContainerRef}
        style={{
          height: "60vh",
          width: "100%",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default MapLibreWithSuggestions;
