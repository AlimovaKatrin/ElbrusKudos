document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.querySelector('input[name="Name"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const picture = document.querySelector('input[name="avatar"]').value;
        const cardBody = document.querySelector('p');
        console.log(username)
        console.log(password)
        
        let res = await fetch('/reg', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                picture:picture
            })
        });

        let response = await res.json();
        // console.log(response);

        if (response.error) {
            cardBody.innerHTML = `
            <p>${response.error}</p>`
        }
        else if (response.url)
            window.location = response.url
    })

});