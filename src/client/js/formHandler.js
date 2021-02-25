function handleSubmit(e) {
    e.preventDefault()
        // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.urlValidation(formText)

    console.log("::: Form Submitted :::")
    console.log(formText)

    fetch(`http://localhost:8081/api?input=${formText}`, {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
        })
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('results1').innerHTML = res.message
        })

}

export { handleSubmit }

/*
    const updateUI = async(data) => {
            document.getElementById('results1').innerHTML = 'Subjectivity: ' + data.subjectivity;
            document.getElementById('results2').innerHTML = 'Confidence: ' + data.confidence + '%';
            document.getElementById('results3').innerHTML = 'Irony: ' + data.irony;
        }
        */
/* async function getData(formText) {
        const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&of=json&url=${formText}&lang=en`);
        const data = await response.json();
        console.log(data);
        const update = updateUI(data)
        return data;
*/
//fetch(`http://localhost:3000/api?input=${newsText}`);