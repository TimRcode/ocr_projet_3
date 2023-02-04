
const loginSubmit = document.querySelector("form")
    loginSubmit.addEventListener("submit", async function(event) {

        event.preventDefault();

        // supprime le dernier message d'erreur
        const previousError = document.querySelector(".error");
        if (previousError) {
            previousError.remove();
        }

        //récupération des valeurs des inputs
        const login = {
            email: document.querySelector("[name=email]").value,
            password: document.querySelector("[name=password]").value
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
                window.localStorage.setItem("Auth", JSON.stringify(data));

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