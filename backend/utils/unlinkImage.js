const fs  = require('fs');

exports.findAndUnlinkPostImage = (Post) => {
    if (Post.imageUrl !== null){
      const filename = Post.imageUrl.split(`upload/post`)[1];
      fs.unlink(`upload/post/${filename}`, (err) => {
          if (err) throw err
      });
    } else{
      return
    }
    
}

exports.findAndUnlinkProfilImage = (User) => {
  const filename = User.photo.split(`upload/profile/`)[1];
  if (filename === undefined){
    return
  }
  if (filename !== "random-user.png"){
    fs.unlink(`upload/profile/${filename}`, (err) => {
        if (err) throw err
    });
  }else{
    return
  }
};