var TimeValue = [];
var time = new Date();

function DeletelToken() {
    TimeValue.push(time.getHours());
    var number =  time.getHours() - TimeValue[0];
    if(number < 0){
        number = number * -1;
    };
    if(number > 2){
        TimeValue.length=0;
        localStorage.removeItem("MusicToken");
    }
}

export{
    DeletelToken
}