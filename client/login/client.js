const handleLogin = (e) => {
    e.preventDefault();
    
    
    if($("user").val() == '' || $("#pass").val() == '') {
        handleError("RAWR! Username or password is empty");
        return false;
    }
    
    console.log($("input[name=_csrf]").val());
    
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    
    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
    
        if($("user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("RAWR! Username or password is empty");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("RAWR! Passwords do not match!");
        return false;
    }
    
    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    
    return false;
};

const handlePassword = (e) => {
    e.preventDefault();
    
        if($("user").val() == '' || $("#oldpass").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("RAWR! Username or password is empty");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("RAWR! Passwords do not match!");
        return false;
    }
    
    sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
    
    return false;
};

const LoginWindow = (props) => {
    return(
    <form id="loginForm" name="loginForm"
          onSubmit={handleLogin}
          action="/login"
          method="POST"
          className="mainForm"
    >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username"/>
    <label htmlFor="pass"> Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password"/>
    <input className="formSubmit" type="submit" value="Sign in" />
    </form>
    );
};

const SignupWindow = (props) => {
    return(
    <form id="signupForm" name="signupForm"
          onSubmit={handleSignup}
          action="/signup"
          method="POST"
          className="mainForm"
    >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username"/>
    <label htmlFor="pass"> Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password"/>
    <label htmlFor="pass2"> Password: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
    <input className="formSubmit" type="submit" value="Sign Up" />
    </form>
    );
};

const PasswordWindow = (props) => {
    return(
    <form id="passwordForm" name="passwordForm"
          onSubmit={handlePassword}
          action="/password"
          method="POST"
          className="mainForm"
    >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username"/>
    <label htmlFor="oldpass">Old Password: </label>
    <input id="oldpass" type="password" name="oldpass" placeholder="old password"/>
    <label htmlFor="pass"> New Password: </label>
    <input id="pass" type="password" name="pass" placeholder="new password"/>
    <label htmlFor="pass2"> New Password: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype new password"/>
    <input className="formSubmit" type="submit" value="Change Password" />
    </form>
    );
};

const createLoginWindow = () => {
    ReactDOM.render(
        <LoginWindow csrf={""} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = () => {
    ReactDOM.render(
        <SignupWindow csrf={""} />,
        document.querySelector("#content")
    );
};

const createPasswordWindow = () => {
    ReactDOM.render(
        <PasswordWindow csrf={""} />,
        document.querySelector("#content")
    );
};

const setup = () => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const passwordButton = document.querySelector("#passwordButton");
    
    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow();
        return false;
    });
    
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow();
        return false;
    });

    passwordButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordWindow();
        return false;
    });
    
    createLoginWindow(); //default view
};

$(document).ready(function(){
    setup();           
});