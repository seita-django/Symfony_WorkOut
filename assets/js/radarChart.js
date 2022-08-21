// テスト用
console.log("Hello This is Radar Chart");

// MySQL 接続失敗 => ControllerよりDBオブジェクトを返して、htmlからデータを直接取り入れる
/*
var db_host = '127.0.0.1';
var db_user = 'root';
var db_pw = 'root_password';
var db_name = 'WorkOut_DB';
console.log("MySQL Test 1");

var mysql = require('mysql');

var mysql_options = {
    host: db_host,
    user: db_user,
    password: db_pw,
    database: db_name
};

var my_client = mysql.createConnection(mysql_options);
my_client.connect();

var sql = 'select * from user';
*/

/*================================
   レーダーチャート用のデータの前処理
=================================*/
// それぞれの最大筋力を計算する関数
// 1RM = 重量 × 回数 ÷ ４０ ＋ 重量
// 参考:https://e-keisan.com/2020/05/27/%E3%83%99%E3%83%B3%E3%83%81%E3%83%97%E3%83%AC%E3%82%B9%E3%83%9E%E3%83%83%E3%82%AF%E3%82%B9%E3%82%92%E8%A8%88%E7%AE%97%E3%81%97%E3%82%88%E3%81%86%E3%80%82/

function maxStrength(weight, reps) {
    if(reps === 0){
        return 0;
    }
    return (weight * reps) / 40 + weight;
}

// 各部位の最大筋力計算
maxBenchPress = Number(maxStrength(Number(benchPress), Number(benchPressRep)));
maxDeadlift = Number(maxStrength((Number(deadlift)), Number(deadliftRep)));
maxSquat = Number(maxStrength((Number(squat)), Number(squatRep)));

// テスト
console.log("Max bench press is " + maxBenchPress);
console.log("The type pf max bench press is " + typeof(maxBenchPress));

/*=====================================
  index.html.twigで使用する用の変数処理
======================================*/
document.getElementById('html_benchPress').innerHTML = maxBenchPress.toString();
document.getElementById('html_deadlift').innerHTML = maxDeadlift.toString();
document.getElementById('html_squat').innerHTML = maxBenchPress.toString();

/*=====================================
            レーダーチャート
======================================*/
/* レーダチャート 参考: https://b-risk.jp/blog/2021/09/radarchart/ */

var ctx = document.getElementById("myChart1");
var myRadarChart = new Chart(ctx, {
    //グラフの種類
    type: 'radar',
    //データの設定
    data: {
        labels: ['胸', '足', '背中'],
        datasets: [{
            label: '筋力',
            //グラフのデータ
            data: [maxBenchPress, maxDeadlift, maxSquat], // それぞれの最大筋力
            // データライン
            borderColor: 'red',
        }],
    },
    //オプションの設定
    options: {
        scales: {
            r: {
                //グラフの最小値・最大値
                min: 0,
                max: 200,
                //背景色
                backgroundColor: 'snow',
                //グリッドライン
                grid: {
                    color: 'pink',
                },
                //アングルライン
                angleLines: {
                    color: 'green',
                },
                //各項目のラベル
                pointLabels: {
                    color: 'black',

                    // フォントサイズ 参考: https://stackoverflow.com/questions/67643949/chartjs-v3-radar-chart-label-font-size
                    font: {
                        size: 25,
                    }
                },
            },
        },
    },
});

