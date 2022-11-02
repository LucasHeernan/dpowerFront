const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { todaInfo } = require('../controllers');
const { Product } = require('../db');



          // || /PRODUCTOS || //
router.get('', async (req, res) => {
  try {
    const products = await todaInfo();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

          // || /PRODUCTOS/:ID || //
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const products = await todaInfo();
  if (id) {
    const filterId = await products.filter((e) => e.id == id);
    filterId.length
      ? res.status(200).send(filterId)
      : res.status(400).send('Id de producto no encontrada');
  }
});


          // || POST /PRODUCTOS || //
router.post('', async (req, res) => {
  try {
    const { name, category, price, stock, published, image, description } = req.body;

    if (name && category && price && stock && published) {
      const newProduct = await Product.create({
        name,
        category,
        price,
        stock,
        published,
        image,
        description
      });

      res.json(newProduct);
    } else {
      throw new Error('the required data is empty');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


          // || DELETE /PRODUCTOS || //
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


          // || PUT /PRODUCTOS || //
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, category, price, image } = req.body;

    const product = await Product.findByPk(id);
    product.name = name;
    product.stock = stock;
    product.category = category;
    product.price = price;
    product.image = image;

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
