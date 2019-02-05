module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function (models) {

        User.hasMany(models.List, {
            foreignKey: {
                allowNull: true
            }
        });

    };

    // User.associate = function (models) {

        
    // };

    return User;
}