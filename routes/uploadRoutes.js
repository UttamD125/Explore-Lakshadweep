const express = require('express');
const multer = require('multer');
const path = require('path');
const UserModel = require('../models/userModel');

const router = express.Router(); 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/media/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('profileImage');


router.post('/upload-profile-image', upload, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profileImage = `/media/images/${req.file.filename}`;
        await user.save();

        res.json({
            success: true,
            profileImage: user.profileImage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading profile image' });
    }
});


module.exports = router;
