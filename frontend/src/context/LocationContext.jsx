import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext(null);

const DEFAULT_COORDS = {
  latitude: 12.9716,
  longitude: 77.5946,
  accuracy: 12,
  address: 'MG Road, Central Business District, Bengaluru',
  city: 'Bengaluru',
  state: 'Karnataka',
  country: 'India'
};

export const LocationProvider = ({ children }) => {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const [error, setError] = useState(null);

  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
        headers: { 'Accept-Language': 'en' }
      });
      if (res.ok) {
        const data = await res.json();
        const address = data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        const city = data.address?.city || data.address?.town || data.address?.state_district || 'Bengaluru';
        const state = data.address?.state || '';
        const country = data.address?.country || '';
        return { address, city, state, country };
      }
    } catch (e) {
      console.warn('Reverse geocode fallback:', e);
    }
    return {
      address: `Lat: ${lat.toFixed(5)}, Lng: ${lon.toFixed(5)}`,
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India'
    };
  };

  const refreshLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setPermissionState('denied');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const acc = Math.round(pos.coords.accuracy);

        setPermissionState('granted');
        const geoInfo = await reverseGeocode(lat, lon);

        setCoords({
          latitude: lat,
          longitude: lon,
          accuracy: acc,
          address: geoInfo.address,
          city: geoInfo.city,
          state: geoInfo.state,
          country: geoInfo.country
        });
        setIsLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setError(err.message);
        setPermissionState('denied');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    refreshLocation();
  }, []);

  const setManualLocation = async (lat, lon, cityName = 'Custom Location') => {
    setIsLoading(true);
    const geoInfo = await reverseGeocode(lat, lon);
    setCoords({
      latitude: lat,
      longitude: lon,
      accuracy: 5,
      address: geoInfo.address,
      city: cityName || geoInfo.city,
      state: geoInfo.state,
      country: geoInfo.country
    });
    setIsLoading(false);
  };

  return (
    <LocationContext.Provider value={{
      coords,
      isLoading,
      permissionState,
      error,
      refreshLocation,
      setManualLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
