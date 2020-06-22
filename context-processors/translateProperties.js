const genericTranslateProperties = require('../../generic-context-processors/genericTranslateProperties');

module.exports = genericTranslateProperties.extend({
  name: 'Translate Product Properties',
  patterns: ["*/es/product*"],
  priority: 40,
  config: {
    propertiesToTranslate: { product: ['title', 'description', 'reviews'] }
  }
});
