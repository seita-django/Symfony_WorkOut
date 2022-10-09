// for test
console.log("Hello This is Radar Chart");

/*================================
   data handling for radar chart
=================================*/
// 1RM = weight × times ÷ ４０ ＋ weight
function maxStrength(weight, reps) {
    if(reps === 0){
        return 0;
    }
    return (weight * reps) / 40 + weight;
}

// calculating maximum muscle strength for each
maxBenchPress = Number(maxStrength(Number(benchPress), Number(benchPressRep)));
maxDeadlift = Number(maxStrength((Number(deadlift)), Number(deadliftRep)));
maxSquat = Number(maxStrength((Number(squat)), Number(squatRep)));

// test
console.log("Max bench press is " + maxBenchPress);
console.log("The type pf max bench press is " + typeof(maxBenchPress));

/*=====================================
  variables for using them in index.html.twig
======================================*/
document.getElementById('html_benchPress').innerHTML = maxBenchPress.toString();
document.getElementById('html_deadlift').innerHTML = maxDeadlift.toString();
document.getElementById('html_squat').innerHTML = maxBenchPress.toString();

/*=====================================
            radar chart
======================================*/
/* refference: https://b-risk.jp/blog/2021/09/radarchart/ */

var ctx = document.getElementById("myChart1");
var myRadarChart = new Chart(ctx, {
    // type of graph
    type: 'radar',
    // setting data
    data: {
        labels: ['chest', 'legs', 'back'],
        datasets: [{
            label: 'muscle strength',
            // data graph
            data: [maxBenchPress, maxDeadlift, maxSquat], // maximum muscle strength for each
            // data line
            borderColor: 'red',
        }],
    },
    // setting option
    options: {
        scales: {
            r: {
                // minimum and maximum value of graph
                min: 0,
                max: 200,
                // background colour
                backgroundColor: 'snow',
                // grid line
                grid: {
                    color: 'pink',
                },
                // angle line
                angleLines: {
                    color: 'green',
                },
                // label for each
                pointLabels: {
                    color: 'black',

                    // refference: https://stackoverflow.com/questions/67643949/chartjs-v3-radar-chart-label-font-size
                    font: {
                        size: 25,
                    }
                },
            },
        },
    },
});

