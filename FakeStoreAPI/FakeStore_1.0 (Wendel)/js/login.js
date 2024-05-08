function validarLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "wendel" && password === "123") {
    window.location.href = "/";
    return false;
  } else {
    alert("Nome de usuário ou senha incorretos!");
    return false;
  }
}
