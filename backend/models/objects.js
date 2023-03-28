module.exports = (sequelize, DataTypes) => {
    const objects = sequelize.define("objects", {
        
        objectname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        stock: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    });
    return objects;
};

// fonction qui exporte tout type de variable d'un fichier à node.js pour y avoir accès dans d'autres fichiers
// ici pour avoir accès aux types et à sequelize
// pour créer une table dans une base de données