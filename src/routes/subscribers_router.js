const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribers_models')
const getSub = require('../middlewares/getSub_middleware')

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

router.get('/:id', getSub, (req, res) => {

})

router.post('/', (req, res) => {
    const subscriber = new Subscriber({
        userName: req.body.userName,
        userChannel: req.body.userChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

router.patch('/:id', getSub, (req, res) => {
    try {
        if (!id) {
          return res.status(404).json({
            errors: ['Id not found'],
          });
        }
  
        const subscriber = await Subscriber.findByPk(id);
        if (!subscriber) {
          return res.status(404).json({
            errors: ['Sub not found'],
          });
        }
  
        const subModify = await subscriber.update(req.body);
        return res.json(subModify);
      } catch (e) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
})

router.delete('/:id', getSub, (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: "Subscriber was deleted with success"})
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

module.exports = router