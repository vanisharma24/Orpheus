export const ORPHEUS_BACKEND_CANISTER_ID: string | undefined = import.meta.env
  .VITE_ORPHEUS_BACKEND_CANISTER_ID as string | undefined;

export const II_URL: string =
  (import.meta.env.VITE_INTERNET_IDENTITY_URL as string) ||
  "https://identity.ic0.app";

export const DFX_NETWORK: string =
  (import.meta.env.VITE_DFX_NETWORK as string) || "local";

export const IC_HOST: string =
  (import.meta.env.VITE_IC_HOST as string) ||
  (DFX_NETWORK === "ic" ? "https://icp-api.io" : "http://127.0.0.1:4943");

if (!ORPHEUS_BACKEND_CANISTER_ID) {
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_ORPHEUS_BACKEND_CANISTER_ID is not set. Set it in your .env file to enable backend calls."
  );
}
