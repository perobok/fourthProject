// Personal API Key for geoNames API
const apiGeoURL = 'http://api.geonames.org/searchJSON';
const apiGeoUserName = 'perobok';

// Personal API Key for WeatherBit API
const apiPictureURL = 'https://pixabay.com/api/';
const apiPictureKey = '20614359-7c7fdf79fa0e5a77a9260f522';


let collectedData = {};

function mainApp() {
    // Event listener to add function to existing HTML DOM element
    document.querySelector("#generate").addEventListener('click', geoData);
    document.querySelector("#saveAndRenderNewCard").addEventListener('click', postData2server);
    document.querySelector("#saveAndRenderNewCard").addEventListener('click', updateUI);
}

//Function called by event listener :
async function geoData(e) {
    e.preventDefault();
    // to take values and input validation
    const destination = document.querySelector("#destination").value;
    const tripDate = document.getElementById("date1").value;
    if (!destination) {
        alert("Please enter any destination!!!");
        return;
    }

    //mainCard to make higher.
    //to show main card
    //we need to provide diffeerent scenarios because of media optimisation
    const styl = window.matchMedia("(max-width: 600px)")
    mediaCondition(styl);
    styl.addEventListener('onload', mediaCondition)

    function mediaCondition(styl) {
        if (styl.matches) { //MOBILE SCREEN
            console.log(styl)
            const mainCardVisibility = document.querySelector(".mainCard");
            mainCardVisibility.style.cssText = "visibility:visible; opacity:1;height:420px;flex-direction: horizontal;";
            // to move and scale form
            const movingForm = document.querySelector(".inputForm");
            movingForm.style.cssText = " margin-top: -35px; height: 90px;  transition: margin-top 0.7s, height 0.7s linear ease-out 0.4s; ;";
        } else { //BIG SCREEN
            console.log(styl)

            const mainCardVisibility = document.querySelector(".mainCard");
            mainCardVisibility.style.cssText = "visibility:visible; opacity:1;height:320px;";
            // to move and scale form
            const movingForm = document.querySelector(".inputForm");
            movingForm.style.cssText = " margin-top: -45px; height: 80px;  transition: margin-top 0.7s, height 0.7s linear ease-out 0.4s; ;";

        }

    }






    // this part of code will return number of days before our trip. 
    const trip = new Date(Date.parse(tripDate));
    const difference_In_Time = trip.getTime() - new Date().getTime();
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
}

/* Functions to GET Data */
async function getData(destination, roundDays) {
    try {

        // const value = await getPosition(destination);
        // const lat = value.lat;
        // const lng = value.lng;
        // const countryName = value.countryName;

        const { lat, lng, countryName } = await getPosition(destination);
        // to GET weather data

        const { cityName, mainCardTemp } = await getWeather(lat, lng, roundDays);

        // to GET picture 
        const pic = await getPic(destination, countryName);

        // making object var to collect data
        collectedData = { pic, lat, lng, countryName, cityName, mainCardTemp }






    } catch (error) {
        console.log("error", error);
    }
};

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
    return { lat, lng, countryName };
}

function getWeather(lat, lng, roundDays) {
    return fetch(`http://localhost:8083/apiWeather`, {
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
                return { cityName }
            } else {
                const mainCardTemp = Math.round(res.data[roundDays - 1].max_temp);
                document.querySelector(".mainCardTemp").innerHTML = "Predicted weather will be: " + mainCardTemp + "&#8451";
                return { cityName, mainCardTemp }
            }

        })
}



async function getPic(destination, countryName) {

    const responsePic = await fetch(`https://cors-anywhere.herokuapp.com/${apiPictureURL}?key=${apiPictureKey}&q=${destination}`);
    const dataPic = await responsePic.json();
    console.log(dataPic);
    if (dataPic.totalHits !== 0) {
        const cityPicture = dataPic.hits[0].webformatURL;
        document.querySelector("#landscape").src = cityPicture;

        return cityPicture;
    } else {
        const responsePicCountry = await fetch(`https://cors-anywhere.herokuapp.com/${apiPictureURL}?key=${apiPictureKey}&q=${countryName}`);
        const dataPicCountry = await responsePicCountry.json();
        console.log(dataPicCountry);
        const countryPicture = dataPicCountry.hits[0].webformatURL;
        document.querySelector("#landscape").src = countryPicture;

        return countryPicture;
    }
    // adding event listener to the save button
    // Function to post data to server
}

async function postData2server() {
    const response = await fetch('http://localhost:8083/projectData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collectedData)
    });
    console.log(await response.text());
}

// To updateUI with data taken from server
const updateUI = async() => {
    const request = await fetch(`http://localhost:8083/projectData`)
    console.log("call made")
    try {
        const allData = await request.json();
        console.log(allData);
        console.log(allData.length);
        // document.querySelector("#date").innerHTML = allData[0].newDate;
        // let newDiv = document.createElement('div');
        // let tempNode = document.createTextNode(''); // empty string because we dont need any text inside only ancher tag bellow!!!`)
        // console.log(tempNode)
        // newDiv.appendChild(tempNode);
        // console.log(newDiv)
        // newDiv.classList.add(`.cardText23`);
        for (let i = 0; i < allData.length; i++) {
            console.log(i)
            let arrayLength = allData.length;
            const firstRowVisibility = document.querySelector(".allCardsFirstRow");
            const secondRowVisibility = document.querySelector(".allCardsSecondRow");
            console.log(arrayLength);
            if (arrayLength < 4) {
                firstRowVisibility.style.cssText = "height: auto; visibility:visible; opacity:1;";
                secondRowVisibility.style.cssText = "height: 0px;visibility:hidden; opacity:0;";

            } else {
                firstRowVisibility.style.cssText = "height: auto;visibility:visible; opacity:1;";
                secondRowVisibility.style.cssText = "height: auto;visibility:visible; opacity:1;";
            }

            document.querySelector(`#landscapeCard${i}`).src = allData[i].pic;
            document.querySelector(`.cardText${i}`).innerHTML = "You are visiting " + allData[i].cityName + " in " + allData[i].countryName;
            document.querySelector(`.cardTemp${i}`).innerHTML = "Temperature on visiting day was: " + allData[i].mainCardTemp + " &#8451";
            document.querySelector(`.cardRemove${i}`).innerHTML = "Coordinates are: " + allData[i].lat + " " + allData[i].lng;

        }
    } catch (error) {
        console.log("error", error);
    }
}

export { mainApp }
export { geoData }