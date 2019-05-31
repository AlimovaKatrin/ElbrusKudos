document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // const author = document.querySelector('h4[name="author"]');
        const username = document.getElementById("NameSuper").value;
        const text = document.querySelector('input[name="textKudos"]').value;
        const cardBody = document.querySelector('p');


        // console.log(author)
        console.log(username)
        console.log(text)
        let res = await fetch('/kudo', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                text: text
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