var crypto = require('crypto');

// function getRandomSalt(){
//     return Math.random().toString().slice(2, 5);
// }
var salt = "CH|YL|@xyh@qcw";
exports.cryptPwd=function(password) {
    // 密码“加盐”
    var saltPassword = password + '+' + salt;
    console.log('原始密码：%s', password);
    console.log('加盐后的密码：%s', saltPassword);

    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    var result = md5.update(saltPassword).digest('hex');
    console.log('加盐密码的md5值：%s', result);
    return result;
}
