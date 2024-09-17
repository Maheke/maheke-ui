import GovernanceLanguage from '../../i18n/GovernanceLanguage';
import { language } from './languageStore';

const governanceLanguage = new GovernanceLanguage();

export async function changeLanguage(languageISO: string) {
    const newLanguage = await governanceLanguage.getText(languageISO);
    language.set(newLanguage);
}
