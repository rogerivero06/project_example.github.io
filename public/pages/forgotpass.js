const darkModeBtn = document.getElementById('dark-mode-btn');
const email = document.getElementById('email');
const sendCodeBtn = document.getElementById('send-code-btn');

darkModeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
});

// Forgot password //
sendCodeBtn.addEventListener("click",e=>{
  e.preventDefault();
  let user = email.value.trim();
  
  if(!user){
    alert("Ingresa una dirección de correo válida");
  }
  
  else if(autenticarUsuario(user)){
    window.location = "/../index.html";
  }
  
  else{
    alert("Credenciales no válidas");
    email.value = "";
  }
});

function autenticarUsuario(user){
  return user === "2@2";
}

