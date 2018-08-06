$(document).ready(function(){
    getUser();
    $("#edituser").click(function() {
        $("#load1").css("display", "inline-block");
        editUser($("#userID").text(), $("#name").val(), $("#surname").val(), $("#nickname").val(), $("#gender").val(), $("#imageLink").val());
    });
    $("#operPageAdd").click(function() {
        var win = window.open("adduser.html", '_blank');
        win.focus();
    });
});

function createButtonRemove(userID) {
    var buttCell = $("<td></td>").append($("<button></button>").text("Remove").addClass('deleteButt'));
    $(buttCell).click(function(){
        removeUser(userID);
    });
    return buttCell;
}

function createButtonEdit(userID, name, sur, nick, gend, img) {
    var buttCell = $("<td></td>").append($("<button></button>").text("Edit").addClass('editButt'));
    $(buttCell).click(function(){
        showEditArea(userID, name, sur, nick, gend, img);
    });
    return buttCell;
}

function createImage(imgLink) {
    var imgCell = $("<td></td>")
    .append($('<img />').attr({
        'src': imgLink,
        'width': 100
    }));
    return imgCell;
}

async function getUser() {
    try {

        const response = await axios.get('https://sb-pong-web-quest.herokuapp.com/users/');
        console.log(response);
        if (response.data.status == 1) {
            var allUsers = response.data.data;

            for (var i = 0; i < allUsers.length; i++) {
                var user = allUsers[i];
                var cols = [user.id, user.name, user.surname, user.nickname, user.gender];
                var row = $("<tr></tr>");
                for (var j = 0; j < cols.length; j++) {
                    var cell = $("<td></td>").text(cols[j]);
                    row.append(cell);
                }
                row.append(createImage(user.image));
                row.append(createButtonEdit(user.id, user.name, user.surname, user.nickname, user.gender, user.image));
                row.append(createButtonRemove(user.id));

                $("#table-body").append(row);
            }
            $("#loading").css("display", "none");

        } else {
            console.log(response);
        }

    } catch (error) {
        console.error(error);
    }
}

function editUser(userID, name, sur, nick, gend, img) {
    axios.post('https://sb-pong-web-quest.herokuapp.com/users/'+userID,{
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
            location.reload();
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

function removeUser(userID) {
    axios.delete('https://sb-pong-web-quest.herokuapp.com/users/'+userID)
        .then(function (response) {
        console.log(response);
        location.reload();
    })
        .catch(function (error) {
        console.log(error);
    });

}

function showEditArea(userID, name, sur, nick, gend, img) {
    $("#userID").text(userID);
    $("#name").val(name);
    $("#surname").val(sur);
    $("#nickname").val(nick);
    $("#gender").val(gend);
    $("#imageLink").val(img);
    $("#editArea").css("display", "block");
    $("#editArea")[0].scrollIntoView();
}