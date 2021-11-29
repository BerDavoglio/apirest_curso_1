const Subscriber = require('../models/subscribers_models')

module.exports = async (req, res, next) => {
    const { subscriber } = req.headers;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            res.status(404).json({ message: "subscriber not found" })
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

    res.subscriber = subscriber
    next()
}