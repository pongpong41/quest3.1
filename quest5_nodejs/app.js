const axios = require("axios");

axios
  .get("https://sb-pong-web-quest.herokuapp.com/users")
  .then(function(response) {
    var allUsers = response.data.data;
    for (var i = 0; i < allUsers.length; i++) {
      console.log(allUsers[i].nickname);
    }
  })
  .catch(function(error) {
    console.log(error);
  });
