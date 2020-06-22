// Importar librería de pruebas unitarias
const describe = require("riteway").describe;

// Context Processor que se desea probar
const getRelatedProductsContextProcessor = require("../context-processors/getRelatedProducts");

describe("getRelatedProductsContextProcessor", async assert => {
  const contentModel = { product: { id: 1 } }; // Se define el Content Model inicial
  await getRelatedProductsContextProcessor.process({}, contentModel); // Se ejecuta el Context Processor
  assert({
    // Se ejecuta la prueba unitaria
    given: "A Content Model with a product context and an 'id' property equal to 1.",
    should: "Return an array of products related to the product with id '1'",
    actual: JSON.stringify(contentModel.product.related),
    expected: JSON.stringify([
      {
        title: "Settlers of Catan",
        rating: 4.8,
        price: 44.1,
        id: "1",
        image: "./images/products/1/818oIpXL7tL._AC_SL1500_.jpg"
      },
      {
        title: "Magic The Gathering Core Set 2020 Deck Builder’s Toolkit",
        rating: 4.9,
        price: 25.79,
        id: "2",
        image: "./images/products/2/81Jk4AqAllL._AC_SL1500_.jpg"
      },
      {
        title: "Ticket To Ride",
        rating: 4,
        price: 44.92,
        id: "3",
        image: "./images/products/3/81HRB7US3QL._AC_SL1500_.jpg"
      },
      {
        title: "Risk",
        rating: 4.4,
        price: 52.99,
        id: "4",
        image: "./images/products/4/81kgxqmzvoL._AC_SL1500_.jpg"
      },
      {
        title: "Family Classics Chess",
        rating: 5,
        price: 11,
        id: "5",
        image: "./images/products/5/91xKe5hMbHL._AC_SL1500_.jpg"
      }
    ])
  });
});
