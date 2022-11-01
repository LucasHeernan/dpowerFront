const { Router } = require('express');
const router = Router();
const { Comment } = require('../db');


          // || POST /COMENTARIOS || //
router.post('', async (req, res) => {
  try {
    const { content } = req.body;
    if (content) {
      const newComment = await Comment.create({
        content,
      });
      res.json(newComment);
    } else {
      throw new Error('the required data is empty');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
          // | AGREGAR RELACION USER | //
          // | AGREGAR RELACION CON EL POST | //
});


          // || DELETE /COMENTARIOS || //
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
