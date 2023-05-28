//Saveボタンを押して入力値をローカルストレージに保存
$("#save").on("click", function() {
    //入力された文字を取得したいと思います
    const date = $("#date-input").val();
    const category = $("#category").val();
    const details = $("#details").val();
    const money = $("#money").val();

    const entry = {
        date: date,
        category: category,
        details: details,
        money: money,
    };

    localStorage.setItem(date, JSON.stringify(entry));
});



//日付がデフォルトで今日
var date = new Date();

var yyyy = date.getFullYear();
var mm = ("0"+(date.getMonth()+1)).slice(-2);
var dd = ("0"+date.getDate()).slice(-2);

document.getElementById("date-input").value=yyyy+'-'+mm+'-'+dd;


//金額のコンマ

function kanmaChange(inputAns){
    console.log(inputAns);
    let inputAnsValue = inputAns.value;
    console.log(inputAnsValue);
    let numberAns = inputAnsValue.replace(/[^0-9]/g, "");
    kanmaAns = numberAns.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    console.log(kanmaAns);
    if(kanmaAns.match(/[^0-9]/g)){
     inputAns.value= kanmaAns;
     return true;
    }
   };


// $("#save").on("click", function()) {
//     const key = $("#key").val();
//     localStorage.setItem(key);

//     const html =

// }

// const list1 = ['大吉','中吉','吉', '小吉', '凶'];
// console.log(list1[0]);

// let str = "";

// for(let i=0; i < list1.length; i++) {
//     str += list1[i] + "<br>";
// }

// $("#view").html(str);