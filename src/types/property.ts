/**
 * Type definitions for Property Entry API response
 */

export type LocationData = {
  plaats: string;
  straat: string;
  postcode: string;
  provincie: string;
  huisnummer: string;
  huisnummer_toevoeging: string | null;
};

export type LocationCoordinates = {
  lat: number;
  lng: number;
};

export type PriceData = {
  vraagprijs: string;
  aanvaarding: string;
  koopconditie: string;
};

export type TuinDetails = {
  type: string;
  kwaliteit: string;
  hoofdtuin_type: string | null;
};

export type GarageDetails = {
  soort: string;
  voorzieningen: string;
};

export type OverigDetails = {
  residential: boolean;
  recreational: boolean;
  kadaster_perceel: string | null;
  onderhoud_binnen: string;
  onderhoud_buiten: string;
  permanente_bewoning: boolean;
};

export type EnergieDetails = {
  type: string;
  datum: string;
  klasse: string;
  bouwjaar: string;
  eigendom: string;
  isolatie: string;
  brandstof: string;
  warmwater: string;
  verwarming: string;
};

export type IndelingDetails = {
  aantal_kamers: string;
  inhoud_woning: string;
  aantal_badkamers: string;
  aantal_woonlagen: number;
  aantal_slaapkamers: string;
  oppervlakte_woning: string;
  oppervlakte_perceel: string;
  oppervlakte_buitenruimte: string;
  oppervlakte_externe_opslag: string | null;
  oppervlakte_overige_ruimtes: string;
};

export type ConstructieDetails = {
  bouwjaar: string;
  dak_type: string;
  bouwjaar_omschrijving: string;
};

export type DetailsData = {
  tuin: TuinDetails;
  garage: GarageDetails;
  overig: OverigDetails;
  energie: EnergieDetails;
  indeling: IndelingDetails;
  constructie: ConstructieDetails;
};

export type SiteContentData = {
  omschrijving: string;
};

export type MediaItem = {
  url: string;
  type: string;
  title: string;
  brochure: boolean;
  filename: string;
  sort_order: number;
  updated_at: string;
  is_main_image: boolean;
};

export type UploadedMediaItem = {
  url: string;
  filename: string;
  type: string;
  brochure: boolean;
  is_main_image: boolean;
  sort_order: number;
};

export type BrochureFields = {
  build_year: number;
  description: string;
};

export type PropertyEntry = {
  uuid: string;
  name: string;
  status: string;
  type: string;
  location: LocationData;
  price: PriceData;
  details: DetailsData;
  site_content: SiteContentData;
  media: MediaItem[];
  publication_date: string;
  source_updated_at: string;
  last_export_at: string;
  created_at: string;
  updated_at: string;
  location_coordinates: LocationCoordinates;
  target_id: number;
  media_imported_at: string | null;
  main_image: string;
  last_imported_at: string;
  brochure_fields: BrochureFields;
  brochure_has_hidden_address: boolean;
  storage_path: string;
  thumbnail_name: string;
  full_address: string;
  house_number: string;
  main_image_url: string;
  uploaded_media: UploadedMediaItem[];
  brochure_name: string;
};

