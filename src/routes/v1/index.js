const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');

router.get('/info',(req,res) => {
    return res.json({msg: "ok"});
});

router.use('/user', userRoutes);

module.exports = router;