
const login = document.getElementById('login');
const email = document.getElementById('name');
const password = document.getElementById('pass');





function sendLoginFormDatas() {
    let user = {
        email: email.value,
        password: password.value,
    };

    postLoginForm(user);
}
    

function postLoginForm(user) {
    
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                // Si l'email ou le mot de passe est incorrect
                if (!response.ok) {
                    displayMessage('error', "&times; Erreur dans l'identifiant ou le mot de passe", loginFormEl);
                    emailInput.focus();
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data.userId) connecting(data);
            })
            .catch(error => {
                throw new Error(error);
            });
    };

login.addEventListener('submit', event => {
    event.preventDefault();
    sendLoginFormDatas();
});

function connection(data) {
    
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('token', data.token);

    
    const homePage = window.location + '../../index.html';
    window.location.replace(homePage);
}