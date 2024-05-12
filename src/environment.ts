const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL;

const prodEnvironment = {
  KIOSK_API_URL: `${GATEWAY_URL}/kiosk-api`,
  SCRAPERS_API_URL: `${GATEWAY_URL}/scrapers-api`, // to be deleted
};

const localEnvironment = {
  KIOSK_API_URL: import.meta.env.VITE_KIOSK_API_URL || prodEnvironment.KIOSK_API_URL,
  SCRAPERS_API_URL: import.meta.env.VITE_SCRAPERS_API_URL || prodEnvironment.SCRAPERS_API_URL, // to be deleted
};

export const environment = import.meta.env.PROD ? prodEnvironment : localEnvironment;
