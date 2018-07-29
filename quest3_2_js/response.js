function createButtonRemove(userID) {
    var buttCell = document.createElement('td');
    var butt = document.createElement('button');
    butt.innerHTML = 'Remove' + '<span style="margin-left:2px"></span>'
    butt.onclick = function () {
        removeUser(userID);
    }
    butt.classList.add('deleteButt');
    buttCell.appendChild(butt);
    return buttCell;
}

function createButtonEdit(userID, name, sur, nick, gend, img) {
    var buttCell = document.createElement('td');
    var butt = document.createElement('button');
    butt.innerHTML = 'Edit' + '<span style="margin-left:2px" class="icon ion-backspace"></span>'
    butt.onclick = function () {
        showEditArea(userID, name, sur, nick, gend, img);
    }
    butt.classList.add('editButt');
    buttCell.appendChild(butt);
    return buttCell;
}

function createImage(imgLink) {
    var imgCell = document.createElement('td');
    var img = document.createElement('img');
    img.src = imgLink;
    img.style.width = '100px';
    imgCell.appendChild(img);
    return imgCell;
}

async function getUser() {
    try {

        const response = await axios.get('https://sb-pong-web-quest.herokuapp.com/users/');
        console.log(response);
        if (response.data.status == 1) {
            var allUsers = response.data.data;

            var tab = document.getElementById("table-body");
            for (var i = 0; i < allUsers.length; i++) {
                var user = allUsers[i];
                var cols = [user.id, user.name, user.surname, user.nickname, user.gender];
                var row = document.createElement('tr');
                for (var j = 0; j < cols.length; j++) {
                    var cell = document.createElement('td');
                    var cellText = document.createTextNode(cols[j]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                row.appendChild(createImage(user.image));
                row.appendChild(createButtonEdit(user.id, user.name, user.surname, user.nickname, user.gender, user.image));
                row.appendChild(createButtonRemove(user.id));

                tab.appendChild(row);
            }
            document.getElementById("loading").style.display = "none";
            
        } else {
            document.write("request is error");
        }

    } catch (error) {
        console.error(error);
    }
}


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
        if (response.data.status == 1) {
            document.getElementById("result").style.display = "inline-flex";
            document.getElementById("load1").style.display = "none";
            document.getElementById("result").innerHTML = "Complete";
            document.getElementById("result").style.color = "green";
        } else {
            document.getElementById("result").style.display = "inline-flex";
            document.getElementById("load1").style.display = "none";
            var errMsg = response.data.error;
            document.getElementById("result").innerHTML = errMsg;
            document.getElementById("result").style.color = "red";
        }
    })
        .catch(function (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "Error!";
    });
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
        if (response.data.status == 1) {
            document.getElementById("load1").style.display = "none";
            document.getElementById("result").innerHTML = "Complete";
            document.getElementById("result").style.color = "green";
            location.reload();
        } else {
            document.getElementById("load1").style.display = "none";
            var errMsg = response.data.error;
            document.getElementById("result").innerHTML = errMsg;
            document.getElementById("result").style.color = "red";
        }
    })
        .catch(function (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "Error!";
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

function openAddPage() {
    var win = window.open("adduser.html", '_blank');
    win.focus();
}

function showEditArea(userID, name, sur, nick, gend, img) {
    var x = document.getElementById("editArea");
    x.style.display = "block";
    document.getElementById("userID").innerHTML = userID;
    document.getElementById("name").value = name;
    document.getElementById("surname").value = sur;
    document.getElementById("nickname").value = nick;
    document.getElementById("gender").value = gend;
    document.getElementById("imageLink").value = img;
    x.scrollIntoView();
}
