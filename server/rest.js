const {
  playlists: Playlist,
  songs: Song,
  likeds: Liked,
  recentlyplayeds: RecentlyPlayed,
} = require("./models");

module.exports = (app, models) => {
  // Get users playlist by userId
  app.get("/rest/playlists/user/:id", async (req, res) => {
    try {
      const playlists = await Playlist.findAll({
        where: { UserId: req.params.id },
        include: [{ model: Song }],
      });
      res.json(playlists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      res.status(500).json({ error: "Failed to fetch playlists" });
    }
  });

  // update playlist
  app.put("/rest/playlists/:id/:songid", async (req, res) => {
    try {
      const playlist = await Playlist.findByPk(req.params.id);
      const song = await Song.findByPk(req.params.songid);

      if (!playlist || !song) {
        return res.status(404).json({ error: "Playlist or song not found" });
      }

      await playlist.addSong(song);
      const updatedPlaylist = await Playlist.findByPk(req.params.id, {
        include: [{ model: Song }],
      });

      res.json(updatedPlaylist);
    } catch (error) {
      console.error("Error updating playlist:", error);
      res.status(500).json({ error: "Failed to update playlist" });
    }
  });

  //Create recentlyPlayed
  app.post("/rest/recentlyplayeds", async (req, res) => {
    try {
      const recentlyPlayed = await RecentlyPlayed.create(req.body);
      res.json(recentlyPlayed);
    } catch (error) {
      console.error("Error creating recently played:", error);
      res.status(500).json({ error: "Failed to create recently played" });
    }
  });

  //update recentlyPlayed
  app.put("/rest/recentlyplayeds/user/:id", async (req, res) => {
    try {
      const recentlyPlayed = await RecentlyPlayed.findOne({
        where: { UserId: req.params.id },
        include: [{ model: Song }],
      });

      if (!recentlyPlayed) {
        return res.status(404).json({ error: "Recently played not found" });
      }

      const song = await Song.findByPk(req.body.songList[0]);
      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }

      const songs = await recentlyPlayed.getSongs();
      if (songs.length > 0 && songs[0].id === song.id) {
        return res.json({ message: "This song has been added just now" });
      }

      await recentlyPlayed.addSong(song);
      const updatedRecentlyPlayed = await RecentlyPlayed.findOne({
        where: { UserId: req.params.id },
        include: [{ model: Song }],
      });

      res.json(updatedRecentlyPlayed);
    } catch (error) {
      console.error("Error updating recently played:", error);
      res.status(500).json({ error: "Failed to update recently played" });
    }
  });

  //Get recentlyPlayed by userId
  app.get("/rest/recentlyplayeds/user/:id", async (req, res) => {
    try {
      const recentlyPlayed = await RecentlyPlayed.findOne({
        where: { UserId: req.params.id },
        include: [{ model: Song }],
      });
      res.json(recentlyPlayed);
    } catch (error) {
      console.error("Error fetching recently played:", error);
      res.status(500).json({ error: "Failed to fetch recently played" });
    }
  });

  // Get users likeds by userId
  app.get("/rest/likeds/user/:id", async (req, res) => {
    try {
      const liked = await Liked.findOne({
        where: { UserId: req.params.id },
        include: [{ model: Song }],
      });
      res.json(liked);
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      res.status(500).json({ error: "Failed to fetch liked songs" });
    }
  });

  //Add a new song to liked
  app.put("/rest/likeds/user/:id", async (req, res) => {
    try {
      const liked = await Liked.findOne({
        where: { UserId: req.params.id },
      });

      if (!liked) {
        return res.status(404).json({ error: "Liked list not found" });
      }

      const song = await Song.findByPk(req.body.songId);
      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }

      await liked.addSong(song);
      const updatedLiked = await Liked.findOne({
        where: { UserId: req.params.id },
        include: [{ model: Song }],
      });

      res.json(updatedLiked);
    } catch (error) {
      console.error("Error updating liked songs:", error);
      res.status(500).json({ error: "Failed to update liked songs" });
    }
  });

  // Add a new playlist
  app.post("/rest/playlists", async (req, res) => {
    try {
      const playlist = await Playlist.create(req.body);
      res.json(playlist);
    } catch (error) {
      console.error("Error creating playlist:", error);
      res.status(500).json({ error: "Failed to create playlist" });
    }
  });

  // Add a new liked
  app.post("/rest/likeds", async (req, res) => {
    try {
      const liked = await Liked.create(req.body);
      res.json(liked);
    } catch (error) {
      console.error("Error creating liked:", error);
      res.status(500).json({ error: "Failed to create liked" });
    }
  });

  // Add a new song
  app.post("/rest/songs", async (req, res) => {
    try {
      const song = await Song.create(req.body);
      res.json(song);
    } catch (error) {
      console.error("Error creating song:", error);
      res.status(500).json({ error: "Failed to create song" });
    }
  });

  // get songs
  app.get("/rest/songs", async (req, res) => {
    try {
      const songs = await Song.findAll();
      res.json(songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      res.status(500).json({ error: "Failed to fetch songs" });
    }
  });

  // get playlists
  app.get("/rest/playlists", async (req, res) => {
    try {
      const playlists = await Playlist.findAll({
        include: [{ model: Song }],
      });
      res.json(playlists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      res.status(500).json({ error: "Failed to fetch playlists" });
    }
  });

  // Delete playlist
  app.delete("/rest/playlists/:id", async (req, res) => {
    try {
      const result = await Playlist.destroy({
        where: { id: req.params.id },
      });
      res.json({ success: result === 1 });
    } catch (error) {
      console.error("Error deleting playlist:", error);
      res.status(500).json({ error: "Failed to delete playlist" });
    }
  });

  // Delete liked
  app.delete("/rest/likeds/:id", async (req, res) => {
    try {
      const result = await Liked.destroy({
        where: { id: req.params.id },
      });
      res.json({ success: result === 1 });
    } catch (error) {
      console.error("Error deleting liked:", error);
      res.status(500).json({ error: "Failed to delete liked" });
    }
  });
};
