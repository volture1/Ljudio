const {playlist,songs,liked} = require("./models")

module.exports = (app,models) => {

 // Get users playlist by userId
  app.get('/rest/playlists/user/:id', async (req, res) => {
    let model = models['playlists']
    let docs = await model.find({ userId: req.params.id }).populate(['userId']).exec()
    res.json(docs)
  })

  // Get users likeds by userId
  app.get('/rest/likeds/user/:id', async (req, res) => {
    let model = models['likeds']
    let docs = await model.find({ userId: req.params.id }).populate(['userId']).exec()
    res.json(docs)
  })

  // Add a new playlist
  app.post('/rest/playlists', async (req, res) => {
    let model = models['playlists']
    let doc = req.body
    let docs = await new model(doc)
    await docs.save()
    res.json(docs)
  })

  // Add a new liked
  app.post('/rest/likeds', async (req, res) => {
    let model = models['likeds']
    let doc = req.body
    let docs = await new model(doc)
    await docs.save()
    res.json(docs)
  })

  // Add a new song
  app.post('/rest/songs', async (req, res) => {
    let model = models['songs']
    let doc = req.body
    let docs = await new model(doc)
    await docs.save()
    res.json(docs)
  })

  // Delete playlist 
  app.delete('/rest/playlists/:id', async (req, res) => {
    let houseId = req.params.id
    let house = await models['playlists'].remove({ _id: houseId })
    res.json(house)
  })

  // Delete liked
  app.delete('/rest/likeds/:id', async (req, res) => {
    let bookingId = req.params.id
    let booking = await models['likeds'].remove({ _id: bookingId })
    res.json(booking)
  })

}