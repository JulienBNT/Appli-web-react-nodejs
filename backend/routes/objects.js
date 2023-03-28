const express = require('express');
const router = express.Router();
const { objects } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");



router.get("/", async (req, res) => {
    const listOfObjects = await objects.findAll();
    res.json(listOfObjects);
});



router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const object = await objects.findByPk(id);
    res.json(object)
})



router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    await objects.create(post);
    res.json(post);
});



router.delete("/:objectId",  async (req, res) => {
    const objectId = req.params.objectId

    await objects.destroy({
        where: {
            id: objectId,
    }})
})

router.put("/shoppingcart", validateToken, async (req, res) => {
    const { stockUpdate, id } = req.body;
    await objects.update({ stock: newStock }, { where: { id: id } });
    res.json(newStock);
})


router.put("/objectname", validateToken, async (req, res) => {
    const { newObjectname, id } = req.body;
    await objects.update({ objectname: newObjectname }, { where: { id: id } });
});

router.put("/description", validateToken, async (req, res) => {
    const { newDescription, id } = req.body;
    await objects.update({ description: newDescription }, { where: { id: id } });
});

router.put("/stock", validateToken, async (req, res) => {
    const { newStock, id } = req.body;
    await objects.update({ stock: newStock }, { where: { id: id } });
});


// on fait une requête post dans la post route, on récupère les données du post du body qui est envoyé dans la requête
// on appelle la fonction sequelize pour créer, ce qui insère dans notre table appellée objects qui existe dans notre MySQL qui existe
// on retourne une réponse qui la même donnée qu'on a envoyé de ce fait on a confirmation qu'on a envoyé la bonne donnée
module.exports = router;