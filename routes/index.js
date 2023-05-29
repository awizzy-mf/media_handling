const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const storage = require("../utils/storage");
const media = require('../controllers/media')
const middlewares = require("../utils/middlewares");
const multer = require('multer')()
const qrimage = require('../utils/qrimage');

router.post("/auth/register", user.register);
router.post("/auth/login", user.login);
router.get("/auth/oauth", user.googleOauth2);
router.get("/auth/whoami", middlewares.auth, user.whoami);

router.post("/storage/images", storage.image.single('media'), media.storageSingle)
router.post("/storage/multi/images", storage.image.array('media'), media.storageArray)
router.post("/imagekit/upload", multer.single('media'), media.imagekitUpload)


router.get('/test/qr', async(req, res) =>{
    try{
        const data = await qrimage('DATA')
        return res.status(200).json(data)
    }catch (error){
        throw error
    }
})
module.exports = router;
