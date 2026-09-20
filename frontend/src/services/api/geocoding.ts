export type Location = { city: string; country: string };

type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state?: string;
  country?: string;
};

// NOTE: this is OpenStreetMap's free public Nominatim server. It is fine for
// development and low traffic, but its usage policy allows ~1 request per
// second and forbids autocomplete-as-you-type. Swap in a paid geocoding
// provider (or your own backend) before a real launch.
const BASE_URL = "https://nominatim.openstreetmap.org";

// We only ever keep the city and country, never the coordinates.
const toLocation = (address?: NominatimAddress): Location | null => {
  if (!address?.country) return null;

  const city =
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    address.county ??
    address.state;

  return city ? { city, country: address.country } : null;
};

// "Utrecht" -> { city: "Utrecht", country: "Netherlands" }
export const searchCity = async (query: string): Promise<Location | null> => {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    limit: "1",
    featuretype: "settlement",
    "accept-language": "en",
  });

  const response = await fetch(`${BASE_URL}/search?${params}`);
  if (!response.ok) throw new Error("City search failed");

  const results: { address?: NominatimAddress }[] = await response.json();
  return toLocation(results[0]?.address);
};

// (52.09, 5.12) -> { city: "Utrecht", country: "Netherlands" }
export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<Location | null> => {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: "jsonv2",
    zoom: "10",
    addressdetails: "1",
    "accept-language": "en",
  });

  const response = await fetch(`${BASE_URL}/reverse?${params}`);
  if (!response.ok) throw new Error("Reverse lookup failed");

  const data: { address?: NominatimAddress } = await response.json();
  return toLocation(data.address);
};
