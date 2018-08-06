$(document).ready(function(){
    $("#adduser").click(function() {
        $("#result").css("display", "none");
        $("#load1").css("display", "inline-block");
        addUser($("#name").val(), $("#surname").val(), $("#nickname").val(), $("#gender").val(), $("#imageLink").val());
    })
});

function addUser(name, sur, nick, gend, img) {
    axios.post('https://sb-pong-web-quest.herokuapp.com/users',{
        "name": name,
        "surname": sur,
        "nickname": nick,
        "gender": gend,
        "image": img
    })
        .then(function (response) {
        console.log(response);
        $("#load1").css("display", "none");
        if (response.data.status == 1) {
            $("#result").css({"display": "inline-flex", "color": "green"});
            $("#result").text("Complete");
        } else {
            $("#result").css({"display": "inline-flex", "color": "red"});
            $("#result").text(response.data.error);

        }
    })
        .catch(function (error) {
        console.log(error);
        $("#result").css({"display": "inline-flex", "color": "red"});
        $("#result").text("Error!");
    });
}