/**
 * @vitest-environment jsdom
 */
import { expect } from 'vitest';

import GovernanceLanguage from '../GovernanceLanguage';
import { LanguageName } from '../LanguageName';

const language = new GovernanceLanguage().getLanguage();
let languagesMock: any;

beforeAll(() => {
    languagesMock = vi.spyOn(navigator, 'languages', 'get');
});

beforeEach(() => {
    languagesMock.mockReturnValue(null);
});

it('should return English as the default language', () => {
    expect(language).toBe(LanguageName.ENGLISH);
});
