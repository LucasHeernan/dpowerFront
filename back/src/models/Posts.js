const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    powersGained: {  //The total amount of Powers obtained in this post
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    multimedia: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })
};