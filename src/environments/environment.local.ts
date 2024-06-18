const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL;

const gatewayEnvironment = {
  KIOSK_API_URL: `${GATEWAY_URL}/kiosk-api`,
  SCRAPERS_API_URL: `${GATEWAY_URL}/scrapers-kiosk-api`,
};

export const localEnvironment = {
  KIOSK_API_URL: import.meta.env.VITE_KIOSK_API_URL || gatewayEnvironment.KIOSK_API_URL,
  SCRAPERS_API_URL: import.meta.env.VITE_SCRAPERS_API_URL || gatewayEnvironment.SCRAPERS_API_URL,
};
