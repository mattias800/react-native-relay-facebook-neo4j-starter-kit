import Sequelize from "sequelize";

export const sequelize = new Sequelize('postgres', 'postgres', 'ga', {

    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});
