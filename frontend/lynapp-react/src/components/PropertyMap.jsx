import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/PropertyMap.css';

// Fix for default markers not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = ({ property }) => {
  const [coords, setCoords] = useState({ lat: 49.2827, lng: -123.1207 }); // Vancouver default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geocode = async () => {
      // If property already has coordinates, use them
      if (property.latitude && property.longitude) {
        setCoords({ lat: property.latitude, lng: property.longitude });
        setLoading(false);
        return;
      }

      // Build address for geocoding
      const address = `${property.street_address}, ${property.city}, ${property.province}`;
      
      try {
        // Free OpenStreetMap geocoding - no API key needed!
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
        );
        const data = await response.json();
        
        if (data[0]) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          });
        }
      } catch (error) {
        console.log('Geocoding failed, using default location');
      }
      
      setLoading(false);
    };

    geocode();
  }, [property]);

  if (loading) {
    return <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>;
  }

  return (
    <div className="property-map" style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lng]}>
          <Tooltip permanent direction="top" offset={[-15, -20]}>
            <div>
              <strong>{property.title}</strong><br />
              {property.street_address}<br />
              {property.city}, {property.province}
            </div>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
    
  );
};

export default PropertyMap;