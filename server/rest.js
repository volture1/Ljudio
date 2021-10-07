const {playlist,songs,liked} = require("./models")

module.exports = (app,models) => {

 // Get users playlist by userId
  app.get('/rest/playlists/user/:id', async (req, res) => {
    let model = models['playlists']
    console.log(req.params.id);
    let docs = await model.find({ userId: req.params.id }).populate(['userId']).exec()
    res.json(docs)
  })

  // update playlist
  app.put('/rest/playlists/:id', async (req, res) => {
    let model = models['playlists'];
    let docs = await model.findById(req.params.id);

    for(let song of req.body.songList) {
      if(docs.songList.includes(song)) {
        res.json('Playlist already contains song');
        return;
      } else {
        console.log(song);
        docs.songList.push(song);
      }
    }

    await docs.save();
    res.json(docs);
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

  // get songs
  app.get('/rest/songs', async (req, res) => {
    let model = await models['songs'];
    let data = await model.find();
    res.json(data);
  })

  // get playlists
  app.get('/rest/playlists', async (req, res) => {
    let model = await models['playlists'];
    let data = await model.find();
    res.json(data);
  })


  // Delete playlist 
  app.delete('/rest/playlists/:id', async (req, res) => {
    let playListId = req.params.id
    let playList = await models['playlists'].deleteOne({ _id: playListId })
    res.json(playList)
  })

  // Delete liked
  app.delete('/rest/likeds/:id', async (req, res) => {
    let likedId = req.params.id
    let liked = await models['likeds'].remove({ _id: likedId })
    res.json(liked)
  })

}