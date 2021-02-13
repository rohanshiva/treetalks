
export async function creatUser(user) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    };
    const response = await fetch('/user', requestOptions);
    const data = await response.json();

}

