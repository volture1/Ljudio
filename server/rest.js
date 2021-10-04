const {playlists,songs,likeds,recentlyplayeds} = require("./models")

module.exports = (app,models) => {

 // Get users playlist by userId
  app.get('/rest/playlists/user/:id', async (req, res) => {
    let model = models['playlists']
    let docs = await model.find({ userId: req.params.id }).populate(['userId','songList']).exec()
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


  //Create recentlyPlayed
  app.post('/rest/recentlyplayeds',async (req,res) => {
    let model = models['recentlyplayeds']
    let doc = req.body
    let docs = await new model(doc)
    await docs.save()
    res.json(docs)
  })

  //update recentlyPlayed
  app.put('/rest/recentlyplayeds/user/:id',async(req,res) =>{
    let model = models['recentlyplayeds'];
    let docs =  await model.find({userId:req.params.id}).populate(['userId','songList']).exec() 
    let firstSong = docs[0].songList[0]._id.toString()
    console.log('firstSong',firstSong)
    for(let song of req.body.songList) {
      console.log('song0',song)  
      if( docs[0].songList.length !=0 && firstSong === song ) {
        res.json('This song has been added just now');
        console.log('This song has been added just now')
        return
      } else {
        docs[0].songList.splice(0,0,song)
        console.log('songlist',docs[0].songList[0])
        await docs[0].save();
        res.json(docs[0]);
        console.log('success save to recentlyPlayed')
      }     
    }
  })

  //Get recentlyPlayed by userId
  app.get('/rest/recentlyplayeds/user/:id',async(req,res) =>{
     console.log('Get recentlyPlayed by userId', req.params.id)
    let model = models['recentlyplayeds']
    let docs = await model.find({userId:req.params.id}).populate(['userId','songList']).exec()
    console.log('Get recentlyPlayed by userId',docs)
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

  // Create a liked
  app.post('/rest/likeds', async (req, res) => {
    let model = models['likeds']
    let doc = req.body
    let docs = await new model(doc)
    await docs.save()
    res.json(docs)
  })

  //Add a new song to liked
  app.put('/rest/likeds/user/:id',async(req,res)=>{
    let model = models['likeds'];
    console.log('model liked',model)
    let docs =  await model.find({userId:req.params.id}).populate(['userId','songList']).exec() 
    console.log('liked docs',docs)
    docs[0].songList.splice(0,0,song)
    await docs[0].save()
    res.json(docs[0])
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
    let playList = await models['playlists'].remove({ _id: playListId })
    res.json(playList)
  })

  // Delete liked
  app.delete('/rest/likeds/:id', async (req, res) => {
    let likedId = req.params.id
    let liked = await models['likeds'].remove({ _id: likedId })
    res.json(liked)
  })

}