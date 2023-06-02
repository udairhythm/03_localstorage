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

// ローカルストレージからデータを取得し、各データをテーブルに追加
$(document).ready(function() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // 「household-」で始まるキーだけを処理
        if (!key.startsWith("household-")) {
            continue;
        }
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



// Saveボタンを押して入力値をローカルストレージに保存
$("#save").on("click", function() {
    // 入力された文字を取得
    const date = $("#date").val();
    let category = $("#category").val();
    const details = $("#details").val();
    let money = parseInt($("#money").val().replace(/,/g, '')); // 金額のコンマを削除して数値に変換



    // カテゴリを日本語に変換
    category = categoryMap[category];

    // 金額が数値であることを確認
    if (isNaN(money)) {
        alert("金額フィールドには数値を入力してください");
        return;
    }

    // 入力が空でないことを確認
    if (!date || !category || !details || !money) {
        alert("全てのフィールドを埋めてください");
        return;
    }

    // 入力値が数値であることを確認した後で、再度コンマを追加
    money = money.toLocaleString();

    
    const entry = {
        date: date,
        category: category,
        details: details,
        money: money,
    };


    // 現在の日時を取得してユニークなキーを生成
    let dateTimeKey = date + "-" + new Date().getTime();
    localStorage.setItem(dateTimeKey, JSON.stringify(entry));


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
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        const moneyValue = value && value.money ? parseInt(value.money.replace(/,/g, '')) : 0;

        if (isNaN(moneyValue)) {
            console.error(`Invalid number in localStorage: ${key}: `, value);
            continue; // 不正なデータを無視して次のデータへ
        }

        total += moneyValue;
    }
        

    // 合計金額を表示する際にtoLocaleStringメソッドを使用してコンマ区切りを追加します。
    const formattedTotal = total.toLocaleString();

    // 合計金額をテーブルに追加
    const html = `
        <tr>
            <th colspan="3">合計</th>
            <td style="text-align: right;">${formattedTotal}</td>
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

// 合計額に基づいたコメントを表示する新たな関数です。
function displayComment() {
    var total = 0;

    // ローカルストレージから家計簿データを取得し、合計金額を計算します。
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        const moneyValue = parseInt(value.money);

        // moneyValueがNaNでないことを確認します。
        if (!isNaN(moneyValue)) {
            total += moneyValue;
        }
    }

    // 合計額に基づいてコメントを選択します。
    var comment;
    if (total == 0) {
        comment = "今月も節約がんばろう！";
    } else if (total < 100000) {
        comment = "よく節約したね";
    } else if (total < 200000) {
        comment = "こんなもんかな";
    } else if (total < 300000) {
        comment = "ちょっと多いね";
    } else if (total < 400000) {
        comment = "はい、使い過ぎ~、クレカ止めまーす";
    } else if (total < 500000) {
        comment = "どしたん、話聞こか？";
    } else {
        comment = "そして伝説へ・・・";
    }

    // コメントをウェブページに表示します。
    document.getElementById("comment").textContent = comment;
}

