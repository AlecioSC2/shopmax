const pathAwareContextProcessor = require('@palecio/nova-server').contextProcessors
  .pathAware;
const fs = require('fs').promises;
const FatalError = require('@palecio/nova-core').errors.FatalError;
const path = require('path');

module.exports = pathAwareContextProcessor.extend({
  name: 'Get Product',
  priority: 80,
  patterns: ['*/product/*'],
  async process(executionContext, contentModel) {
    const productId = contentModel.product.id || '';
    const products = JSON.parse(
      (await fs.readFile(
        path.resolve(__dirname + '/../db/products.json')
      )).toString()
    );
    const product = products.find(product => productId === product.id);
    if (product) {
      contentModel.product = Object.assign(contentModel.product, product);
    } else {
      throw new FatalError('Product does not exist.');
    }
  }
});
