const express = require('express');
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require('../middlewares/AuthMiddleware');
const {sign} = require('jsonwebtoken');


router.get("/", async (req, res) => {
    const listOfUsers = await users.findAll();
    res.json(listOfUsers);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const user = await users.findByPk(id);
    res.json(user);
  });


router.post("/", async (req, res) => {
    const { firstname, lastname, phone, email, password, role } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            password: hash,
            role: role
        });
        res.json("succès")
    });
});




router.post('/login', async (req, res) => {
    const { firstname, lastname, phone, email, password, role } = req.body;

    const user = await users.findOne({ where: { email: email }});

    if (!user) res.json({ error: "Email n'existe pas" });

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "mauvaise combinaison d'email et de mdp" });
        
        const accessToken = sign(
            {email: user.email, id:user.id }, 
            "importantsecret"
            );

        res.json({
            token: accessToken,
            email: email, 
            id: user.id,
            role: user.role
        });
    });
});




router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
    console.log(res)
})




router.get("/profileinfo/:id", async (req, res) => {
    const id = req.params.id;
    const profileInfo = await users.findByPk(id);
    res.json(profileInfo);
});


// router.put('/changepassword', validateToken, async (req, res) => {
//     const {oldPassword, newPassword} = req.body
//     const user = await users.findOne({ where: { email: req.user.email } });

//     bcrypt.compare(oldPassword, user.password).then((match) => {
//         if (!match) res.json({ error: "votre mot de passe correspond pas avec l'ancien" });
        
//         bcrypt.hash(newPassword, 10).then((hash) => {
//             users.update({password: hash}, {where: { email: req.user.email }})
//             res.json("succès");
//         });
//     });
// })

router.put("/password", validateToken, async (req, res) => {
    const { newPassword, id } = req.body;
    bcrypt.hash(newPassword, 10).then((hash) => {
        users.update({ password: hash }, { where: { id: id } });
        res.json(newPassword);
      });
});


router.put("/firstname", validateToken, async (req, res) => {
    const { newFirstname, id } = req.body;
    await users.update({ firstname: newFirstname }, { where: { id: id } });
});

router.put("/lastname", validateToken, async (req, res) => {
    const { newLastname, id } = req.body;
    await users.update({ lastname: newLastname }, { where: { id: id } });
});

router.put("/phone", validateToken, async (req, res) => {
    const { newPhone, id } = req.body;
    await users.update({ phone: newPhone }, { where: { id: id } });
});

router.put("/email", validateToken, async (req, res) => {
    const { newEmail, id } = req.body;
    await users.update({ email: newEmail }, { where: { id: id } });
});

// les requètes PUT servent à modifier directement dans le base de données un élément choisi en fonction d'un autre

module.exports = router;