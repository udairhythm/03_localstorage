
//金額のコンマ
/**
 * フォーマット済みテキストを返す関数
 * @param {string} rawValue 元のテキスト
 * @param {number} fractionDigits 小数点以下固定桁数
 * @return {string} フォーマット済みテキストor空白文字（数値以外の場合）
 */


function get_fotmat_input_digit(rawValue, fractionDigits) {
    if (rawValue === '') {
        //ユーザーが空白にしたなら空白にして終了
        return '';
    }
    //入力値を数値だけ半角変換
    let halfWidthVal = rawValue.replace(/[０-９]/g, function(x) {
        return String.fromCharCode(x.charCodeAt(0) - 0xFEE0);
    });
    //カンマを除去（入力値が数値か否かを確認のため）
    let commaRemovedVal = halfWidthVal.replaceAll(',', '').replaceAll('、', '');
    if (isNaN(commaRemovedVal)) {
        //数値でなければ空白にする
        return '';
    } else {
        //入力値をカンマ入り数字テキストに再変換
        return new Intl.NumberFormat('ja-JP', {maximumFractionDigits: fractionDigits, minimumFractionDigits: fractionDigits}).format(commaRemovedVal);
    }
}


$(function() {
    //フォーカスが外れた時に入力値をフォーマット済み文字列に変換するイベントを定義
    //整数用クラス
    $(document).on('blur', '.sakai-digit-0', function() {
        $(this).val(get_fotmat_input_digit($(this).val(), 0));
    });
});


//フォーカス時にカンマを除去
$(document).on('focus', '.sakai-digit', function() {
    //入力値取得
    let val = $(this).val();
    //カンマ除去
    let comma_removed_val = val.replaceAll(',', '');
    if (isNaN(comma_removed_val) || val.indexOf(',,') != -1) {
        //数値でなければ処理をしない
        return;
    }
    $(this).val(comma_removed_val);
});


//Saveボタン
$("#save").on("click", function() {
    //入力された文字を取得したいと思います
    const key = $("#key").val();
    //コンソール
    console.log(key, 'keyの中身')



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