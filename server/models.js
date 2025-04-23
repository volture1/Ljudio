const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  birthday: DataTypes.DATE,
  gender: DataTypes.STRING,
});

const Song = sequelize.define("Song", {
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateAdded: DataTypes.DATE,
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: DataTypes.STRING,
  onlySound: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  thumbnail: DataTypes.STRING,
  ytid: DataTypes.STRING,
});

const Playlist = sequelize.define("Playlist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdDate: DataTypes.DATE,
});

const Liked = sequelize.define("Liked", {});

const RecentlyPlayed = sequelize.define("RecentlyPlayed", {});

// Define relationships
User.hasMany(Playlist);
Playlist.belongsTo(User);

User.hasOne(Liked);
Liked.belongsTo(User);

User.hasOne(RecentlyPlayed);
RecentlyPlayed.belongsTo(User);

Playlist.belongsToMany(Song, { through: "PlaylistSongs" });
Song.belongsToMany(Playlist, { through: "PlaylistSongs" });

Liked.belongsToMany(Song, { through: "LikedSongs" });
Song.belongsToMany(Liked, { through: "LikedSongs" });

RecentlyPlayed.belongsToMany(Song, { through: "RecentlyPlayedSongs" });
Song.belongsToMany(RecentlyPlayed, { through: "RecentlyPlayedSongs" });

module.exports = {
  sequelize,
  users: User,
  likeds: Liked,
  playlists: Playlist,
  songs: Song,
  recentlyplayeds: RecentlyPlayed,
};
