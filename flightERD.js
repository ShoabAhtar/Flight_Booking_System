// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table User{
    id String
    userName String
    password String
    email  String 
    role String

}
  
  Table Flights {
    id String
    admin_id String
    flightNumber String 
    originAirport String
    destinationAirport String
    departureTime date
    arrivalTime date
    price  Number
    currency String
}
  
  Table bookings {
    _id ObjectId 
    user_id ObjectId
    flightNumber String
    passsportNum String
    createdAt date
}
  
  Table Passenger {
    _id ObjectId 
    name String
    DOB String
    passsportNum String
    phoneNo String
    address String
}

Ref: "bookings"."flightNumber" - "Flights"."id"

Ref: "User"."id" < "Flights"."admin_id"

Ref: "bookings"."user_id" > "User"."id"

Ref: "bookings"."passsportNum" < "Passenger"."_id"