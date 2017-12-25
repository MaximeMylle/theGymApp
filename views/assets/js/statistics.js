// doe ajax call naar node -> in node return type json

$(document).ready(function() {
  getdata();
  $("#select-graph").on('change', drawOverview);
  $("#select-category").on('change', showExcercises);
  $("#select-exercise").on('change', progressOverTime);

});



var showExcercises = function() {
  $("#messagediv").empty();
  var canvas = $("#myChart")[0];
  canvas.width = canvas.width;
  var chosenoption = $("#select-category").val();
  if (chosenoption != "none") {
    console.log("chosen category: " + chosenoption);

    var chestexer = ["Barbell incline", "Barbell decline", "Barbell straight", "Dumbbells incline", "Dumbbells decline", "Dumbbells straight"];
    var backexer = ["Barbell Deadlift", "Standing T-Bar Row", "Wide-Grip Pull-Up", "Close-Grip Pull-Down", "Single-Arm Dumbbell Row"];
    var legstexer = ["Barbell Squat", "Leg Press", "Dumbbell Walking Lunge", ">Leg Extensions", "Standing Calf Raises"];
    var armsexer = ["Bicep Barbell Curl", "Bicep Dumbell Curl", "Tricep Pushdown", "Dip Machine"];
    var shouldersexer = ["Dumbell shoulder press", "Upright barbell row", "Front Cable Raise"];
    var chosenarray;

    if (chosenoption == "chest") {
      chosenarray = chestexer;
    }
    if (chosenoption == "back") {
      chosenarray = backexer;
    }
    if (chosenoption == "legs") {
      chosenarray = legstexer;
    }
    if (chosenoption == "shoulders") {
      chosenarray = shouldersexer;
    }
    if (chosenoption == "arms") {
      chosenarray = armsexer;
    }

    chosenarray.forEach(function(exercise) {

      var html = "<option val='" + exercise + "'>" + exercise + "</option>";
      $("#select-exercise").append(html);
    });

    $("#exercise-div").removeClass('hide');
  }

}

var globaldata;

var getdata = function() {

  $.get("/api/getdata", function(data) {
    console.log(data);
    globaldata = data["rows"];
    avgOverall();

    //alert("Load was performed.");
  });
}

var drawOverview = function(data) {
  var canvas = $("#myChart")[0];
  canvas.width = canvas.width;
  //console.log("HELLO");

  $("#categories-div").addClass("hide");
  $("#exercise-div").addClass('hide');

  var selectval = $("#select-graph").val();
  //console.log('select: '+selectval);

  if (selectval == "overall") {
    avgOverall();
  }
  if (selectval == "lastmonth") {
    avgmonth();
  }
  if (selectval == "overtimecategory") {
    $("#categories-div").removeClass("hide");
  }
  // console.log(data);
  // avgOverall(data);


}


var calcavgarray = function(array) {
  if (array.length > 0) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum += array[i]; //don't forget to add the base
    }
    var avg = sum / array.length;
    return avg;
  } else {
    return 0;
  }
}

var avgmonth = function() {
  var data = globaldata;
  var date = new Date();
  var month = date.getMonth();
  var year = date.getYear();

  var avgchest = [];
  var avgback = [];
  var avgarms = [];
  var avglegs = [];
  var avgshoulders = [];

  //get avg of each category
  data.forEach(function(row) {

    if (parseInt(row.doc.month) == month && parseInt(row.doc.year) == year) {

      var subavg = parseInt(row.doc.set1) + parseInt(row.doc.set2) + parseInt(row.doc.set3);
      var subavg = subavg / 3;
      if (row.doc.category == "chest") {
        avgchest.push(subavg);
        //console.log("avg chest array: "+avgchest);
      }
      if (row.doc.category == "back") {
        avgback.push(subavg);
      }
      if (row.doc.category == "arms") {
        avgarms.push(subavg);
      }
      if (row.doc.category == "legs") {
        avglegs.push(subavg);
      }
      if (row.doc.category == "shoulders") {
        avgshoulders.push(subavg);
      }
    }
  });

  var overallavgchest = calcavgarray(avgchest);
  var overallavgback = calcavgarray(avgback);
  var overallavgarms = calcavgarray(avgarms);
  var overallavglegs = calcavgarray(avglegs);
  var overallavgshoulders = calcavgarray(avgshoulders);
  var data = {
    labels: ["Chest", "Back", "Arms", "Legs", "Shoulders"],
    datasets: [{
      label: "Overall Average",
      backgroundColor: "rgba(200,0,0,0.2)",
      data: [overallavgchest, overallavgback, overallavgarms, overallavglegs, overallavgshoulders]
    }]
  };
  var ctx = document.getElementById('myChart').getContext('2d');
  var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: Chart.defaults.radar
  });
}


var avgOverall = function() {
  var data = globaldata;
  var avgchest = [];
  var avgback = [];
  var avgarms = [];
  var avglegs = [];
  var avgshoulders = [];

  //get avg of each category
  data.forEach(function(row) {
    //console.log(row.doc.category);
    var subavg = parseInt(row.doc.set1) + parseInt(row.doc.set2) + parseInt(row.doc.set3);
    //console.log("subavg: "+subavg);
    var subavg = subavg / 3;
    //console.log("subavg2: "+subavg2);
    if (row.doc.category == "chest") {
      avgchest.push(subavg);
      //console.log("avg chest array: "+avgchest);
    }
    if (row.doc.category == "back") {
      avgback.push(subavg);
    }
    if (row.doc.category == "arms") {
      avgarms.push(subavg);
    }
    if (row.doc.category == "legs") {
      avglegs.push(subavg);
    }
    if (row.doc.category == "shoulders") {
      avgshoulders.push(subavg);
    }
  });

  var overallavgchest = calcavgarray(avgchest);
  var overallavgback = calcavgarray(avgback);
  var overallavgarms = calcavgarray(avgarms);
  var overallavglegs = calcavgarray(avglegs);
  var overallavgshoulders = calcavgarray(avgshoulders);

  //console.log("overall averages: "+overallavgchest+"/"+overallavgback+"/"+overallavgarms+"/"+overallavglegs+"/"+overallavgshoulders);


  var data = {
    labels: ["Chest", "Back", "Arms", "Legs", "Shoulders"],
    datasets: [{
      label: "Overall Average",
      backgroundColor: "rgba(200,0,0,0.2)",
      data: [overallavgchest, overallavgback, overallavgarms, overallavglegs, overallavgshoulders]
    }]
  };

  var ctx = document.getElementById('myChart').getContext('2d');
  var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: Chart.defaults.radar
  });

}

var progressOverTime = function() {
  $("#messagediv").empty();
  var canvas = $("#myChart")[0];
  canvas.width = canvas.width;
  var data = globaldata;
  var category = $("#select-category").val();
  var exercise = $("#select-exercise").val();
  console.log("chosen: " + category + " " + exercise);
  var plotdata = [];
  var plotlabels = [];
  var counter = 0;
  if (category != "none") {

    data.forEach(function(row) {


      if (row.doc.category == category && row.doc.exercise == exercise) {
        var subavg = parseInt(row.doc.set1) + parseInt(row.doc.set2) + parseInt(row.doc.set3);
        var subavg = subavg / 3;
        plotdata.push(subavg);
        var sublabel = row.doc.day + "/" + row.doc.month + "/" + row.doc.year;
        plotlabels.push(sublabel);
        counter++;
      }
    });

    if (counter > 0) {

      var config = {
        type: 'line',
        data: {
          labels: plotlabels,
          datasets: [{
            label: exercise,
            data: plotdata,
            fill: false
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                console.log(tooltipItem)
                return tooltipItem.yLabel;
              }
            }
          }
        }
      };
      var ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, config);
    } else {
      $("#messagediv").empty().append("<p>no data</p>");
    }
  }
}
