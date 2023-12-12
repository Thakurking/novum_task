
# NOVUM TASK



## Documentation

There are three folders which have all the files needed for the project.
### Database
Used Mongo databse for saving the machine info.
### node-backend
A simple node express server which runs on port 5000.
It has two express API, One for fetching the machine data another one for upserting the machine info.
```bash
    cd novum_task
    cd node-backend
    npm install
    npm start
```
In order to see the data machine info we can just call the API in postman or in our web browser with - ```http://localhost:5000/machine-info``` it's a get API.
It will return a HTML file which will show the list of machine info.
### node-service
There is a simple scanner.js file in this folder project which uses the js-yaml npm package to read the docker-compose file and sends required details to the node-backend API. which saves the machine info.
The particular file can be added to the target machine where the docker compose file is located and it can be run using -
```bash
    node scanner.js
```


## Tech Stack

**Server:** Node, Express
**Database:** MongoDB

