//カテゴリのvalueと日本語のマッピング
const categoryMap = {
    "none": "【カテゴリ】",
    "food1": "食費(家庭)",
    "food2": "食費(外食)",
    "grocery": "日用品",
    "apperel": "被服費",
    "beauty": "美容費",
    "relation": "交際費",
    "education": "教育費",
    "medical": "医療費",
    "elecwater": "光熱水道費",
    "mobile": "通信費",
    "traffic": "交通費",
    "others": "雑費"
  };

// Saveボタンを押して入力値をローカルストレージに保存
$("#save").on("click", function() {
    const date = $("#date").val();
    const categoryValue = $("#category").val();
    const categoryLabel = categoryMap[categoryValue];
    const details = $("#details").val();
    let money = $("#money").val().replace(/,/g, '');
    money = parseInt(money);

    if (!date || !categoryValue || !details || money === '') {
        alert("全てのフィールドを埋めてください");
        return;
    }

    if (isNaN(money)) {
        alert("金額フィールドには数値を入力してください");
        return;
    }

    money = money.toLocaleString();

    const entry = {
        date: date,
        category: categoryLabel,
        details: details,
        money: money,
    };

    let dateTimeKey = date + "-" + new Date().getTime();
    localStorage.setItem(dateTimeKey, JSON.stringify(entry));

    const html = `
        <tr>
            <th>${date}</th>
            <td>${categoryLabel}</td>
            <td>${details}</td>
            <td>${money}</td>
        </tr>
    `;
    $("#list").append(html);

    // フォームをクリアする
    $("#date").val("");
    $("#category").val("");
    $("#details").val("");
    $("#money").val("");

    // 現在の合計行を削除
    $("tr:contains('合計')").remove();
    // 新しい合計を計算して追加
    calculateTotal();
    // 新しいコメントを表示
    displayComment();
});



// ローカルストレージに保存されたデータの表示
$(document).ready(function() {
    // ローカルストレージからデータを取得し、各データをテーブルに追加
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        // 値が正しい形式であることを確認
        if (value && value.date && value.category && value.details && value.money) {
            // データ表示時に3桁区切りのコンマを追加
            const formattedMoney = parseInt(value.money).toLocaleString();

            // HTMLテーブルへのデータの追加
            const html = `
                <tr>
                    <th>${value.date}</th>
                    <td>${value.category}</td>
                    <td>${value.details}</td>
                    <td style="text-align: right;">${formattedMoney}</td>
                </tr>
            `;
            $("#list").append(html);
        }
    }
});


// 金額入力欄がフォーカスを失ったときに発火するイベント
$("#money").on("blur", function() {
    // 入力欄の値を取得し、整数に変換
    let moneyValue = parseInt($(this).val());

    // 値がNaNでないことを確認します（つまり、値が数字であることを確認します）
    if (!isNaN(moneyValue)) {
        // 値を3桁区切りにフォーマットし、入力欄に戻す
        $(this).val(moneyValue.toLocaleString());
    }
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

        // valueがnullやundefined、またはvalue.moneyがundefinedであればスキップ
        if (!value || !value.money) {
            continue;
        }

        const moneyValue = parseInt(value.money.replace(/,/g, ''));

        // moneyValueがNaNでないことを確認します。
        if (isNaN(moneyValue)) {
            console.error(`Invalid number in localStorage: ${key}: `, value);
        } else {
            total += moneyValue;
        }
    }

    // ここでも、合計金額を表示する際にtoLocaleStringメソッドを使用してコンマ区切りを追加します。
    total = total.toLocaleString();

    // 合計金額をテーブルに追加
    const html = `
        <tr>
            <th colspan="3">合計</th>
            <td style="text-align: right;">${total}</td>
        </tr>
    `;
    $("#list").append(html);
}



// 保存ボタンをクリックしたら、合計を再計算し、コメントを表示
$("#save").on("click", function() {
    // 現在の合計行を削除
    $("tr:contains('合計')").remove();
    // 新しい合計を計算して追加
    calculateTotal();
    // 新しいコメントを表示
    displayComment();
});

// ページ読み込み時に初めて合計を計算し、コメントを表示
$(document).ready(function() {
    $("tr:contains('合計')").remove();
    calculateTotal();
    displayComment();
});


// 合計額に基づいたコメントを表示する関数です。
function displayComment() {
    var total = 0;

    // ローカルストレージから家計簿データを取得し、合計金額を計算します。
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        // valueがnullやundefined、またはvalue.moneyがundefinedであればスキップ
        if (!value || !value.money) {
            continue;
        }

        // value.moneyは3桁区切りの文字列なので、先にコンマを削除
        const moneyValue = parseInt(value.money.replace(/,/g, ''));

        // moneyValueがNaNでないことを確認します。
        if (!isNaN(moneyValue)) {
            total += moneyValue;
        }
    }

    // 合計額に基づいてコメントを選択します。
    var comment;
    if (total < 100000) {
        comment = "節約したね";
    } else if (total < 200000) {
        comment = "こんなもんかなー";
    } else if (total < 300000) {
        comment = "ちょっと多いね";
    } else if (total < 400000) {
        comment = "はい、使い過ぎ~、クレカ止めましたー";
    } else if (total < 500000) {
        comment = "どしたん、話聞こか？";
    } else {
        comment = "そして伝説へ・・・";
    }

    // コメントをウェブページに表示します。
    document.getElementById("comment").textContent = comment;
}

