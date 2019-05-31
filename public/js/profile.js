document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelectorAll('form');

    form.forEach(async function (elem) {
        const del = elem.getElementsByClassName('w3-button w3-white w3-border w3-circle')
        
        del[0].addEventListener('click', async (e) => {
            e.preventDefault();
            
            const textDiv = elem.getElementsByClassName(`text`)[0]
           
            const text = textDiv.getAttribute('value')
         
            let res = await fetch(`/profile`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text:text
                })
            })
            elem.remove()
        })
        // const edit = elem.getElementsByClassName('editEvent')
        // // console.log(del[0])

        // edit[0].addEventListener('click', async (e) => {
        //     e.preventDefault();
        //     const formDiv = elem.getElementsByClassName("editForm")[0]

        //     const eventDiv = formDiv.getElementsByClassName("eventName")[0]
        //     const AdressDiv = formDiv.getElementsByClassName("eventAdress")[0]
        //     const DescriptionDiv = formDiv.getElementsByClassName("eventDescription")[0]
        //     const DateDiv = formDiv.getElementsByClassName("eventDate")[0]
        //     const idDiv = formDiv.getElementsByClassName("id")[0]
        //     const id = idDiv.getAttribute('value')

        //     console.log(id)
        //     // console.log(AdressDiv.value)
        //     // console.log(DescriptionDiv.value)
        //     // console.log(DateDiv.value)

        //     let res = await fetch(`/main`, {
        //         method: 'PUT',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             id: id,
        //             name: eventDiv.value,
        //             adress: AdressDiv.value,
        //             description: DescriptionDiv.value,
        //             eventDate: DateDiv.value,
        //         })
        //     })
        //     let response = await res.json();
        //     console.log(response);
        //     if (response.error)
        //         // alert(`${response.error}`)
        //         p.innerHTML = `<p>${response.error}</p>`

        //     else (response.url)
        //     window.location = response.url

        })
    })

