import type { PropertyEntry } from "../types/property";

const API_BASE_URL = "https://portal.makelaar.app/api";

/**
 * Get API credentials from environment variables
 */
function getApiCredentials(env?: Record<string, unknown>): { username: string; password: string } {
  const username = (env?.API_USERNAME as string) || import.meta.env.API_USERNAME || "";
  const password = (env?.API_PASSWORD as string) || import.meta.env.API_PASSWORD || "";
  return { username, password };
}

/**
 * Create Basic Auth header
 */
function createAuthHeader(username: string, password: string): string {
  const credentials = `${username}:${password}`;
  // Use btoa for Cloudflare Workers compatibility
  const encoded = btoa(unescape(encodeURIComponent(credentials)));
  return `Basic ${encoded}`;
}

/**
 * Create authenticated fetch headers
 */
function createAuthHeaders(env?: Record<string, unknown>): HeadersInit {
  const { username, password } = getApiCredentials(env);
  
  if (!username || !password) {
    throw new Error("API credentials not configured. Set API_USERNAME and API_PASSWORD environment variables.");
  }
  
  return {
    "Content-Type": "application/json",
    "Authorization": createAuthHeader(username, password),
  };
}

/**
 * Extract properties array from API response
 */
function extractPropertiesFromResponse(data: unknown): PropertyEntry[] {
  if (Array.isArray(data)) {
    return data;
  }
  
  if (data && typeof data === "object") {
    const responseData = data as Record<string, unknown>;
    const possibleKeys = ["data", "entries", "items", "results", "properties"];
    
    for (const key of possibleKeys) {
      if (Array.isArray(responseData[key])) {
        return responseData[key] as PropertyEntry[];
      }
    }
  }
  
  return [];
}

/**
 * Get properties from the API
 * @param env - Optional environment variables object (from Astro.locals.runtime.env)
 */
export async function getProperties(env?: Record<string, unknown>): Promise<PropertyEntry[]> {
  try {
    const headers = createAuthHeaders(env);
    const response = await fetch(`${API_BASE_URL}/entries`, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch properties: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    return extractPropertiesFromResponse(data);
  } catch (error) {
    console.error("Error fetching properties:", error);
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

/**
 * Get property by id
 * @param uuid - The UUID of the property to fetch
 * @param env - Optional environment variables object (from Astro.locals.runtime.env)
 */
export async function getPropertyById(uuid: string, env?: Record<string, unknown>): Promise<PropertyEntry> {
  const headers = createAuthHeaders(env);
  const response = await fetch(`${API_BASE_URL}/entries/${uuid}`, { headers });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch property: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json() as { data?: PropertyEntry } | PropertyEntry;
  // Extract the property data from the response wrapper
  return ('data' in data && data.data) ? data.data : data as PropertyEntry;
}
