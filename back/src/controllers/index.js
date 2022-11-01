require('dotenv').config();
const axios = require('axios');
const router = require('../routes');
const { Product, Order } = require('../db');
          // | TRAE LA INFO DE LA FAKESTOREAPI | //
// const allProducts = async () => {
//   const apiProducts = await axios.get(`https://fakestoreapi.com/products`);
//   const allProductsMap = await apiProducts.data.map((e) => ({
//     id: e.id,
//     name: e.title,
//     price: e.price,
//     description: e.description,
//     image: e.image,
//     category: e.category,
//   }));
//   return allProductsMap;
// };

const dbData = async () => {
  try {
    const dbData = await Product.findAll({
      include: {
        model: Order,
        attributes: ['quantity'],
        through: {
          attributes: [],
        },
      },
    });
    return dbData;
  } catch {
    return 'No created product founded';
  }
};

const todaInfo = async () => {
  const allInfo = dbData()
  return allInfo;
};

const dbDataUser = async () => {
  try {
    const dbDataUser = await UserInfo.findAll({
      include: {
        model: user,
        attributes: ['level'],
        through: {
          attributes: [],
        },
      },
    });
    return dbDataUser;
  } catch {
    return 'No created user founded';
  }
};

const infoUser = async () => {
  const aInfo = await allUsers();
  const dbInfo = await dbDataUser();
  const allInfo = aInfo.concat(dbInfo);
  return allInfo;
};

const allUsers = async () => {
  const users = await axios.get('https://fakestoreapi.com/users');
  const usersMap = await users.data.map((e) => ({
    id: e.id,
    username: e.username,
    email: e.email,
    password: e.password,
  }));
  return usersMap;
};

module.exports = {
  allUsers,
  dbData,
  todaInfo,
  dbDataUser,
  infoUser,
};
