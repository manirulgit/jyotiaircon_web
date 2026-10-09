import React from 'react';
import './Location.css';
import Header from '../header';
import LocationDemo from './LocationDemo';

function Location() {
  // For now, we'll use the demo mode by default
  // This can be easily switched to Google Maps when API key is provided
  return <LocationDemo />;
}

export default Location;
