"use client";

import PropertyCard from "./cards/Property";

const PropertyOverview = ({ properties }) => {
  return <div className="property-overview">
    { properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>;
};

export default PropertyOverview;