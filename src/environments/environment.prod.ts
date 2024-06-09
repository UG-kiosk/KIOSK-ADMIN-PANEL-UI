const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL;

export const prodEnvironment = {
  KIOSK_API_URL: `${GATEWAY_URL}/kiosk-api`,
  SCRAPERS_API_URL: `${GATEWAY_URL}/scrapers-kiosk-api`,
};
