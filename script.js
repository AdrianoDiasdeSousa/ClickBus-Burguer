function fazerLogin(event) {
  event.preventDefault();
  alert("Login realizado com sucesso!");
}

function fazerCadastro(event) {
  event.preventDefault();
  alert("Cadastro realizado com sucesso!");
}
function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }

  alert("Login realizado com sucesso!");
  window.location.href = "index.html";
}

function recuperarSenha() {
  alert(
    "Funcionalidade de recuperação de senha será implementada na próxima Sprint.",
  );
}
