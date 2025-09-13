const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const path = require('path');

i18next
  .use(Backend)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json')
    },
    ns: ['translation'],
    defaultNS: 'translation'
  });

module.exports = i18next;
