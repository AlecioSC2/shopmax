const pathAwareContextProcessor = require('@palecio/nova-server').contextProcessors
  .pathAware;
const fs = require('fs').promises;
const FatalError = require('@palecio/nova-core').errors.FatalError;
const path = require('path');

module.exports = pathAwareContextProcessor.extend({
  name: 'Get Reviews',
  priority: 80,
  patterns: ['*/product/*'],
  async process(executionContext, contentModel) {
    const productId = contentModel.product.id || '';
    const reviews = JSON.parse(
      (await fs.readFile(
        path.resolve(__dirname + '/../db/reviews.json')
      )).toString()
    );
    const productReviews = reviews.find(review => productId === review.id);
    if (productReviews) {
      contentModel.product.reviews = productReviews.reviews;
    } else {
      throw new FatalError('Product does not exist.');
    }
  }
});
