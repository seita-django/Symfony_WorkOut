// For test
console.log("Hello This is Graph Chart");

// // function for calculating maximum muscle strength => (I want to have this on maxStrength.js)
function maxStrength(weight, reps) {
    if(reps === 0){
        return 0;
    }
    return (weight * reps) / 40 + weight;
}

/*================================
    data handling for graph chart
=================================*/

// save the length of records
size = array_date.length;

// array for maximum muscle strength
let array_max_bench = [];
let array_max_deadlift = [];
let array_max_squat = [];

/*========= MEMO =================
Ex:  old -> new
when there are only 6 records, then 0,1,2,3,4,5,NULL, NULL...
when there are 12 records, then 2,3,4,5,6,...,11
==================================*/
// get the latest 10 data

// when data is less than 10
if(size <= 10){
    for(let i = 0; i < 10; i++){
        // if there is no data, then assign it as
        if(i >= size){
            // assign each record = 0 (only assign date as NULL in str)
            array_benchPress[i] = 0;
            array_benchPress_rep[i] = 0;
            array_deadlift[i] = 0;
            array_deadlift_rep[i] = 0;
            array_squat[i] = 0;
            array_squat_rep[i] = 0;
            array_date[i] = 'NULL';
            array_weight[i] = 0;

            // assign max = 0 for now
            array_max_bench[i] = 0;
            array_max_deadlift[i] = 0;
            array_max_squat[i] = 0;
        }
        // calculate max
        array_max_bench[i] = maxStrength(Number(array_benchPress[i]), Number(array_benchPress_rep[i]));
        array_max_deadlift[i] = maxStrength(Number(array_deadlift[i]), Number(array_deadlift_rep[i]));
        array_max_squat[i] = maxStrength(Number(array_squat[i]), Number(array_squat_rep[i]));
    }
}
// when data is more than 10
else if(size > 10){
    // Ex: when size=12, 2,3,4,5,...11
    let k = 0; // to fix
    for(let i = size-10; i < size; i++){

        // update each record
        array_benchPress[k] = array_benchPress[i];
        array_benchPress_rep[k] = array_benchPress_rep[i];
        array_deadlift[k] = array_deadlift[i];
        array_deadlift_rep[k] = array_deadlift[i];
        array_squat[k] = array_squat[i];
        array_squat_rep[k] = array_squat_rep[i];
        array_date[k] = array_date[i];
        // array_weight[k] = array_weight[i];

        // update max array
        array_max_bench[k] = maxStrength(Number(array_benchPress[k]), Number(array_benchPress_rep[k]));
        array_max_deadlift[k] = maxStrength(Number(array_deadlift[k]), Number(array_deadlift_rep[k]));
        array_max_squat[k] = maxStrength(Number(array_squat[k]), Number(array_squat_rep[k]));

        // update k
        k++;
    }
}

// Console Test
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
          graph chart
=================================*/

var ctx = document.getElementById('myChart2');
var myGraphChart = new Chart(ctx, {
    // type: 'line',
    data: {
        labels: [
            array_date[0],  // oldest date
            array_date[1],
            array_date[2],
            array_date[3],
            array_date[4],
            array_date[5],
            array_date[6],
            array_date[7],
            array_date[8],
            array_date[9], // newest date
        ],
        datasets: [
            {
                type: 'line',
                label: 'bench press',
                data: [
                    array_max_bench[0], // oldest record of bench press
                    array_max_bench[1],
                    array_max_bench[2],
                    array_max_bench[3],
                    array_max_bench[4],
                    array_max_bench[5],
                    array_max_bench[6],
                    array_max_bench[7],
                    array_max_bench[8],
                    array_max_bench[9], // newest record of bench press
                ],
                borderColor: '#f88',
                yAxisID: "y-axis-1",
            },
            {
                type: 'line',
                label: 'dead lift',
                data: [
                    array_max_deadlift[0], // oldest record of dead lift
                    array_max_deadlift[1],
                    array_max_deadlift[2],
                    array_max_deadlift[3],
                    array_max_deadlift[4],
                    array_max_deadlift[5],
                    array_max_deadlift[6],
                    array_max_deadlift[7],
                    array_max_deadlift[8],
                    array_max_deadlift[9], // newest record of dead lift
                ],
                borderColor: '#484',
                yAxisID: "y-axis-1", // add
            },
            {
                type: 'line',
                label: 'squat',
                data: [
                    array_max_squat[0],  // oldest record of squat
                    array_max_squat[1],
                    array_max_squat[2],
                    array_max_squat[3],
                    array_max_squat[4],
                    array_max_squat[5],
                    array_max_squat[6],
                    array_max_squat[7],
                    array_max_squat[8],
                    array_max_squat[9], // newest record of squat
                ],
                borderColor: '#48f',
                yAxisID: "y-axis-1", // add
            },
        ],
    },
});