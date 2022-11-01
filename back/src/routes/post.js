const { Router } = require('express');
const router = Router();
const { Post } = require('../db');


          // || /POST || //
router.get('', async (req, res) => {
  try {
    const allPost = await Post.findAll();
    res.json(allPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


          // || POST /POST || //
router.post('', async (req, res) => {
  try {
    const { likes, powersGained, multimedia, description} = req.body;
    if ((likes && powersGained, multimedia, description)) {
      const newPost = await Post.create({
        likes,
        powersGained,
        multimedia,
        description,
      });
      res.json(newPost);
    } else {
      throw new Error('the required data is empty');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
          // | AGREGAR RELACION CON USERID | //
});


          // || DELETE /POST || //
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


          // || PUT /POST || //
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes, multimedia, description, powersGained } = req.body;

    const postUpdate = await Post.findByPk(id);
    postUpdate.likes = likes;
    postUpdate.multimedia = multimedia;
    postUpdate.description = description;
    postUpdate.powersGained = powersGained;

    await postUpdate.save();

    res.json(postUpdate);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;