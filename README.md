# Capstone Travel app

## Overview
In this project I builded travel application. This app will be dynamic and should be created on customers demand. User should enter destination and date when he wants to go. Based on that data app will fetch three different APIs to add information on the page. First api will translate place location to geografical coordinates. Then With this data, app will fetch two different APIs to receive weather forcast and picture od place. 

## Detail explanation
Becide geoCooridnates I took information about country. I renedered it to the screen and also made condition if there is no picture of entered place app will return image of country. This was also required as extra sujestions from udacity.com. 

Weather data has condition as well. This API returns array of 17 days. If date of trip exceedes this value than we should return string that we are unable to predict wetaher thet far. 

## Instructions
To solve issue with CORS i append cors-anywhere url which sometimes ask to unlock demo version. 

Pero Bokic