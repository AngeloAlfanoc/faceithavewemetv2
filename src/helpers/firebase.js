import firebase from 'firebase/app'

export function saveUserData(type, uid, timestamp) {
    firebase.database().ref(type + '/' + uid).set({
            uid:uid,
            presence: "online",
            timestamp: timestamp
        }, function(error) {
            if (error) {
              console.log(error)
            } else {
              console.log("saved")
            }
          });
}
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
export function getUserData(a) {
    const usersRef = firebase
        .database()
        .ref(a)
    usersRef.on('value', (snapshot) => {
        // DboUserData.clientUserList = snapshot.val();
    });
}