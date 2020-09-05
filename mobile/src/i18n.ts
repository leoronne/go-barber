import i18n from 'i18n-js';

import en from './locales/en/translation.json';
import pt from './locales/pt/translation.json';

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = { en, pt };

export default i18n;
