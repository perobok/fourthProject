const apiKey = '8e48286ca5ff3760915b968299ee8903'

function handleSubmit(e) {
    e.preventDefault()
    console.log(process.env.API_KEY)
        // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    const APIcall = getData(formText);

    console.log("::: Form Submitted :::")
    async function getData(formText) {
        const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&of=json&txt=${formText}&lang=en`);
        const data = await response.json();
        console.log(data);
        const update = updateUI(data)
        return data;

    }

    const updateUI = async(data) => {
            document.getElementById('results1').innerHTML = 'Subjectivity: ' + data.subjectivity;
            document.getElementById('results2').innerHTML = 'Confidence: ' + data.confidence + '%';
            document.getElementById('results3').innerHTML = 'Irony: ' + data.irony;
        }
        /*
            fetch(`https://api.meaningcloud.com/sentiment-2.1?key=<API_KEY>&of=json&url=${formText}&lang=en`, {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                })
                .then(res => res.json())

            .then(function(res) {
                document.getElementById('results').innerHTML = res.message
            })
             */
}

export { handleSubmit }