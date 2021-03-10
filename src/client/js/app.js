// Personal API Key for geoNames API
const apiGeoURL = 'http://api.geonames.org/searchJSON';
const apiGeoUserName = 'perobok';
// Personal API Key for WeatherBit API
const apiWeatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const apiWeatherKey = 'a37ee370636f4a9ea951b07969113c7e';
// Personal API for Pixabay
const apiPictureURL = 'https://pixabay.com/api/';
const apiPictureKey = '20614359-7c7fdf79fa0e5a77a9260f522';

const destination = document.querySelector("#destination").value;
const tripDate = document.getElementById("date1").value;
console.log(tripDate);


// Create a new date instance dynamically with JS 
let d = new Date()

/*
let yearC = d.getFullYear();
let monthC = d.getMonth() + 1;
let dtC = d.getDate();

// If we want 0 in front of single number of day or month
if (dtC < 10) {
    dtC = '0' + dtC;
}
if (monthC < 10) {
    monthC = '0' + monthC;
}
const today = yearC + '-' + monthC + '-' + dtC;
console.log(tripDate);
*/

function mainApp(e) {
    e.preventDefault()
        // Event listener to add function to existing HTML DOM element
    document.querySelector("#generate").addEventListener('click', geoData);

    inputValidation();

    function inputValidation(destination) {
        console.log("::: Running input validation :::", destination);

        if (destination == " ") {
            alert("Please enter destination");
        } else {
            console.log("Good enter!!!");

        }

    }
    //Function called by event listener :
    async function geoData(e) {
        e.preventDefault();
        // this part of code will return number of days before our trip. 
        const trip = new Date(Date.parse(tripDate));
        const difference_In_Time = trip.getTime() - d.getTime();
        const differenceInDays = difference_In_Time / (1000 * 3600 * 24);
        const roundDays = Math.round(differenceInDays);
        console.log(roundDays);
        //then I was taking value from text input and pass it to the getData async function
        const data = await getData(destination);
    };

    /* Function to GET coordinates Data */
    async function getData(destination) {
        try {
            const responseGeo = await fetch(`${apiGeoURL}?q=${destination}&username=${apiGeoUserName}`);
            const dataGeo = await responseGeo.json();
            console.log(dataGeo.geonames[0])
            const countryName = dataGeo.geonames[0].countryName;
            const lat = dataGeo.geonames[0].lat;
            const lng = dataGeo.geonames[0].lng;
            console.log(countryName, lat, lng);
            // to GET weather data
            const responseWeather = await fetch(`${apiWeatherURL}?lat=${lat}&lon=${lng}&key=${apiWeatherKey}`);
            const dataWeather = await responseWeather.json();
            console.log(dataWeather)
                // to GET picture 
            const responsePic = await fetch(`${apiPictureURL}?key={ ${apiPictureKey} }&q=${destination}&image_type=photo`);
            const dataPic = await responsePic.json();
            console.log(dataPic)

        } catch (error) {
            console.log("error", error);
        }
    };
}




/*function handleSubmit(e) {
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
        alert("Please enter valid url!!!");
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
export { handleSubmit } */