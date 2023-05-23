Fight_Booking System

Endpoint 1: Register User
Description : This api create new users in the database. 

Request
Method: POST
URL: http://localhost:4430/api/register
Headers: no headers 
Body: "name": "",
    "email": "",
    "password": "",
    "role" : "user/admin"

Authentication/Authorization : No authentication or authorization required

Response
Success Response: 'User Added Successfully'
Status Code: [201]
Body: No Body
Error Responses: It has multiple error responses. 1. User already exist. 2. invalid Email address 
	3. error from the server



Endpoint 2: Login User
Description : This api logs in an existing user in the database. 

Request
Method: POST
URL: http://localhost:4430/api/login
Headers: no headers 
Body: 
    "email": "",
    "password": "",
    
Authentication/Authorization : No authentication or authorization required

Response
Success Response: {
    "userRecord": {
        "name": "",
        "email": "",
        "role": ""
    },
    "token": ""
}
Status Code: [200]
Body: No Body
Error Responses: It has multiple error responses. 1. User does not exist. 2. invalid credentials 
	3. error from the server



Endpoint 3: Logout User
Description : This api logs out an existing user from the database. 

Request
Method: GET
URL: http://localhost:4430/api/logout
Headers: "token" 
Body: No body
    
Authentication/Authorization : No authentication or authorization required

Response
Success Response: logout successful 
Status Code: [200]
Body: No Body
Error Responses: It has multiple error responses. 1. Login Again. 2.error from the server

Fight_Booking System



Endpoint 4: Adding Passenger Record
Description : This api adds new passenger in the database. 

Request
Method: POST
URL: http://localhost:4430/api/add_passenger
Headers: no headers 
Body:"name" : "",
    "phoneNo" : "",
    "passportNumber" : "",
    "DOB" : "",
    "address" : ""

Authentication/Authorization : No authentication or authorization required

Response
Success Response: 'Passenger Added Successfully'
Status Code: [201]
Body: No Body
Error Responses: It has multiple error responses. 1. Passenger already exist. 2.error from the server



Endpoint 5: Search Flights
Description : This api adds search flights using a third party api.

Request
Method: GET
URL: http://localhost:4430/api/http://localhost:4430/api/search_flights?origin= ""&destination=""&date=""
Headers: no headers 
Body:no body

Authentication/Authorization : No authentication or authorization required

Response
Success Response:  {
        "flightNo": "",
        "origin": "",
        "destination": "",
        "arrival": "",
        "departure": "",
        "price": {
            "amount": ,
            "currency": "USD"
        }
    },
Status Code: [200]
Body: No Body
Error Responses: 




Endpoint 6: Add Flights
Description : This api adds flights in the database.

Request
Method: POST
URL: http://localhost:4430/api/http://localhost:4430/api/add_flights
Headers: we have to send token in the headers 
Body:{
    "flightNumber": "",
    "origin" : "",
    "destination" : "",
    "departure" : "",
    "arrival" : "",
    "price" : 
    {"amount" :,
    "currency" : "USD"
    }
    
}

Authentication/Authorization : we have to authenticate the user if allowe or not

Response
Success Response: Flight Added Successfully
Status Code: [201]
Body: 
Error Responses: 1. 'You are not authorized', 2.server error 


Endpoint 7: Update Flights
Description : This api Updates existing flights in the database.

Request
Method: POST
URL: http://localhost:4430/api/http://localhost:4430/api/update_flights
Headers: we have to send token in the headers 
Body:{
    "flightNumber": "",
    "origin" : "",
    "destination" : "",
    "departure" : "",
    "arrival" : "",
    "price" : 
    {"amount" :,
    "currency" : "USD"
    }
    
}

Authentication/Authorization : we have to authenticate the user if allowe or not

Response
Success Response: Flight Added Successfully
Status Code: [201]
Body: 
Error Responses: 1. 'You are not authorized', 2.server error 
