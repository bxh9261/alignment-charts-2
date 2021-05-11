"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require('axios');

var alignBoxes;
var charBoxes = [];
var charSelected = -1;
var charObj;
var characterSet; //click and unclick box

var boxReset = function boxReset() {
  for (var _i = 0; _i < charBoxes.length; _i += 1) {
    if (_i === charSelected) {
      charBoxes[_i].style.border = "#E40712 5px solid";
      charBoxes[_i].style.backgroundColor = "#979AA4";
    } else {
      charBoxes[_i].style.border = "black 3px solid";
      charBoxes[_i].style.backgroundColor = "#ddd";
    }
  }
}; //place an item... whether use clicks on the div or directly on the image currently on the board


var alignClicked = function alignClicked(e) {
  // box on alignment chart was selected
  var selectedDiv = e.target;

  if (e.target.id === "imgOnChart") {
    selectedDiv = e.target.parentNode;
    e.target.remove();
  } else if (e.target.children.length > 0) {
    e.target.innerHTML = "";
  }

  if (charSelected > -1) {
    var image = document.createElement('img');
    image.src = charBoxes[charSelected].getElementsByTagName('img')[0].src;
    image.id = "imgOnChart"; //image.addEventListener('click', alignClicked);

    selectedDiv.appendChild(image);
  }
};

var charClicked = function charClicked(e) {
  // character was selected
  charBoxes = document.querySelectorAll(".cbox");

  for (var _i2 = 0; _i2 < charBoxes.length; _i2 += 1) {
    if (e.target === charBoxes[_i2].getElementsByTagName('img')[0]) {
      charSelected = _i2;
    }
  }

  boxReset();
}; //clear button selected. remove all chart images.


var clearClicked = function clearClicked() {
  for (var _i3 = 0; _i3 < alignBoxes.length; _i3 += 1) {
    alignBoxes[_i3].innerHTML = "";
  }
}; //get new characters on dropdown selected


var resetChars = function resetChars() {
  var cboxes = document.querySelector('#characters-picker');
  var mediaList = document.querySelector('.mediaList');
  charBoxes = [];
  var selText = mediaList.options[mediaList.selectedIndex].text;
  sendAjax('GET', '/getCharacters', null, function (data) {
    var finalChars = [];

    for (var _i4 = 0; _i4 < data.characters.length; _i4 += 1) {
      if (data.characters[_i4].media === selText || selText === "ALL") {
        finalChars.push(data.characters[_i4]);
      }
    }

    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: finalChars
    }), document.querySelector("#characters-picker"));
  });
  charSelected = -1;
}; //Do I need to credit myself? This is from https://people.rit.edu/bxh9261/330/exercises/hello-canvas.html


var drawChart = function drawChart() {
  // Get the modal
  var canvasModal = document.querySelector("#canvasModal");
  canvasModal.style.display = "block";
  var xspan = document.querySelector(".close");
  xspan.addEventListener('click', closeModal);
  var canvas = document.querySelector("canvas");
  var download = document.querySelector("#download");
  download.addEventListener('click', downloadImage); // B - the ctx variable points at a “2D drawing context” 

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

  for (var _i5 = 100; _i5 <= 640; _i5 += 170) {
    ctx.moveTo(150, _i5);
    ctx.lineTo(660, _i5);
  } //vertical lines


  for (var _i6 = 150; _i6 <= 690; _i6 += 170) {
    ctx.moveTo(_i6, 100);
    ctx.lineTo(_i6, 610);
  }

  ctx.closePath();
  ctx.stroke();

  for (var _i7 = 0; _i7 < alignBoxes.length; _i7 += 1) {
    //https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
    if (alignBoxes[_i7].getElementsByTagName('img').length > 0) {
      var base_image = new Image();
      base_image.src = alignBoxes[_i7].getElementsByTagName('img')[0].src;
      base_image.width = "130";
      base_image.height = "130";
      var scale = Math.min(150 / base_image.width, 150 / base_image.height);
      ctx.drawImage(base_image, 155 + 170 * (_i7 % 3), 105 + 170 * Math.floor(_i7 / 3), base_image.width * scale, base_image.height * scale);
    }
  }
}; //X button on modal


var closeModal = function closeModal() {
  var canvasModal = document.querySelector("#canvasModal");
  canvasModal.style.display = "none";
}; //https://stackoverflow.com/questions/8126623/downloading-canvas-element-to-an-image


var saveImage = function saveImage() {
  var download = document.querySelector("#download");
  var body = {
    imageLinks: []
  };

  if (alignBoxes[i].getElementsByTagName('img').length > 0) {
    imageLinks.push(alignBoxes[i].getElementsByTagName('img')[0].src);
  } else {
    imageLinks.push('');
  }

  axios.post('/makeChart', body).then(function (response) {
    console.log(response);
  })["catch"](function (error) {
    console.log(error);
  });
};

var init = function init() {
  // An Event *Listeners*
  alignBoxes = document.querySelectorAll('.box');

  for (var _i8 = 0; _i8 < alignBoxes.length; _i8 += 1) {
    alignBoxes[_i8].addEventListener('click', alignClicked);
  }

  characterSet = document.querySelector('#characterSet');
  characterSet.addEventListener('change', resetChars);
  var clearButton = document.querySelector("#clear");
  clearButton.addEventListener('click', clearClicked);
  var createButton = document.querySelector("#create");
  createButton.addEventListener('click', drawChart);
};

var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "characterList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyCharacter"
      }, "None yet"))
    );
  }

  var boxwidth = "100%";
  var charwidth = "100%";

  if (props.characters.length < 9) {
    boxwidth = props.characters.length * 6 + "%";
    charwidth = 100 / props.characters.length + "%";
  } else {
    boxwidth = "54%";
    charwidth = "11.11%";
  }

  var characterNodes = props.characters.map(function (character) {
    return (/*#__PURE__*/React.createElement("div", {
        style: {
          width: charwidth
        },
        key: character._id,
        className: "cbox"
      }, /*#__PURE__*/React.createElement("img", {
        onClick: charClicked,
        src: character.imageLink,
        alt: character.charname
      }))
    );
  });
  return (/*#__PURE__*/React.createElement("div", _defineProperty({
      className: "characterList",
      style: {
        width: boxwidth
      }
    }, "className", "redbox"), characterNodes)
  );
};

var CharacterDropDown = function CharacterDropDown(props) {
  if (props.characters.length === 0) {
    return (/*#__PURE__*/React.createElement("select", {
        className: "mediaList"
      }, /*#__PURE__*/React.createElement("option", null, "ALL"))
    );
  }

  var medArray = [];

  for (var _i9 = 0; _i9 < props.characters.length; _i9 += 1) {
    if (!medArray.includes(props.characters[_i9].media)) {
      medArray.push(props.characters[_i9].media);
    }
  }

  var characterNodes = medArray.map(function (character) {
    return (/*#__PURE__*/React.createElement("option", {
        key: character._id
      }, character)
    );
  });
  return (/*#__PURE__*/React.createElement("select", {
      className: "mediaList"
    }, /*#__PURE__*/React.createElement("option", null, "ALL"), characterNodes)
  );
};

var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: data.characters
    }), document.querySelector("#characters-picker"));
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterDropDown, {
      characters: data.characters
    }), document.querySelector("#characterSet"));
  });
};

var setup = function setup() {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters-picker"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterDropDown, {
    characters: []
  }), document.querySelector("#characterSet"));
  loadCharactersFromServer();
};

$(document).ready(function () {
  setup();
  init();
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
