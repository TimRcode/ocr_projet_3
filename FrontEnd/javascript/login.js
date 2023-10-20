
const loginSubmit = document.querySelector("#form-login")
if(loginSubmit){
    loginSubmit.addEventListener("submit", async function(event) {

        event.preventDefault();

        // supprime le dernier message d'erreur
        const previousError = document.querySelector(".error");
        if (previousError) {
            previousError.remove();
        }

        //récupération des valeurs des inputs
        const login = {
            email: document.querySelector(".login-name").value,
            password: document.querySelector(".login-pass").value
        };
        
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login)
            });
            // vérifie si la réponse a été traité avec succès
            if (response.ok) {
                const data = await response.json();
                
                //Enregistre la clé Auth et convertit data en une chaîne de caractère, dans le localStorage
                localStorage.setItem("Auth", JSON.stringify(data));

                window.location.replace("index.html");
            //Vérifie si le code de status est à 404 ou 401
            } else if (response.status === 404 || 401) {
                    throw new Error("Email et/ou mot de passe incorect");
                    
                } 
            

        //Permet de traiter l'erreur du bloc "try"
        } catch (error) {
            const errorMessage = document.createElement("div");
            errorMessage.setAttribute("class","error");
            errorMessage.innerHTML = error.message;
            document.querySelector("div").prepend(errorMessage);
        }

    });

}
//Récupération de la clé "Auth"
//JSON.parse convertit la chaîne de caractères au format JSON en un objet JavaScript
const Auth = JSON.parse(localStorage.getItem('Auth'))

//Condition si  "Auth" et le token sont true alors la condition est exécuté
if ( Auth && Auth.token) {
        const loginButton = document.querySelector(".login");



    loginButton.innerHTML = `<a href="#">logout</a>`;
    loginButton.classList.replace("login", "logout");

    document.querySelector(".categories").style.display = "none";
//Si false, supprime tous les élément avec la classe ".hide-edition"
} else{
    const editors = document.querySelectorAll(".hide-edition");
    for(let editor of editors){
        editor.remove()
    }
}

// logout 
const logout = document.querySelector(".logout");

if (logout) { 
    logout.addEventListener("click", function(event) {

        const editors = document.querySelectorAll(".hide-edition");
        for(let editor of editors){
            editor.remove()
            }
    //Supprime la valeur de la clé "Auth"
    localStorage.removeItem("Auth");

    document.querySelector(".categories").style.display = "";

    logout.innerHTML = `<a href="login.html">login</a>`;
    logout.classList.replace("logout", "login");
    })

}