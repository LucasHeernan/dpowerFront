const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { allUsers, infoUser } = require('../controllers');
const { UserInfo } = require('../db');


            // | POST USUARIOS | //
router.post('', async (req, res) => {
  try {
    const {
      id,
      name,
      sport,
      age,
      nationality,
      description,
      post,
      username,
      mail,
      powers,
      validated,
    } = req.body;
    const user = await UserInfo.findOne({
      where: { mail },
    });
    if (name && sport && nationality && username && mail && powers && validated) {
      if (!user) {
        const newUser = await UserInfo.create({
          name,
          sport,
          age,
          nationality,
          description,
          post,
          username,
          mail,
          powers,
          validated,
        });
        res.json(newUser);
      } else {
        throw new Error('user already exists');
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


          // || USUARIOS BASE DE DATOS NUESTRA || //
router.get('', async (req, res) => {
  try {
    const allUsers = await UserInfo.findAll();

    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

          // || USUARIOS/:ID BASE DE DATOS NUESTRA || //
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await UserInfo.findByPk(id);

  res.json(user);
});


          // || PUT USUARIOS || //
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { powers } = req.query;

    const user = await UserInfo.findByPk(id);
    user.powers = powers;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;