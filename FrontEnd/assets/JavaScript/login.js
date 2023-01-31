








    const userPass = {
    email : document.querySelector("[name=email]"),
    password : document.querySelector("[name=password]")
}



const chargeUtile = JSON.stringify(userPass);

const reponse =  await fetch  ("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile
})

const data =  await reponse.json()
const token = data.token
console.log(token)





