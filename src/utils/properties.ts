import type { PropertyEntry, LocationData } from "../types/property";

/**
 * Helper function to format location object to string
 */
export function formatLocation(location: LocationData | undefined): string {
  if (!location) return "";
  
  const parts: string[] = [];
  if (location.straat) {
    parts.push(location.straat);
    if (location.huisnummer) {
      parts.push(location.huisnummer);
      if (location.huisnummer_toevoeging) {
        parts.push(location.huisnummer_toevoeging);
      }
    }
  }
  if (location.postcode) parts.push(location.postcode);
  if (location.plaats) parts.push(location.plaats);
  if (location.provincie) parts.push(location.provincie);
  
  return parts.join(" ");
}

/**
 * Helper function to encode base64 (works in Cloudflare Workers)
 */
function encodeBase64(str: string): string {
  try {
    // Try Buffer first (available with nodejs_compat)
    if (typeof Buffer !== "undefined") {
      return Buffer.from(str).toString("base64");
    }
    // Fallback to btoa for browser/worker environments
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    console.error("Base64 encoding error:", e);
    throw e;
  }
}

/**
 * Get API credentials from environment variables
 */
function getApiCredentials(env?: Record<string, unknown>): { username: string; password: string } {
  const username = (env?.API_USERNAME as string) || import.meta.env.API_USERNAME || "";
  const password = (env?.API_PASSWORD as string) || import.meta.env.API_PASSWORD || "";
  
  return { username, password };
}

/**
 * Extract properties array from API response
 */
function extractPropertiesFromResponse(data: unknown): PropertyEntry[] {
  if (Array.isArray(data)) {
    return data as PropertyEntry[];
  }
  
  if (data && typeof data === "object") {
    const responseData = data as Record<string, unknown>;
    if (Array.isArray(responseData.data)) {
      return responseData.data as PropertyEntry[];
    }
    if (Array.isArray(responseData.entries)) {
      return responseData.entries as PropertyEntry[];
    }
    if (Array.isArray(responseData.items)) {
      return responseData.items as PropertyEntry[];
    }
    if (Array.isArray(responseData.results)) {
      return responseData.results as PropertyEntry[];
    }
    if (Array.isArray(responseData.properties)) {
      return responseData.properties as PropertyEntry[];
    }
    
    console.warn("Unknown response structure. Full response:", JSON.stringify(data, null, 2));
  }
  
  return [];
}

/**
 * Get properties from the API
 * @param env - Optional environment variables object (from Astro.locals.runtime.env)
 */
export async function getProperties(env?: Record<string, unknown>): Promise<PropertyEntry[]> {
  try {
    const { username, password } = getApiCredentials(env);
    
    if (!username || !password) {
      console.error("API credentials not set! Please set API_USERNAME and API_PASSWORD environment variables.");
      console.error("For local dev: create .dev.vars file with API_USERNAME and API_PASSWORD");
      console.error("For Cloudflare: set secrets via wrangler secret put API_USERNAME");
      return [];
    }
    
    // Create basic auth header
    const credentials = `${username}:${password}`;
    const authHeader = `Basic ${encodeBase64(credentials)}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": authHeader,
    };

    const response = await fetch("https://portal.makelaar.app/api/entries", {
      headers,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`Failed to fetch properties: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    const properties = extractPropertiesFromResponse(data);
    
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return [];
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: PropertyEntry["price"]): string {
  if (!price) return "";
  
  if (price.vraagprijs) {
    const priceValue = parseInt(price.vraagprijs, 10);
    if (!isNaN(priceValue)) {
      return priceValue.toLocaleString("nl-NL", {
        style: "currency",
        currency: "EUR",
      });
    }
  }
  
  return price.aanvaarding || "";
}

