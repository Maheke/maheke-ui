import GovernanceLanguage from "../i18n/GovernanceLanguage";
import type { ITranslation } from "../i18n/ITranslation";
import LocalStorage from "@/lib/storage/LocalStorage";
import { writable } from "svelte/store";

const storage = new LocalStorage();
const governanceLanguage = new GovernanceLanguage();
export const xdr = writable("");
export const publicKey = writable(storage.getItem("publicKey") || "");
export const is404 = writable(false);
export const loading = writable(false);
export const error = writable("");
export const language = writable({} as ITranslation);
export const detectedLanguage = writable(governanceLanguage.getLanguage());
export const isLanguageLoading = writable(true);

governanceLanguage.getText().then((lang) => {
  language.set(lang);
  isLanguageLoading.set(false);
});

publicKey.subscribe((key) => storage.storeItem("publicKey", key));
