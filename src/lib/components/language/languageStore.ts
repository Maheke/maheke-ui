import { writable } from 'svelte/store';

import GovernanceLanguage from '../../i18n/GovernanceLanguage';
import type { ITranslation } from '../../i18n/ITranslation';
import LocalStorage from '../../storage/LocalStorage';

const governanceLanguage = new GovernanceLanguage();
const storage = new LocalStorage();
export const language = writable({} as ITranslation);
export const detectedLanguage = writable(governanceLanguage.getLanguage());
export const activeLanguage = writable(storage.getItem('activeLang') || '');
export const isLanguageLoading = writable(true);

governanceLanguage.getText().then((lang) => {
    language.set(lang);
    isLanguageLoading.set(false);
});

activeLanguage.subscribe((language) => storage.storeItem('activeLang', language));
