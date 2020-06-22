const pathAwareContextProcessor = require("@palecio/nova-server")
  .contextProcessors.pathAware;

const http = require("axios");
const translateText = (text, sourceLanguage, targetLanguage) =>
  http
    .request({
      method: "post",
      url: "https://translation.googleapis.com/language/translate/v2",
      params: {
        key: process.env.GOOGLE_TRANSLATE_API_KEY,
        target: targetLanguage,
        source: sourceLanguage,
        format: "text",
        q: text
      }
    })
    .then(({ data }) => data.data.translations[0].translatedText)
    .catch(error => console.error(error.response) || "");

module.exports = pathAwareContextProcessor.extend({
  name: "Generic Translate Properties",
  async process(executionContext, contentModel) {
    const propertiesToTranslate = executionContext.config.propertiesToTranslate;
    return (
      propertiesToTranslate &&
      Promise.all(
        Object.keys(propertiesToTranslate).map(async context => {
          const propertyNames = propertiesToTranslate[context];
          const propertyNamesArray = Array.isArray(propertyNames)
            ? propertyNames
            : [propertyNames];
          return Promise.all(
            propertyNamesArray.map(async propertyName => {
              const property =
                contentModel[context] && contentModel[context][propertyName];
              if (property) {
                if (Array.isArray(property)) {
                  return (contentModel[context][
                    propertyName
                  ] = await Promise.all(
                    property.map(async item => {
                      return await translateText(item, "en", "es");
                    })
                  ));
                } else {
                  return (contentModel[context][
                    propertyName
                  ] = await translateText(property, "en", "es"));
                }
              }
              return Promise.resolve();
            })
          );
        })
      )
    );
  }
});
