let data = {
  selectedAgency: "1",
  selectedRoute: "1_100143",
  selectedStop: "1_840",
  //Note: this is from agencies-with-coverage.json, sub-element: data.references.agencies
  agencies: {
    "isFetching": false,
    "didInvalidate": false,
    "items": [
      {
        "disclaimer": "",
        "email": "",
        "fareUrl": "",
        "id": "1",
        "lang": "EN",
        "name": "Metro Transit",
        "phone": "206-553-3000",
        "privateService": false,
        "timezone": "America/Los_Angeles",
        "url": "http://metro.kingcounty.gov"
      }
    ]
  },
  //Note: this is from routes-for-agency/#.json, sub-element: data.list
  routes: {
    "1": {
      "isFetching": false,
      "didInvalidate": false,
      "items": [
        {
          "agencyId": "1",
          "color": "",
          "description": "Kingsgate to Downtown Seattle",
          "id": "1_100143",
          "longName": "",
          "shortName": "252",
          "textColor": "",
          "type": 3,
          "url": "http://metro.kingcounty.gov/schedules/252/n0.html"
        }
      ]
    }
  },
  //Note, this is from stops-for-route/#.json, data.entry.stopGroupings looped and removed 'polylines'
  stopGroups: {
    "1_100143": {
      "isFetching": false,
      "didInvalidate": false,
      "items": [{
        "id": "1",
        "name": {
          "name": "DOWNTOWN SEATTLE VIA SR-520",
          "names": [
            "DOWNTOWN SEATTLE VIA SR-520"
          ],
          "type": "destination"
        },
        "stopIds": [
          "1_74758",
          "1_74756",
          "1_74754",
          "1_74090",
          "1_74100",
          "1_74105",
          "1_74110",
          "1_74120",
          "1_74130",
          "1_74140",
          "1_74135",
          "1_74150",
          "1_81418",
          "1_74161",
          "1_74180",
          "1_74190",
          "1_74202",
          "1_74220",
          "1_74222",
          "1_85430",
          "1_74721",
          "1_74225",
          "1_71356",
          "1_71355",
          "1_71344",
          "1_910",
          "1_940",
          "1_950",
          "1_760",
          "1_790",
          "1_821",
          "1_820",
          "1_843"
        ],
        "subGroups": []
      },
      {
        "id": "0",
        "name": {
          "name": "KINGSGATE VIA SR-520",
          "names": [
            "KINGSGATE VIA SR-520"
          ],
          "type": "destination"
        },
        "stopIds": [
          "1_840",
          "1_640",
          "1_660",
          "1_682",
          "1_700",
          "1_1050",
          "1_1070",
          "1_71350",
          "1_71348",
          "1_71359",
          "1_74735",
          "1_74721",
          "1_85420",
          "1_74737",
          "1_74760",
          "1_74758",
          "1_74756",
          "1_74754",
          "1_74090",
          "1_74100",
          "1_74105",
          "1_74110",
          "1_74120",
          "1_74130",
          "1_74140",
          "1_74135",
          "1_74150",
          "1_81418",
          "1_74161",
          "1_74180",
          "1_74190"
        ],
        "subGroups": []
      }
    ]}
  },
  //Note: from schedule-for-stop/#.json, data.entry.stopRouteSchedules
  stops: {
    "1_840": {
      "1_100143": {
        "routeId": "1_100143",
        "stopRouteDirectionSchedules": [
        {
          "scheduleFrequencies": [],
          "scheduleStopTimes": [
            {
              "arrivalEnabled": false,
              "arrivalTime": 1466460082000,
              "departureEnabled": true,
              "departureTime": 1466460082000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30895155"
            },
            {
              "arrivalEnabled": true,
              "arrivalTime": 1466463202000,
              "departureEnabled": true,
              "departureTime": 1466463202000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30895154"
            },
            {
              "arrivalEnabled": false,
              "arrivalTime": 1466464766000,
              "departureEnabled": true,
              "departureTime": 1466464766000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30894519"
            },
            {
              "arrivalEnabled": false,
              "arrivalTime": 1466466150000,
              "departureEnabled": true,
              "departureTime": 1466466150000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30894526"
            },
            {
              "arrivalEnabled": true,
              "arrivalTime": 1466466870000,
              "departureEnabled": true,
              "departureTime": 1466466870000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30894518"
            },
            {
              "arrivalEnabled": true,
              "arrivalTime": 1466468254000,
              "departureEnabled": true,
              "departureTime": 1466468254000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30894525"
            },
            {
              "arrivalEnabled": true,
              "arrivalTime": 1466470526000,
              "departureEnabled": true,
              "departureTime": 1466470526000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30894974"
            },
            {
              "arrivalEnabled": true,
              "arrivalTime": 1466473762000,
              "departureEnabled": true,
              "departureTime": 1466473762000,
              "serviceId": "1_92782",
              "stopHeadsign": "",
              "tripId": "1_30895324"
            }
          ],
          "tripHeadsign": "KINGSGATE VIA SR-520"
        }
      ]
      }
    }
  },
  //Note, I don't know how this looks or how we get it.
  delays: {},
  //Note, this is what this app is built to curate
  pebbleStopSets: [
    {
      "name": "Going Home",
      "routeStops": [
        {
          "route": "1_100143",
          "stop": "1_840",
          "manualOffset": "0"
        },
        {
          "route": "1_100148",
          "stop": "1_840",
          "manualOffset": "0"
        }
      ]
    }
  ]
}
