let products = [];

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
};

exports.createProduct = (req, res) => {
    const product = {
        id: products.length + 1,
        ...req.body
    };
    products.push(product);
    res.status(201).json(product);
};
