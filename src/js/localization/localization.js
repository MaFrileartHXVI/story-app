import { configureLocalization } from '@lit/localize';

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['id'],
  loadLocale: (locale) => import(`./generated/locales/${locale}.js`),
});
