const xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct', 'Now','Dec'];  
const yValues = [2000000, 1000000, 10000000, 1000000, 10000000, 10000000,1000000,5000000,100000,0,0,0];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "#000000",
      borderColor: "#E2942E",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:35000000}}],
    }
  }
});