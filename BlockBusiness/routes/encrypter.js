var crypto = require('crypto');
var salt = "CH|YL|@xyh@qcw";
exports.cryptPwd=function(password) {
    // salt
    var saltPassword = password + '+' + salt;
    console.log('original password：%s', password);
    console.log('password with salt：%s', saltPassword);

    // md5 with salt
    var md5 = crypto.createHash('md5');
    var result = md5.update(saltPassword).digest('hex');
    console.log('md5 after salted：%s', result);
    return result;
}
