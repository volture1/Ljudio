const mongoose = global.mongoose

//schemas for entities in mongo Atlas
const Playlist = mongoose.model('Playlist',{
    name:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    songList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Song'
    }]
})

const Liked = mongoose.model('Liked',{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    songList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Song'
    }]
})

const Song = mongoose.model('Song',{
    link:{
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String,
        require:true
    },
    artist:{
        type:String,
        require:true
    },
    dateAdded:{
        type:Date,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true   
    },
    onlySound:{
        type:Boolean,
        require:true
    }

})
const User = mongoose.model('User',{
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:String,
    lastName:String,
    birthday:Date,
    gender:String,
    playList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Playlist' 
    }],
    liked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Liked' 
    }]
})

module.exports = {
    users:User,
    likeds:Liked,
    playlists:Playlist,
    songs:Song
}