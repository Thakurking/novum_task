
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
### node-service
There is a simple scanner.js file in this folder project which uses the js-yaml npm package to read all the docker-compose file and sends it to the node-backend API. which saves the machine info.
The particular file can be added to the target machine where the docker compose file is there and it can be run using -
```bash
    node scanner.js
```


## Tech Stack

**Server:** Node, Express
**Database:** MongoDB

