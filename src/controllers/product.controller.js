let products = [
  {
    id: 1,
    title: "Gold Necklace",
    description: "22K gold traditional necklace",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1",
    price: 55000
  },
  {
    id: 2,
    title: "Diamond Ring",
    description: "Elegant diamond ring for special occasions",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    price: 75000
  },
  {
    id: 3,
    title: "Silver Anklet",
    description: "Stylish silver anklet",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    price: 2000
  }
];

let nextId = 4;


//  GET ALL
exports.getProducts = (req, res) => {
  let result = [...products];

  const { search, sort } = req.query;

  // SEARCH (by title)
  if (search) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // SORT (by price)
  if (sort === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  }

  res.json(result);
};


//  GET BY ID
exports.getProductById = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
};


//  CREATE
exports.createProduct = (req, res) => {
  const { title, description, image, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: "Title and price required" });
  }

  const newProduct = {
    id: nextId++,
    title,
    description,
    image,
    price
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};


//  PUT (Full update)
exports.updateProduct = (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { title, description, image, price } = req.body;

  products[index] = {
    id,
    title,
    description,
    image,
    price
  };

  res.json(products[index]);
};


//  PATCH (Partial update)
exports.patchProduct = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  Object.assign(product, req.body);

  res.json(product);
};


//  DELETE
exports.deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(index, 1);

  res.status(204).end();
};