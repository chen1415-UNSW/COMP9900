function loginCheck(){
    if (document.getElementById("form-username").value == "") 
    {
      alert("Please input your username");
      return false;
    } else if (document.getElementById("form-password").value == "") {
      alert("Please input your password");
      return false;
    } else {
      var loginFlag = false;
      var uname = document.getElementById("form-username").value;
      var password = document.getElementById("form-password").value;
      console.log("uname = " + uname + "\n password = " + password);
      // var firebaseLoginFlag = firebaseLoginCheck(uname, password);
      var firebaseLoginFlag = callFire(uname, password);

      alert("firebaseLoginFlag =" + firebaseLoginFlag);

      if (firebaseLoginFlag) {
        loginFlag = firebaseLoginFlag;
      }
      console.log("============== loginFlag ============= " + loginFlag);
      return loginFlag;
    }
   }




function firebaseLoginCheck2(uname, password) {
  return new Promise(function(resolve, reject) {
      var flag = false;
      var ref = firebase.database().ref();
      console.log("======1 uname = " + uname + " password = " + password);


      ref.once('value').then(function(snapshot) {
          function userMatch(uname,password,allUsersArray){
            console.log("=====2 uname = " + uname + " password = " + password);

            // var allUsersArray = snapshot.val().users;
            for (var i = 0; i < allUsersArray.length; i++) {
                if (allUsersArray[i].username == uname && allUsersArray[i].password == password) {
                  console.log("Yes find it");
                  var userObj = new Object();
                  userObj.username = allUsersArray[i].username;
                  userObj.password = allUsersArray[i].password;
                  userObj.email = allUsersArray[i].email;
                  userObj.age = allUsersArray[i].age;

                  console.log(snapshot.val()); //4. promise ==> array
                  flag = true;
                  return resolve();
                }
              } //end of for     
              // return reject();     
          }//end of userMatch
          var allUsersArray = snapshot.val().users;
          userMatch(uname, password,allUsersArray);
          return reject();

      }, function(error) {
        console.log("Error: " + error.code);
        //return false;
      }); // end of ref.on
    });
}


  function callFire(uname, password) {
    return firebaseLoginCheck2(uname, password)
      .then(function() {
        console.log("yesssss");
      })
      .catch(function() {
        console.log("Nooooo");
      });
  }

// ------------------ 上边方法还是一样return了promise--------------
// 
// 
// 
  function firebaseLoginCheck(uname, password) {
    var userRef = firebase.database().ref().child('users');
    console.log("userRef = " + userRef);
    console.log("uname = " + uname + " password = " + password);

    var ref = firebase.database().ref();
    var flag = false;
    var userObj = new Object();


    // var arry = ref.on('value', snapshot => snapshot.val());
    // const promis =
    // console.log(arry);
    function findUserInFirebaseFlag(ref, flag) {

      console.log(ref.once('value')); // promise类型
      // return ref.once('value').then(function(snapshot) {
      return ref.once('value', function(snapshot) {
        console.log("----------------------------");
        console.log("1. snapshot.val()="); //1.
        console.log(snapshot.val()); //2. promise

        var gettype = Object.prototype.toString;
        var allUsersArray = snapshot.val().users;
        console.log(gettype.call(allUsersArray)); // 3. array
        // var findUserInFirebaseFlag = false;

        for (var i = 0; i < allUsersArray.length; i++) {
          console.log(gettype.call(allUsersArray[i]));

          if (allUsersArray[i].username == uname && allUsersArray[i].password == password) {
            console.log("Yes find it");
            userObj.username = allUsersArray[i].username;
            userObj.password = allUsersArray[i].password;
            userObj.email = allUsersArray[i].email;
            userObj.age = allUsersArray[i].age;

            console.log(snapshot.val()); //4. promise ==> array
            flag = true;

            break;
          }
        } //end of for
        return userObj;
      }, function(error) {
        console.log("Error: " + error.code);
        //return false;
      }); // end of ref.on
      // return flag;
    } // end of function

    return findUserInFirebaseFlag(ref, flag = false);
  }
