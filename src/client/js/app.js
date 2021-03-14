// Personal API Key for geoNames API
const apiGeoURL = 'http://api.geonames.org/searchJSON';
const apiGeoUserName = 'perobok';

// Personal API Key for WeatherBit API
const apiPictureURL = 'https://pixabay.com/api/';
const apiPictureKey = '20614359-7c7fdf79fa0e5a77a9260f522';


// Create a new date instance dynamically with JS 
let d = new Date()

function mainApp() {
    // Event listener to add function to existing HTML DOM element
    document.querySelector("#generate").addEventListener('click', geoData);

}
//Function called by event listener :
async function geoData(e) {
    e.preventDefault();
    // to take values and input validation
    const destination = document.querySelector("#destination").value;
    const tripDate = document.getElementById("date1").value;
    if (destination === "") {
        alert("Please enter any destination!!!");
    } else {
        //to show main content after submit
        const cardVisibility = document.querySelector(".mainContent");
        cardVisibility.style.cssText = "visibility:visible; opacity:1;";
        //mainCard to make higher.
        const mainCardHeight = document.querySelector(".mainCard");
        mainCardHeight.style.cssText = "height:320px;";
        // to move and scale form
        const movingForm = document.querySelector(".inputForm");
        movingForm.style.cssText = " margin-top: -45px; height: 60px; padding-top:30px; transition: margin-top 0.7s, height 0.7s linear ease-out 0.4s; ;";



        // this part of code will return number of days before our trip. 
        const trip = new Date(Date.parse(tripDate));
        const difference_In_Time = trip.getTime() - d.getTime();
        const differenceInDays = difference_In_Time / (1000 * 3600 * 24);
        const roundDays = Math.round(differenceInDays);
        console.log(roundDays);
        if (roundDays == 0) {
            document.querySelector(".daysBefore").innerHTML = "Your trip is Today!!!"

        } else if (roundDays < 0) {
            alert("Please Enter Today's Date or Higher!!!");

        } else
            document.querySelector(".daysBefore").innerHTML = "Your trip is in " + roundDays + " days.";

        //then I was taking value from text input and pass it to the getData async function
        const data = await getData(destination, roundDays);
    };

    /* Functions to GET Data */
    async function getData(destination, roundDays) {
        try {

            const { lat, lng } =
            await getPosition(destination);
            // to GET weather data

            await getWeather(lat, lng, roundDays);
            // to GET picture 
            // await getPic(destination);

        } catch (error) {
            console.log("error", error);
        }
    };
}


async function getPosition(destination) {
    // to get key from dotenv on server side
    /*
    const responseKeyGeo = await fetch('http://localhost:8083/keys');
    const keyGeo = await responseKeyGeo.json();
    const apiGeoUserName = keyGeo.API_USERNAME_GEODATA;
    console.log(apiGeoUserName)
    */
    // to get Geo coordinates and country name data from API
    const responseGeo = await fetch(`${apiGeoURL}?q=${destination}&username=${apiGeoUserName}`);
    const dataGeo = await responseGeo.json();
    console.log(dataGeo.geonames[0]);
    const countryName = dataGeo.geonames[0].countryName;
    const lat = dataGeo.geonames[0].lat;
    const lng = dataGeo.geonames[0].lng;
    document.querySelector(".destinationCountry").innerHTML = countryName;

    console.log(countryName, lat, lng);
    getPic(destination, countryName);
    return { lat, lng, countryName };
}

async function getWeather(lat, lng, roundDays) {
    fetch(`http://localhost:8083/apiWeather`, {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lat, lng }),
        })
        .then(res => res.json())
        .then(function(res) {
            console.log(res)
                // rendering where we are gonna travel

            const cityName = res.city_name;
            document.querySelector(".destinationName").innerHTML = "You are traveling to " + cityName;

            if (roundDays > 17) { // weather data can only return array of 16 weather days. To prevent error I wrote this if statment. 
                document.querySelector(".mainCardTemp").innerHTML = "We are not able to predict weather for more then 16 days. Thank you. ";

            } else {
                const mainCardTemp = Math.round(res.data[roundDays - 1].max_temp);
                document.querySelector(".mainCardTemp").innerHTML = "Predicted weather will be: " + mainCardTemp + "&#8451";
            }
        })
}

async function getPic(destination, countryName) {
    /* //----to get key from .env-----//
    const responseKeyPic = await fetch('http://localhost:8083/keys');
    const keyPic = await responseKeyPic.json();
    const apiPictureKey = keyPic.API_KEY_PIXABAY;
    console.log(apiPictureKey)
*/
    const responsePic = await fetch(`https://cors-anywhere.herokuapp.com/${apiPictureURL}?key=${apiPictureKey}&q=${destination}`);
    const dataPic = await responsePic.json();
    console.log(dataPic);
    if (dataPic.totalHits !== 0) {
        const cityPicture = dataPic.hits[0].webformatURL;
        document.querySelector("#landscape").src = cityPicture;

    } else {
        const responsePicCountry = await fetch(`https://cors-anywhere.herokuapp.com/${apiPictureURL}?key=${apiPictureKey}&q=${countryName}`);
        const dataPicCountry = await responsePicCountry.json();
        console.log(dataPicCountry);
        const countryPicture = dataPicCountry.hits[0].webformatURL;
        document.querySelector("#landscape").src = countryPicture;
    }
}
export { mainApp }
export { geoData }