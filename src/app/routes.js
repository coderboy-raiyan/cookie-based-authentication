const router = require('express').Router();
const routes = require('../routes');

router.get('/health', (_req, res) => {
    res.send({ message: 'Working Properly' });
});
router.use(routes);

module.exports = router;
