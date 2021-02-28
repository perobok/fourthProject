function handleSubmit(e) {
    e.preventDefault()
        // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.urlValidation(formText)

    console.log("::: Form Submitted :::")
    console.log(formText)
        // Here I needed to write again rules for url validation. If I don't write it here program will allways send formText content although it is not an URL.

    var rules = new RegExp('^((https?:)?\\/\\/)?' + // protocol
        '(?:\\S+(?::\\S*)?@)?' + // authentication
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater

    if ((!rules.test(formText))) {
        console.log("It is not an URL!!!")
    } else {
        fetch(`http://localhost:8081/api`, {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: formText }),
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(res)
                document.getElementById('results1').innerHTML = 'Subjectivity: ' + res.subjectivity;
                document.getElementById('results2').innerHTML = 'Confidence: ' + res.confidence + ' %';
                document.getElementById('results3').innerHTML = 'Irony: ' + res.irony;
            })

    }
}
export { handleSubmit }