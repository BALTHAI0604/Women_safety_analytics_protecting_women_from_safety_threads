import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationSelectorModal } from '../components/LocationSelectorModal';

const LocationContext = createContext(null);

const DEFAULT_COORDS = {
  latitude: 10.9601,
  longitude: 78.0766,
  accuracy: 10,
  address: 'Karur Town, Karur, Tamil Nadu, India',
  city: 'Karur',
  state: 'Tamil Nadu',
  country: 'India'
};

export const LocationProvider = ({ children }) => {
  const [coords, setCoords] = useState(() => {
    const saved = localStorage.getItem('wsa_user_coords');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved coords:', e);
      }
    }
    return DEFAULT_COORDS;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const [error, setError] = useState(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Sync coords changes to localStorage
  useEffect(() => {
    if (coords) {
      localStorage.setItem('wsa_user_coords', JSON.stringify(coords));
    }
  }, [coords]);

  const openLocationSelector = () => setIsSelectorOpen(true);
  const closeLocationSelector = () => setIsSelectorOpen(false);

  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
        headers: { 'Accept-Language': 'en' }
      });
      if (res.ok) {
        const data = await res.json();
        const address = data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        const city = data.address?.city || data.address?.town || data.address?.state_district || data.address?.county || 'Karur';
        const state = data.address?.state || 'Tamil Nadu';
        const country = data.address?.country || 'India';
        return { address, city, state, country };
      }
    } catch (e) {
      console.warn('Reverse geocode fallback:', e);
    }
    return {
      address: `Lat: ${lat.toFixed(5)}, Lng: ${lon.toFixed(5)}`,
      city: 'Karur',
      state: 'Tamil Nadu',
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

        const newCoords = {
          latitude: lat,
          longitude: lon,
          accuracy: acc,
          address: geoInfo.address,
          city: geoInfo.city,
          state: geoInfo.state,
          country: geoInfo.country
        };
        setCoords(newCoords);
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

  const setManualLocation = async (lat, lon, cityName = 'Custom Location', stateName = '', countryName = 'India', customAddress = '') => {
    setIsLoading(true);
    let address = customAddress;
    let state = stateName;
    let country = countryName;

    if (!address) {
      const geoInfo = await reverseGeocode(lat, lon);
      address = geoInfo.address;
      state = state || geoInfo.state;
      country = country || geoInfo.country;
    }

    const newCoords = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      accuracy: 5,
      address: address || `${cityName}, ${state ? state + ', ' : ''}${country}`,
      city: cityName,
      state: state,
      country: country
    };

    setCoords(newCoords);
    setIsLoading(false);
  };

  return (
    <LocationContext.Provider value={{
      coords,
      isLoading,
      permissionState,
      error,
      isSelectorOpen,
      openLocationSelector,
      closeLocationSelector,
      refreshLocation,
      setManualLocation
    }}>
      {children}
      <LocationSelectorModal />
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
