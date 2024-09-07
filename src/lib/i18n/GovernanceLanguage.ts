import GovernanceLanguageFactory from "./GovernanceLanguageFactory";
import type { ITranslation } from "./ITranslation";

export default class GovernanceLanguage {
  getLanguage(): string {
    const DEFAULT_LANGUAGE = "en";
    const ISO_639_1_LENGTH = 2;
    return DEFAULT_LANGUAGE.substr(0, ISO_639_1_LENGTH);
  }

  async getText(languageISO?: string): Promise<ITranslation> {
    return await new GovernanceLanguageFactory().create(
      languageISO || this.getLanguage()
    );
  }
}
