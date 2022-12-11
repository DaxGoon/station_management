# Stations Management API
The station management API is a RESTful API that allows users to manage stations and their related entities such as companies, 
child companies, and station types. The API provides endpoints for creating, updating, and deleting these entities, 
as well as for retrieving them by ID or listing them.

The parser API is a separate API that allows users to provide a series of instructions (in the form of a plain text string) 
and receive a JSON response with the resulting state of the stations and companies after those instructions have been executed. 
The instructions must follow a specific format and must include the keywords BEGIN and END to mark the start and end of the instructions, 
respectively. The API is will accept the instructions in case-insensitive manner, however, each instructions must be in
a separate line.

## API Endpoints
All endpoints are defined in their respective route files, which are located in the `routes` directory. 
The routes are initialised as Express dynamic routes and then registered via file `routesRegistry` with the
Express app. The API is built using the Express framework.

The API has the following endpoints:

### Stations
- GET /stations
- GET /stations/{id}
- POST /stations
- PUT /stations/{id}
- DELETE /stations/{id}

### Companies
- GET /companies
- GET /companies/{id}
- POST /companies
- PUT /companies/{id}
- DELETE /companies/{id}
- GET /companies/expand/{id}

### Station Types
- GET /station-types
- GET /station-types/{id}
- POST /station-types
- PUT /station-types/{id}
- DELETE /station-types/{id}

### Parser
- POST /parseInstructions


Here is a sample instruction string that can be passed to the parser API:
    
    ```
BEGIN
Start station 1
Wait 5
Start station 2
Wait 10
Start station all
Wait 10
Stop station 2
Wait 10
Stop station 3
Wait 5
Stop station all
END
```
his instruction string tells the parser API to start station 1, wait 5 seconds, start station 2, wait 10 seconds, start all stations, wait 10 seconds, stop station 2, wait 10 seconds, stop station 3, wait 5 seconds, and finally stop all stations. The parser API will return a JSON response with the resulting state of the stations and companies after these instructions have been executed.

To use the station management API, you must first make a POST request to the /companies endpoint, providing the necessary details for the company you want to create. This will return the ID of the created company, which you can then use to make requests to the other endpoints that require a company ID.

For example, to create a company with the name "ACME Corp" and a child company with the name "ACME Child", you would make the following POST request to the /companies endpoint:

```
POST /companies
{
    "id": 1,
    "name": "My Awesome Corp",
    "childCompanies": [
        1, 4, 5 // IDs of child companies
    ],
    "stations": [
        1, 2, 3 // IDs of stations
    ]
}
```

You can also use the /stations and /stationTypes endpoints to create, update, and delete stations and station types, respectively. These endpoints require a company ID as well as the necessary details for the entity you want to create or update.

To use the parser API, you must first make a POST request to the /parseInstructions endpoint, providing the instructions as a plain text string in the request body.

