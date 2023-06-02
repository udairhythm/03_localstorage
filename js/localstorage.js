// ローカルストレージに保存されたデータの表示
$(document).ready(function() {
    // ローカルストレージからデータを取得し、各データをテーブルに追加
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        // HTMLテーブルへのデータの追加
        const html = `
            <tr>
                <th>${value.date}</th>
                <td>${value.category}</td>
                <td>${value.details}</td>
                <td>${value.money}</td>
            </tr>
        `
        $("#list").append(html);
    }
});

// Saveボタンを押して入力値をローカルストレージに保存
$("#save").on("click", function() {
    // 入力された文字を取得
    const date = $("#date").val();
    const category = $("#category").val();
    const details = $("#details").val();
    const money = $("#money").val();

    // 入力が空でないことを確認
    if (!date || !category || !details || !money) {
        alert("全てのフィールドを埋めてください");
        return;
    }

    // 入力がundefinedでないことを確認
    if (!date || !category || !details || !money) {
        alert("全てのフィールドを埋めてください");
        return;
    }

    // 入力が数値であることを確認
    if (isNaN(money)) {
        alert("金額フィールドには数値を入力してください");
        return;
    }


    // if (date === undefined || category === undefined || details === undefined || money === undefined) {
    //     alert("全てのフィールドを埋めてください");
    //     return;
    // }
    

    const entry = {
        date: date,
        category: category,
        details: details,
        money: money,
    };

    // let dateTimeKey = date + "-" + new Date().getTime();
    // localStorage.setItem(dateTimeKey, JSON.stringify(entry));


    // 現在の日時を取得してユニークなキーを生成
    let dateTimeKey = date + "-" + new Date().getTime();
    localStorage.setItem(dateTimeKey, JSON.stringify(entry));

    // const now = new Date();
    // const key = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`;

    // ユニークなキーを使ってエントリを保存
    // localStorage.setItem(key, JSON.stringify(entry));

    // 保存したデータを表示
    const html = `
        <tr>
            <th>${date}</th>
            <td>${category}</td>
            <td>${details}</td>
            <td>${money}</td>
        </tr>
    `
    $("#list").append(html);
    $("#date").val("");
    $("#category").val("");
    $("#details").val("");
    $("#money").val("");
});

// 全削除イベント
$("#clear").on("click", function() {
    localStorage.clear();
    $("#list").empty();
})

// 金額の合計を計算して表示
function calculateTotal() {
    let total = 0;
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        const moneyValue = parseInt(value.money);

        // moneyValueがNaNでないことを確認します。
        if (isNaN(moneyValue)) {
            console.error(`Invalid number in localStorage: ${key}: `, value);
        } else {
            total += moneyValue;
        }
    }

    // 合計金額をテーブルに追加
    const html = `
        <tr>
            <th colspan="3">合計</th>
            <td>${total}</td>
        </tr>
    `;
    $("#list").append(html);
}



// 保存ボタンをクリックしたら、合計を再計算
$("#save").on("click", function() {
    // 現在の合計行を削除
    $("tr:contains('合計')").remove();
    // 新しい合計を計算して追加
    calculateTotal();
});

// ページ読み込み時に初めて合計を計算
$(document).ready(function() {
    $("tr:contains('合計')").remove();
    calculateTotal();
});




//Saveボタンを押して入力値をローカルストレージに保存
// $("#save").on("click", function() {
    //入力された文字を取得したいと思います
    // const date = $("#date").val();
    // const category = $("#category").val();
    // const details = $("#details").val();
    // const money = $("#money").val();

    // console.log(11);

    // const entry = {
    //     date: date,
    //     category: category,
    //     details: details,
    //     money: money,
    // };

    // localStorage.setItem(date, JSON.stringify(entry));

    //保存したデータを表示
//     const html = `
//         <tr>
//             <th>${date}</th>
//             <td>${category}</td>
//             <td>${detail}</td>
//             <td>${money}</td>
//         </tr>
//     `
    
//     $("#list").append(html)
//     $("#date").val("");
//     $("#category").val("");
//     $("#detail").val("");
//     $("#money").val("");

// });



//全削除イベント
// $("#clear").on("click", function() {
//     localStorage.clear();
//     $("#list").empty();
// })


//金額のコンマ
// function kanmaChange(inputAns){
//     console.log(inputAns);
//     let inputAnsValue = inputAns.value;
//     console.log(inputAnsValue);
//     let numberAns = inputAnsValue.replace(/[^0-9]/g, "");
//     kanmaAns = numberAns.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
//     console.log(kanmaAns);
//     if(kanmaAns.match(/[^0-9]/g)){
//      inputAns.value= kanmaAns;
//      return true;
//     }
//    };


//
// $(function(){
    // 表示対象の年月を取得
    // var now_date  = new Date();
    // var now_month = now_date.getFullYear()+ '/' +(now_date.getMonth()+1);
    // $("#target_month").append(now_month);
    // ローカルストレージから表を作成
    // bulidTable();
    // 画面表示時に価格の合計値を計算
    // sum();
    // 挿入した行のボタンイベントをイベントハンドラへ登録する
    // createDeleteEvent(); 