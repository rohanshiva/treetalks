const fetch = require("node-fetch");


fetch("http://localhost:5000/user", {
    headers:{
        "Content-Type": "application/json"
    },
    method: "POST",
    body:JSON.stringify({
        email: "ramapitchala@gmail.com",
        id: "Ramko9999",
        username: "Ramko9999"
    })
}).then(async(res) => {
    let json = await res.json();
    console.log(json);
}); 