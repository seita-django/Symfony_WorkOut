// テスト用
console.log("Hello This is Graph Chart");

// 最大筋力を求める関数 => (maxStrength.jsで管理したい)
function maxStrength(weight, reps) {
    if(reps === 0){
        return 0;
    }
    return (weight * reps) / 40 + weight;
}

/*================================
   グラフチャート用のデータの前処理
=================================*/

// データの長さを保存
size = array_date.length;

// 最大筋力を保存するためのarray用意
let array_max_bench = [];
let array_max_deadlift = [];
let array_max_squat = [];

/*========= MEMO =================
例:  古 -> 新
データが6個の場合、0,1,2,3,4,5,NULL, NULL... と表示したい
データが12個の場合、2,3,4,5,6,...,11と表示したい
==================================*/
// 直近の10個のデータを取り出し

// データが10個以上の時
if(size <= 10){
    for(let i = 0; i < 10; i++){
        // データがないところは0を代入
        if(i >= size){
            // 各要素0 (日付のみstr型でNULL)
            array_benchPress[i] = 0;
            array_benchPress_rep[i] = 0;
            array_deadlift[i] = 0;
            array_deadlift_rep[i] = 0;
            array_squat[i] = 0;
            array_squat_rep[i] = 0;
            array_date[i] = 'NULL';
            array_weight[i] = 0;

            // maxは自動的に0に
            array_max_bench[i] = 0;
            array_max_deadlift[i] = 0;
            array_max_squat[i] = 0;
        }
        // maxの値を計算
        array_max_bench[i] = maxStrength(Number(array_benchPress[i]), Number(array_benchPress_rep[i]));
        array_max_deadlift[i] = maxStrength(Number(array_deadlift[i]), Number(array_deadlift_rep[i]));
        array_max_squat[i] = maxStrength(Number(array_squat[i]), Number(array_squat_rep[i]));
    }
}
// データが10個より大きい時
else if(size > 10){
    // 例: size=12の時, 2,3,4,5,...11
    let k = 0; // ずらし用
    for(let i = size-10; i < size; i++){

        // 各要素を更新
        array_benchPress[k] = array_benchPress[i];
        array_benchPress_rep[k] = array_benchPress_rep[i];
        array_deadlift[k] = array_deadlift[i];
        array_deadlift_rep[k] = array_deadlift[i];
        array_squat[k] = array_squat[i];
        array_squat_rep[k] = array_squat_rep[i];
        array_date[k] = array_date[i];
        // array_weight[k] = array_weight[i];

        // max arrayを更新
        array_max_bench[k] = maxStrength(Number(array_benchPress[k]), Number(array_benchPress_rep[k]));
        array_max_deadlift[k] = maxStrength(Number(array_deadlift[k]), Number(array_deadlift_rep[k]));
        array_max_squat[k] = maxStrength(Number(array_squat[k]), Number(array_squat_rep[k]));

        // kの更新
        k++;
    }
}

// コンソールテスト
/*
for(let i = 0; i<10; i++){
    console.log("Check weight array index: %d - " + array_weight[i], i);
}
for(let i = 0; i<10; i++){
    console.log("Check bench press array index: %d - " + array_benchPress[i], i);
}
for(let i = 0; i<10; i++){
    console.log("Check bench press rep array index: %d - " + array_benchPress_rep[i], i);
}
for(let i = 0; i<10; i++){
    console.log("Check max bench press index: %d - " + array_max_bench[i], i);
}
*/

/*================================
          グラフチャート
=================================*/

var ctx = document.getElementById('myChart2');
var myGraphChart = new Chart(ctx, {
    // type: 'line',
    data: {
        labels: [
            array_date[0], // 一番古い(データ10個前の)日付
            array_date[1],
            array_date[2],
            array_date[3],
            array_date[4],
            array_date[5],
            array_date[6],
            array_date[7],
            array_date[8],
            array_date[9], // 最新の日付
        ],
        datasets: [
            {
                type: 'line',
                label: 'ベンチプレス',
                data: [
                    array_max_bench[0], // 一番古い(データ10個前)ベンチプレスの記録
                    array_max_bench[1],
                    array_max_bench[2],
                    array_max_bench[3],
                    array_max_bench[4],
                    array_max_bench[5],
                    array_max_bench[6],
                    array_max_bench[7],
                    array_max_bench[8],
                    array_max_bench[9], // 最新のベンチプレスの記録
                ],
                borderColor: '#f88',
                yAxisID: "y-axis-1",
            },
            {
                type: 'line',
                label: 'デッドリフト',
                data: [
                    array_max_deadlift[0], // 一番古い(データ10個前)デッドリフトの記録
                    array_max_deadlift[1],
                    array_max_deadlift[2],
                    array_max_deadlift[3],
                    array_max_deadlift[4],
                    array_max_deadlift[5],
                    array_max_deadlift[6],
                    array_max_deadlift[7],
                    array_max_deadlift[8],
                    array_max_deadlift[9], // 最新のデッドリフトの記録
                ],
                borderColor: '#484',
                yAxisID: "y-axis-1", // 追加
            },
            {
                type: 'line',
                label: 'スクワット',
                data: [
                    array_max_squat[0], // 一番古い(データ10個前)スクワットの記録
                    array_max_squat[1],
                    array_max_squat[2],
                    array_max_squat[3],
                    array_max_squat[4],
                    array_max_squat[5],
                    array_max_squat[6],
                    array_max_squat[7],
                    array_max_squat[8],
                    array_max_squat[9], // 最新のスクワットの記録
                ],
                borderColor: '#48f',
                yAxisID: "y-axis-1", // 追加
            },
            ],
        },
});