## Shortcuts for Demo

### Mutations

#### Create Dealership
```
mutation($createDealershipInput:CreateDealershipInput!) {
  createDealership(input:$createDealershipInput) {
    dealership {
      nodeId
      id
      name
      createdAt
    }
  }
}

{
  "createDealershipInput": {
    "dealership": {
      "name": "Fields"
    }
  }
}
```

#### Create Vehicle
```
mutation($createVehicleInput:CreateVehicleInput!) {
  createVehicle(input:$createVehicleInput) {
    vehicle {
      nodeId
      id
      dealerId
      manufacturer
      model
      imageUri
      description
      price
      createdAt
    }
  }
}

{
  "createVehicleInput": {
    "vehicle": {
      "dealerId": 1,
      "manufacturer": "Ford",
      "model": "Raptor",
      "imageUri": "https://ford.to/2SpfOvF",
      "description": "Today’s leaner, meaner 2019 Raptor is nearly 500 lbs. lighter than the previous generation with its high-strength, military-grade, aluminum-alloy body",
      "price": "$52,855"
    }
  }
}
```

#### Update Vehicle
```
mutation($updateVehicleInput:UpdateVehicleInput!) {
  updateVehicle(input:$updateVehicleInput) {
    vehicle {
      nodeId
      id
      dealerId
      manufacturer
      model
      imageUri
      description
      price
      createdAt
    }
  }
}

{
  "updateVehicleInput": {
    "nodeId": WyJ2ZWhpY2xlcyIsMV0=,
    "vehiclePatch": {
      "model": "Raptor"
    }
  }
}
```

### Query

#### All Dealerships
```
query {
  allDealerships {
    nodes {
      nodeId
      id
      name
      createdAt
    }
  }
}
```

#### All Dealerships w/ Pagination and Vehicles
```
query {
  allDealerships {
    edges {
      node {
        nodeId
        id
        name
        vehiclesByDealerId {
          edges {
            node {
              nodeId
              id
              manufacturer
              model
              imageUri
              description
            }
          }
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

#### All Vehicles
```
query {
  allVehicles {
    nodes {
      nodeId
      id
      model
    }
  }
}
```

#### Delete Vehicle
```
mutation($deleteVehicleInput:DeleteVehicleInput!) {
  deleteVehicle(input:$deleteVehicleInput) {
    deletedVehicleId
  }
}

{
  "deleteVehicleInput": {
    "nodeId": "WyJ2ZWhpY2xlcyIsMV0"
  }
}
```
