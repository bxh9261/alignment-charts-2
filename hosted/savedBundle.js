"use strict";

var ChartList = function ChartList(props) {
  if (props.charts.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "chartList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "noCharts"
      }, "None yet"))
    );
  }

  var chartNodes = props.charts.map(function (chart) {
    return (/*#__PURE__*/React.createElement("div", {
        "class": "chart-content"
      }, /*#__PURE__*/React.createElement("canvas", {
        width: "690",
        height: "640"
      }, "Your browser doesn't support canvas, so an image can not be created."), /*#__PURE__*/React.createElement("div", {
        id: "modalButtons"
      }, /*#__PURE__*/React.createElement("a", {
        href: "#",
        id: "download",
        download: "alignment-charts.png"
      }, "Download Image")))
    );
  });
  drawChart(props.charts);
  return (/*#__PURE__*/React.createElement("div", {
      className: "canvasArea"
    }, chartNodes)
  );
}; //Do I need to credit myself? This is from https://people.rit.edu/bxh9261/330/exercises/hello-canvas.html


var drawChart = function drawChart(charts) {
  var canvas = document.querySelector("canvas"); // B - the ctx variable points at a “2D drawing context” 

  var ctx = canvas.getContext("2d"); // C - all fill operations are now in yellow 

  ctx.fillStyle = "white"; // D - fill a rectangle with the current fill color 

  ctx.fillRect(0, 0, 690, 640);
  ctx.save(); // horizontal alignment 

  ctx.textAlign = "center"; // vertical alignment 

  ctx.textBaseline = "middle"; // E - set the current font 

  ctx.font = "bold 20pt Gloria Hallelujah"; // F - change the current fill color 

  ctx.fillStyle = "#000000"; // G - draw and fill text using current fill color 

  ctx.fillText("Lawful", 200, 85);
  ctx.fillText("Neutral", 370, 85);
  ctx.fillText("Chaotic", 540, 85);
  ctx.fillText("Good", 75, 185);
  ctx.fillText("Neutral", 75, 185 + 170);
  ctx.fillText("Evil", 75, 185 + 340);
  ctx.font = "bold 10pt Arial";
  ctx.fillText("Created with alignment-charts.herokuapp.com", 520, 630);
  ctx.restore();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath(); //horizontal lines

  for (var i = 100; i <= 640; i += 170) {
    ctx.moveTo(150, i);
    ctx.lineTo(660, i);
  } //vertical lines


  for (var _i = 150; _i <= 690; _i += 170) {
    ctx.moveTo(_i, 100);
    ctx.lineTo(_i, 610);
  }

  ctx.closePath();
  ctx.stroke();

  for (var _i2 = 0; _i2 < 9; _i2 += 1) {
    //https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
    if (charts[0].imageLinks[_i2] !== '') {
      var base_image = new Image();
      base_image.src = charts[0].imageLinks[_i2].src;
      base_image.width = "130";
      base_image.height = "130";
      var scale = Math.min(150 / base_image.width, 150 / base_image.height);
      ctx.drawImage(base_image, 155 + 170 * (_i2 % 3), 105 + 170 * Math.floor(_i2 / 3), base_image.width * scale, base_image.height * scale);
    }
  }
};

var loadChartsFromServer = function loadChartsFromServer() {
  sendAjax('GET', '/getCharts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ChartList, {
      charts: data.charts
    }), document.querySelector("#savedCharts"));
  });
};

var setup = function setup() {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChartList, {
    charts: []
  }), document.querySelector("#savedCharts"));
  loadChartsFromServer();
};

$(document).ready(function () {
  setup();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
