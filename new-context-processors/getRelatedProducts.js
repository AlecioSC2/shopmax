const pathAwareContextProcessor = require('@palecio/nova-server').contextProcessors
  .pathAware;
const fs = require('fs').promises;
const path = require('path');
const getImageNames = id => fs.readdir(
  path.resolve(`${__dirname}/../static/images/products/${id}`)
);
module.exports = pathAwareContextProcessor.extend({
  patterns: ['*/product/*'],
  priority: 60,
  name: 'Get Related Products',
  async process(executionContext, contentModel) {
    contentModel.product.related = await Promise.all(
      JSON.parse(
        (await fs.readFile(
          path.resolve(__dirname + '/../db/products.json')
        )).toString()
      )
        .filter(product => product.id !== contentModel.product.id)
        .map(({ title, rating, price, id }) => ({ title, rating, price, id }))
        .map(async product =>
          Object.assign(product, {
            image: `./images/products/${product.id}/${(await getImageNames(
              product.id
            )).pop()}`
          })
        )
    );
  }
});
