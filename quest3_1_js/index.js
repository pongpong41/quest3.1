var n = 5;
var x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var isWin = false;

function myFunc(c) {
    light1(c);
    light2(c+1,c);
    light2(c-1,c);
    light1(c+n);
    light1(c-n);
    setLight();
    if(!isWin) {checkWin();}
}

function light1(c) {
    if (0 <= c && c < n*n) {
        x[c] = (x[c] + 1) % 2;
    }
}

function light2(c,rc) {
    if (0 <= c && c < n*n && (Math.floor(rc/n) == Math.floor(c/n)) ) {
        x[c] = (x[c] + 1) % 2;
    }
}

function checkWin() {
    var check = true;
    for (var i=0; i<x.length; i++) {
        if (x[i] == 1) {
            check = false;
            break;
        }
    }
    if (check) {
        window.alert("YOU WIN!!");
        isWin = true;
    }
}

function generate() {
    isWin = false;
    var ans = [];
    for (var i=0; i<x.length; i++) {
        var rand = Math.random();
        if (rand > 0.5) {
            myFunc(i);
            ans.push(i+1);
        }
    }
    document.getElementById("ans").innerHTML= ans;
}

function setLight() {
    for (var i=0; i<x.length; i++) {
        if (x[i] == 1) {
            document.getElementById("id"+(i+1)).style.backgroundColor= "aquamarine";
        } else {
            document.getElementById("id"+(i+1)).style.backgroundColor= "gainsboro";
        }
    }
}