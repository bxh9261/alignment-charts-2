"use strict";

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("user").val() == '' || $("#pass").val() == '') {
    handleError("RAWR! Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("RAWR! Username or password is empty");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match!");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

var handlePassword = function handlePassword(e) {
  e.preventDefault();

  if ($("user").val() == '' || $("#oldpass").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("RAWR! Username or password is empty");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match!");
    return false;
  }

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "redbox"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, " Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign in"
    }))
  );
};

var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "redbox"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, " Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, " Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign Up"
    }))
  );
};

var PasswordWindow = function PasswordWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "passwordForm",
      name: "passwordForm",
      onSubmit: handlePassword,
      action: "/password",
      method: "POST",
      className: "redbox"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "oldpass"
    }, "Old Password: "), /*#__PURE__*/React.createElement("input", {
      id: "oldpass",
      type: "password",
      name: "oldpass",
      placeholder: "old password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, " New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "new password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, " New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype new password"
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Change Password"
    }))
  );
};

var createLoginWindow = function createLoginWindow() {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: ""
  }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow() {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: ""
  }), document.querySelector("#content"));
};

var createPasswordWindow = function createPasswordWindow() {
  ReactDOM.render( /*#__PURE__*/React.createElement(PasswordWindow, {
    csrf: ""
  }), document.querySelector("#content"));
};

var setup = function setup() {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  var passwordButton = document.querySelector("#passwordButton");
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow();
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow();
    return false;
  });
  passwordButton.addEventListener("click", function (e) {
    e.preventDefault();
    createPasswordWindow();
    return false;
  });
  createLoginWindow(); //default view
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
