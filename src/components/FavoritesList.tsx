"use client";
import React, { useState, useEffect } from "react";
import { Property } from "../../devlink/Property";
import { getFavorites } from "../utils/favorites";
import { formatPrice } from "../utils/properties";
import type { PropertyEntry } from "../types/property";

export function FavoritesList() {
  const [favorites, setFavorites] = useState<PropertyEntry[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const loadFavorites = () => {
      const favoriteProperties = getFavorites();
      setFavorites(favoriteProperties);
      setLoading(false);
    };

    loadFavorites();

    // Listen for favorites changes
    const handleFavoritesChange = () => {
      loadFavorites();
    };

    window.addEventListener("favorites-changed", handleFavoritesChange);
    return () => {
      window.removeEventListener("favorites-changed", handleFavoritesChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Favorieten worden geladen...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8 flex flex-col items-center justify-center gap-6">
        <p className="text-gray-500 text-lg">
          Je hebt nog geen favorieten toegevoegd.
        </p>
        <a
          href="/app"
          className="text-primary hover:underline inline-block"
        >
          Bekijk alle woningen →
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 2xl:grid-cols-3">
      {favorites.map((property) => {
        // Validate property has required fields before rendering
        if (!property || !property.uuid || !property.name || !property.location || !property.price) {
          console.warn("Invalid property in favorites, skipping:", property);
          return null;
        }
        
        return (
          <Property
            key={property.uuid}
            statusText={property.status || "Onbekend"}
            imageImage={property.main_image_url || undefined}
            locationTitle={property.location?.plaats || "Onbekend"}
            addressTitle={property.name}
            priceText={formatPrice(property.price)}
            propertyLink={{ href: `/app/${property.uuid}` }}
          />
        );
      })}
    </div>
  );
}

