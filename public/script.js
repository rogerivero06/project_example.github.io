const right = document.getElementById('right');
const registerBtn = document.getElementById('register-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');
const emailUsername = document.getElementById('email-username');
const passwordLogin = document.getElementById('password-login');
const username = document.getElementById('username');
const email = document.getElementById('email');
const passwordRegister = document.getElementById('password-register');
const repeatPassword = document.getElementById('repeat-password');
const signinBtn = document.getElementById('signin-btn');
const signupBtn = document.getElementById('signup-btn');

// Modo oscuro
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Alternar entre formularios
registerBtn.addEventListener("click", () => {
    right.classList.toggle('active');
    registerBtn.textContent = right.classList.contains('active')
        ? 'Access account'
        : 'Create account';
});

// Validación en tiempo real del campo usuario
function validateUsername() {
    const user = username.value.trim();
    const usernameMessage = document.getElementById('username-message');

    if (user.length === 0) {
        usernameMessage.style.display = 'none';
    } else {
        usernameMessage.style.display = 'block';
        if (user.length < 5) {
            usernameMessage.className = 'message-error';
            usernameMessage.textContent = 'El usuario debe tener al menos 5 caracteres';
        } else {
            usernameMessage.className = 'message-valid';
            usernameMessage.textContent = 'Usuario válido';
        }
    }
    updateSubmitButton();
}

// Validación en tiempo real del campo correo
function validateEmail() {
    const mail = email.value.trim();
    const emailMessage = document.getElementById('email-message');
    
    if (mail.length === 0) {
        emailMessage.style.display = 'none';
    } else {
        emailMessage.style.display = 'block';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            emailMessage.className = 'message-error';
            emailMessage.textContent = 'Ingresa un correo electrónico válido';
        } else {
            emailMessage.className = 'message-valid';
            emailMessage.textContent = 'Correo válido';
        }
    }
    updateSubmitButton();
}

// Validación en tiempo real del campo contraseña
function validatePasswordRealTime() {
    const password = passwordRegister.value;
    const passwordRequirements = document.getElementById('password-requirements');
    const lengthError = document.getElementById('length-error');
    const uppercaseError = document.getElementById('uppercase-error');
    const lowercaseError = document.getElementById('lowercase-error');
    const numberError = document.getElementById('number-error');
    const specialError = document.getElementById('special-error');

    const minLength = 5;
    const minUppercase = 1;
    const minLowercase = 1;
    const minNumbers = 1;
    const minSpecial = 1;

    if (password.length === 0) {
        passwordRequirements.style.display = 'none';
    } else {
        passwordRequirements.style.display = 'block';
    }
    
    if (password.length > 0) {
        const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
        const lowercaseCount = (password.match(/[a-z]/g) || []).length;
        const numberCount = (password.match(/[0-9]/g) || []).length;
        const specialCount = (password.match(/[!@#$%^&*]/g) || []).length;

        lengthError.className = password.length >= minLength ? 'message-valid' : 'message-error';
        lengthError.textContent = password.length >= minLength ? 'Largo válido' : `Mínimo ${minLength} caracteres`;
        uppercaseError.className = uppercaseCount >= minUppercase ? 'message-valid' : 'message-error';
        uppercaseError.textContent = uppercaseCount >= minUppercase ? 'Mayúsculas válidas' : `Mínimo ${minUppercase} letras mayúsculas`;
        lowercaseError.className = lowercaseCount >= minLowercase ? 'message-valid' : 'message-error';
        lowercaseError.textContent = lowercaseCount >= minLowercase ? 'Minúsculas válidas' : `Mínimo ${minLowercase} letras minúsculas`;
        numberError.className = numberCount >= minNumbers ? 'message-valid' : 'message-error';
        numberError.textContent = numberCount >= minNumbers ? 'Números válidos' : `Mínimo ${minNumbers} números`;
        specialError.className = specialCount >= minSpecial ? 'message-valid' : 'message-error';
        specialError.textContent = specialCount >= minSpecial ? 'Caracteres especiales válidos' : `Mínimo ${minSpecial} carácter especial (!@#$%^&*)`;
    }

    validatePasswordMatch();
    updateSubmitButton();
}

// Validación en tiempo real de la coincidencia de contraseñas
function validatePasswordMatch() {
    const password = passwordRegister.value;
    const repeat = repeatPassword.value;
    const repeatPasswordMessage = document.getElementById('repeat-password-message');

    if (repeat.length === 0 || password.length === 0) {
        repeatPasswordMessage.style.display = 'none';
    } else {
        repeatPasswordMessage.style.display = 'block';
    }
    
    if (repeat.length > 0 && password.length > 0) {
        if (password === repeat && password.length > 0) {
            repeatPasswordMessage.className = 'message-valid';
            repeatPasswordMessage.textContent = 'Las contraseñas coinciden';
        } else {
            repeatPasswordMessage.className = 'message-error';
            repeatPasswordMessage.textContent = 'Las contraseñas deben coincidir';
        }
    }
    updateSubmitButton();
}

// Validación en tiempo real de los campos de login
function validateLoginFields() {
    // Función vacía: No se muestran mensajes en tiempo real en login
}

// Deshabilitar botón de registro hasta que todos los campos sean válidos
function updateSubmitButton() {
    const user = username.value.trim();
    const mail = email.value.trim();
    const password = passwordRegister.value;
    const repeat = repeatPassword.value;
    const submitButton = signupBtn;
    const minLength = 5;
    const minUppercase = 1;
    const minLowercase = 1;
    const minNumbers = 1;
    const minSpecial = 1;

    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    const lowercaseCount = (password.match(/[a-z]/g) || []).length;
    const numberCount = (password.match(/[0-9]/g) || []).length;
    const specialCount = (password.match(/[!@#$%^&*]/g) || []).length;

    const isValid = user.length >= 5 &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) &&
                    password === repeat &&
                    password.length >= minLength &&
                    uppercaseCount >= minUppercase &&
                    lowercaseCount >= minLowercase &&
                    numberCount >= minNumbers &&
                    specialCount >= minSpecial;

    submitButton.disabled = !isValid;
    submitButton.style.opacity = isValid ? '1' : '0.5';
    submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
}

// Función para handleLogin
function handleLogin(event) {
    event.preventDefault();
    const user = emailUsername.value.trim();
    const passLogin = passwordLogin.value.trim();
    const message = document.getElementById('login-message');

    if (!user) {
        message.style.color = 'red';
        message.textContent = 'Ingresa una dirección de correo o usuario válido';
        return;
    }
    if (!passLogin) {
        message.style.color = 'red';
        message.textContent = 'Ingresa una contraseña válida';
        return;
    }

    // Cambiado a la ruta /login
    fetch('http://localhost:3016/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: passLogin }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Guardar información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirigir después de un breve delay
            setTimeout(() => {
                window.location.href = '/pages/home.html';
            }, 1000);
        } else {
            message.style.color = 'red';
            message.textContent = data.message || 'Usuario o contraseña incorrectos';
            passwordLogin.value = '';
        }
    })
    .catch(error => {
        message.style.color = 'red';
        message.textContent = 'Error de conexión con el servidor';
        console.error('Error:', error);
    });
}

// Función para handleRegister
function handleRegister(event) {
    event.preventDefault();
    
    // Verificar si el botón está deshabilitado (campos no válidos)
    if (signupBtn.disabled) {
        return;
    }

    const user = username.value.trim();
    const mail = email.value.trim();
    const password = passwordRegister.value.trim();
    const repeat = repeatPassword.value.trim();
    const message = document.getElementById('register-message');

    // Validaciones adicionales por seguridad
    if (user.length < 5) {
        message.style.color = 'red';
        message.textContent = 'El usuario debe tener al menos 5 caracteres';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        message.style.color = 'red';
        message.textContent = 'Correo electrónico inválido';
        return;
    }

    const minLength = 5;
    const minUppercase = 1;
    const minLowercase = 1;
    const minNumbers = 1;
    const minSpecial = 1;

    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    const lowercaseCount = (password.match(/[a-z]/g) || []).length;
    const numberCount = (password.match(/[0-9]/g) || []).length;
    const specialCount = (password.match(/[!@#$%^&*]/g) || []).length;

    if (password.length < minLength) {
        message.style.color = 'red';
        message.textContent = `La contraseña debe tener al menos ${minLength} caracteres`;
        return;
    }
    if (uppercaseCount < minUppercase) {
        message.style.color = 'red';
        message.textContent = `La contraseña debe incluir al menos ${minUppercase} letras mayúsculas`;
        return;
    }
    if (lowercaseCount < minLowercase) {
        message.style.color = 'red';
        message.textContent = `La contraseña debe incluir al menos ${minLowercase} letras minúsculas`;
        return;
    }
    if (numberCount < minNumbers) {
        message.style.color = 'red';
        message.textContent = `La contraseña debe incluir al menos ${minNumbers} números`;
        return;
    }
    if (specialCount < minSpecial) {
        message.style.color = 'red';
        message.textContent = `La contraseña debe incluir al menos ${minSpecial} carácter especial (!@#$%^&*)`;
        return;
    }

    if (password !== repeat) {
        message.style.color = 'red';
        message.textContent = 'Las contraseñas no coinciden';
        return;
    }

    // Cambiado a la ruta /register
    fetch('http://localhost:3016/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: user, 
            email: mail, 
            password: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            message.style.color = 'green';
            message.textContent = 'Registro exitoso. ¡Inicia sesión!';
            right.classList.remove('active');
            registerBtn.textContent = 'Create account';
            
            // Limpiar formulario
            username.value = '';
            email.value = '';
            passwordRegister.value = '';
            repeatPassword.value = '';
            
            // Ocultar mensajes
            document.getElementById('password-requirements').style.display = 'none';
            document.getElementById('repeat-password-message').style.display = 'none';
            document.getElementById('username-message').style.display = 'none';
            document.getElementById('email-message').style.display = 'none';
            
            // Resetear estado del botón
            signupBtn.disabled = true;
            signupBtn.style.opacity = '0.5';
            signupBtn.style.cursor = 'not-allowed';
        } else {
            message.style.color = 'red';
            message.textContent = data.message || 'Error en el registro';
        }
    })
    .catch(error => {
        message.style.color = 'red';
        message.textContent = 'Error de conexión con el servidor';
        console.error('Error:', error);
    });
}

// Event listeners para validaciones en tiempo real
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
passwordRegister.addEventListener('input', validatePasswordRealTime);
repeatPassword.addEventListener('input', validatePasswordMatch);
emailUsername.addEventListener('input', validateLoginFields);
passwordLogin.addEventListener('input', validateLoginFields);

// Event listeners para los botones de submit
signinBtn.addEventListener('click', handleLogin);
signupBtn.addEventListener('click', handleRegister);

// Inicializar el estado del botón al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    signupBtn.disabled = true;
    signupBtn.style.opacity = '0.5';
    signupBtn.style.cursor = 'not-allowed';
});