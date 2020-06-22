const pathAwareContextProcessor = require('@palecio/nova-server').contextProcessors
  .pathAware;

module.exports = pathAwareContextProcessor.extend({
  name: 'Get Product ID',
  priority: 99,
  patterns: ['*/product/*'],
  process(executionContext, contentModel) {
    const requestPath = executionContext.path;
    const pathArray = requestPath.split('/');
    contentModel.product.id = pathArray.slice(-1).join();
  }
});
