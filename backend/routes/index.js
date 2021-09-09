const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello from the test route!');
})

module.exports = router;