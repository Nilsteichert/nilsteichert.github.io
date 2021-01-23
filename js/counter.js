var combo = 0;
var rightNotes = 0;
var wrongNotes = 0;

function increaseCombo(){
    combo++;
    div = document.getElementById("combo");
    div.innerHTML = `<br> Combo: ${combo}`
}

function resetCombo(){
    combo=0;
    div = document.getElementById("combo");
    div.innerHTML = `<br> Combo: ${combo}`
}

function increaseRight(){
    rightNotes++;
    div = document.getElementById("counterRight");
    div.innerHTML = `<br> Right: ${rightNotes}`
}

function increaseWrong(){
    wrongNotes++;
    div = document.getElementById("counterWrong");
    div.innerHTML = `<br> Wrong: ${wrongNotes}`
}