"use strict";

var handleChar = function handleChar(e) {
  e.preventDefault();
  $("#characterMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#characterName").val() == '' || $("#characterMedia").val() == '' || $("#characterImg").val() == '') {
    handleError("RAWR! All fields are required!");
    return false;
  }

  sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
};

var CharacterForm = function CharacterForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "characterForm",
      name: "characterForm",
      onSubmit: handleChar,
      action: "/maker",
      method: "POST",
      className: "characterForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "charname"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "characterName",
      type: "text",
      name: "charname",
      placeholder: "Character Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "media"
    }, " Media: "), /*#__PURE__*/React.createElement("input", {
      id: "characterMedia",
      type: "text",
      name: "media",
      placeholder: "Character Media"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "imageLink"
    }, " Image URL: "), /*#__PURE__*/React.createElement("input", {
      id: "characterImg",
      type: "text",
      name: "imageLink",
      placeholder: ""
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeCharSubmit",
      type: "submit",
      value: "Submit"
    }))
  );
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

  var characterNodes = props.characters.map(function (character) {
    return (/*#__PURE__*/React.createElement("div", {
        key: character._id,
        className: "character"
      }, "Name: ", character.charname, /*#__PURE__*/React.createElement("img", {
        src: character.imageLink,
        alt: character.charname
      }))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, characterNodes)
  );
};

var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: data.characters
    }), document.querySelector("#characters"));
  });
};

var setup = function setup() {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
    csrf: ""
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters"));
  loadCharactersFromServer();
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
