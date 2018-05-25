var cloudinary = require('cloudinary');



exports.uploadimage= function (picture_path, callback) {

    picture_path =  __dirname + "/public"+picture_path;
    cloudinary.v2.uploader.upload(picture_path, {use_filename:true},function (error,result) {
            console.log(result.url);

            if(error){console.log(error)};
            callback(result.url);
        });
};
