"use client";

const Property = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={property.image} 
          alt={property.title}
          className="property-image"
        />
        <div className="property-status">
          {property.status}
        </div>
      </div>
      
      <div className="property-content">
        <div className="property-header">
          <h3 className="property-title">{property.title}</h3>
          <p className="property-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {property.location}
          </p>
        </div>
        
        <p className="property-description">{property.description}</p>
        
        <div className="property-details">
          <div className="property-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="property-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="property-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <path d="M9 9h6v6H9z"></path>
            </svg>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="property-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            <span>{property.yearBuilt}</span>
          </div>
        </div>
        
        <div className="property-footer">
          <div className="property-price">
            {formatPrice(property.price)}
          </div>
          <div className="property-type">
            {property.type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;