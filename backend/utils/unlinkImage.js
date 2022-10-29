const fs  = require('fs');

exports.findAndUnlinkPostImage = (Post) => {
    const filename = Post.imageUrl.split(`upload/post`)[1];
    fs.unlink(`upload/post/${filename}`, (err) => {
        if (err) throw err
    });
}

exports.findAndUnlinkProfilImage = (User) => {
  const filename = User.photo.split(`upload/profile/`)[1];
  if (filename !== "random-user.png"){
    fs.unlink(`upload/profile/${filename}`, (err) => {
        if (err) throw err
    });
  }else{
    return
  }
};