import type { PropertyEntry } from "../types/property";

const FAVORITES_STORAGE_KEY = "webflow-property-favorites";

/**
 * Get all favorite property UUIDs from localStorage
 */
export function getFavoriteIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];
    
    const favorites = JSON.parse(stored) as string[];
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
    return [];
  }
}

/**
 * Get all favorite property entries from localStorage
 */
export function getFavorites(): PropertyEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(`${FAVORITES_STORAGE_KEY}-data`);
    if (!stored) return [];
    
    const favorites = JSON.parse(stored) as unknown[];
    
    if (!Array.isArray(favorites)) {
      return [];
    }
    
    // Filter out invalid entries and ensure they have required fields
    return favorites.filter(validateProperty) as PropertyEntry[];
  } catch (error) {
    console.error("Error reading favorites data from localStorage:", error);
    // Clear corrupted data
    try {
      localStorage.removeItem(`${FAVORITES_STORAGE_KEY}-data`);
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
    } catch (clearError) {
      console.error("Error clearing corrupted favorites:", clearError);
    }
    return [];
  }
}

/**
 * Check if a property is favorited
 */
export function isFavorite(uuid: string): boolean {
  const favorites = getFavoriteIds();
  return favorites.includes(uuid);
}

/**
 * Validate that a property has required fields
 */
function validateProperty(property: unknown): property is PropertyEntry {
  if (!property || typeof property !== "object") {
    return false;
  }
  
  const prop = property as Partial<PropertyEntry>;
  return !!(
    prop.uuid &&
    typeof prop.uuid === "string" &&
    prop.name &&
    prop.location &&
    prop.price
  );
}

/**
 * Add a property to favorites
 */
export function addFavorite(property: PropertyEntry): void {
  if (typeof window === "undefined") {
    return;
  }

  // Validate property before storing
  if (!validateProperty(property)) {
    console.error("Invalid property data, cannot add to favorites:", property);
    return;
  }

  try {
    const favorites = getFavoriteIds();
    const favoritesData = getFavorites();

    // Check if already favorited
    if (favorites.includes(property.uuid)) {
      // Update existing favorite data in case property was updated
      const existingIndex = favoritesData.findIndex((p) => p.uuid === property.uuid);
      if (existingIndex !== -1) {
        favoritesData[existingIndex] = property;
        localStorage.setItem(`${FAVORITES_STORAGE_KEY}-data`, JSON.stringify(favoritesData));
      }
      return;
    }

    // Add to favorites
    favorites.push(property.uuid);
    favoritesData.push(property);

    // Save to localStorage
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    localStorage.setItem(`${FAVORITES_STORAGE_KEY}-data`, JSON.stringify(favoritesData));

    // Dispatch custom event for reactivity
    window.dispatchEvent(new CustomEvent("favorites-changed"));
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
}

/**
 * Remove a property from favorites
 */
export function removeFavorite(uuid: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const favorites = getFavoriteIds();
    const favoritesData = getFavorites();

    // Remove from favorites
    const updatedFavorites = favorites.filter((id) => id !== uuid);
    const updatedFavoritesData = favoritesData.filter((prop) => prop.uuid !== uuid);

    // Save to localStorage
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    localStorage.setItem(`${FAVORITES_STORAGE_KEY}-data`, JSON.stringify(updatedFavoritesData));

    // Dispatch custom event for reactivity
    window.dispatchEvent(new CustomEvent("favorites-changed"));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}

/**
 * Toggle favorite status of a property
 */
export function toggleFavorite(property: PropertyEntry): void {
  if (isFavorite(property.uuid)) {
    removeFavorite(property.uuid);
  } else {
    addFavorite(property);
  }
}

