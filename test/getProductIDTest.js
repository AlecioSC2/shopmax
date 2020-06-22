// Importar librería de pruebas unitarias
const describe = require('riteway').describe;

// Context Processor que se desea probar
const getRelatedProductsContextProcessor = require('../context-processors/getProductID');

describe('getProductID', async assert => {
  const path = '/en/product/3';
  const contentModel = { product: {} }; // Se define el Content Model inicial
  await getRelatedProductsContextProcessor.process({ path }, contentModel); // Se ejecuta el Context Processor
  assert({
    // Se ejecuta la prueba unitaria
    given: `Un Content Model con un contexto llamado 'product' y un Execution Context con una propiedad 'path' cuyo valor es igual a '${path}'`,
    should: 'Devolver "3", que representa el ID del producto deseado.',
    actual: contentModel.product.id,
    expected: '3'
  });

  const contentModel2 = { product: {} }; // Se define el Content Model inicial
  await getRelatedProductsContextProcessor.process({ path: '' }, contentModel2); // Se ejecuta el Context Processor

  assert({
    // Se ejecuta la prueba unitaria
    given: `Un Content Model vacío y un Execution Context con una propiedad 'path' cuyo valor es igual a ''`,
    should: 'Devolver \'\' ya que no existe el ID del producto en la URL.',
    actual: contentModel2.product.id,
    expected: ''
  });
});
