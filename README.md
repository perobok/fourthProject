# Capstone Travel app

## Overview
In this project I created travel application. This app will be dynamic and should be created on customers demand. User should enter destination and date when he wants to go. Based on that data app will fetch three different APIs to add information on the page. First api will translate place location to geografical coordinates. Then With this data, app will fetch two different APIs to receive weather forcast and picture od place. 

## Detail explanation
Becide geoCooridnates I took information about country. I renedered it to the screen and also made condition if there is no picture of entered place app will return image of country. This was also required as extra sujestions from udacity.com. 

Weather data has condition as well. This API returns array of 17 days. If date of trip exceedes this value than we should return string that we are unable to predict wetaher thet far. 
API keys were stored in dotenv but for reviewing purposes I created varijables inside the code. Weather data API is fetching form server side. Just to practice another solution. 
Pixabay is called from client. I created condition where I covered next scenario.  If there is no picture of destination place function will return picture of country. All data from verious different functions are collecting in an object called collactedData : {}. This object will be posted on server by clicking on save trip button. This click as well runs function to updating UI and rendering history of saved trips. 
## Instructions

To solve issues with CORS by fetching pixabay  API I appended cors-anywhere url which first needs to be unlocked on this url: https://cors-anywhere.herokuapp.com/.  I understand this is not perfect solution for production mode, it will be stupid to ask from user to click unlock every time,  but I really couldn't find better solution after hours of trying. If this is not good enough for passing this final project please provide me with some details how to overcome this issue. 

Further instructions to run locally:

git clone this repo

run npm install

-for the purpose of review i putted my keys inside code so reviwer can easily 
obtain API keys for Weatherbit, Pixabay and GeoNames with your own accounts and place them in .env file matching api keys in server.js


run npm run 

go to http://localhost:8080/



Pero Bokic