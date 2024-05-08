const data = [
  {
    id: 1,
    usuario: "wendel",
    senha: "123456",
  },
];

const btn = document.querySelector("#login");

console.log(data);

btn.addEventListener("click", (event) => {
  event.preventDefault();

  const user = document.getElementById("user").value;
  const password = document.getElementById("password").value;
  console.log(user, password);

  const login = data.find(
    (obj) => obj.usuario === user && obj.senha === password
  );

  if (login) {
    window.location = "../index.html";
  } else {
    alert("Informações incorretas, tente novamente");
  }
});
