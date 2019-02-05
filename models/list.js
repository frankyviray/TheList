module.exports = function (sequelize, DataTypes) {
    var List = sequelize.define("List", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        }
    });

    List.associate = function (models) {

        List.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    List.associate = function (models) {

        List.hasMany(models.Item, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return List;
};
