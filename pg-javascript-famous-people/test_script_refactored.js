const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
})

client.connect((err) => {
  if (err) {
    return console.error("Database Connection Error", err)
  }

  // Define the query
  let query = `SELECT * FROM famous_people
               WHERE first_name = $1 OR last_name = $1`


  // Run the query
  client.query(query, [process.argv[2]], (err, result) => {
    if (err) {
      return printResults(err)
    }
    return printResults(err, result.rows)
    client.end();
  })


  // Print the results
  function printResults (err,result) {
    if (err) {
      console.error("error running query", err)
    }
    else if (result.length !== 0){
      for (let index in result) {

        let id    = result[index].id
        let fname = result[index].first_name
        let lname = result[index].last_name
        let bdate = result[index].birthdate

        console.log(`- ${id}: ${fname} ${lname}, born ${bdate}`)

      }
    }
    else {
      console.log('No result found')
    }
  }


})