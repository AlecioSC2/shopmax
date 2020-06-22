const pathAwareContextProcessor = require('@palecio/nova-server').contextProcessors
  .pathAware;
const fs = require('fs').promises;
const NonFatalError = require('@palecio/nova-core').errors.NonFatalError;
const path = require('path');
const getImageNames = id => fs.readdir(
  path.resolve(`${__dirname}/../static/images/products/${id}`)
);

module.exports = pathAwareContextProcessor.extend({
  name: 'Get Product Images',
  priority: 80,
  patterns: ['*/product/*'],
  async process(executionContext, contentModel) {
    const productId = contentModel.product.id || '';
    try {
      const productImageNames = await getImageNames(productId);
      contentModel.product.images = productImageNames.map(
        imageName => `./images/products/${productId}/${imageName}`
      );
    } catch (error) {
      throw new NonFatalError('Could not find the product images.');
    }
  }
});
