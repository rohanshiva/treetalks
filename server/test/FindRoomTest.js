const fetch = require("node-fetch");

fetch("http://localhost:5000/room/find", {
    headers: {
        "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
        title: "Abortion",
        degree: 89
    })
}).then(async (resp) => {
    console.log(resp.status);
    const {roomId} = await resp.json();
    console.log(roomId);
})