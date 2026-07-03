const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const  Usuario = sequelize.define('Usuario', {
    username: { type: DataTypes.STRING, allowNull: false },
    
    password: { type: DataTypes.STRING, allowNull: false },

    nombres: { type: DataTypes.STRING, allowNull: false },

    apellido: { type: DataTypes.STRING, allowNull: false },

    perfil: { type: DataTypes.STRING, allowNull: false } //administrador-gestor-invitado-etc

}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = Usuario;