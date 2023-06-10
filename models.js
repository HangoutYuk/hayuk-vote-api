const DataTypes = require('sequelize')
const sequelize = require('./db')

const poll_list_table = sequelize.define('poll_list_table', {
  poll_id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING(400),
    allowNull: false
  },
  place_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  place_about: {
    type: DataTypes.STRING,
    allowNull: true
  },
  place_category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  place_rating: {
    type: DataTypes.STRING,
    allowNull: false
  },
  place_total_review: {
    type: DataTypes.STRING,
    allowNull: false
  },
  maps_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

const poll_data_table = sequelize.define('poll_data_table', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  polling_person_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  agree: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  polledAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, )

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

// foreign key and one to one relationship
poll_data_table.belongsTo(poll_list_table, {
  foreignKey: 'poll_id',
  targetKey: 'poll_id'
})
//
poll_list_table.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})

module.exports = { poll_list_table, poll_data_table, User }
