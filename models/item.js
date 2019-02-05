module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        asin: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Item.associate = function (models) {

        Item.belongsTo(models.List, {
            foreignKey: {
                allowNull: true
            }
        });
    };


    return Item;
};
