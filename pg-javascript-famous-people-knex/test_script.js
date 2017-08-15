const pg = require("pg")
const settings = require("./settings") // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
})



const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
})





client.connect((err) => {
  if (err) {
    return console.error("Database Connection Error", err)
  }

  knex.select('*').from('famous_people')
    .then(function(rows) {
      if (rows !== 0){
        for (let index in rows) {
          let result = rows[index]
          let id    = result.id
          let fname = result.first_name
          let lname = result.last_name
          let bdate = result.birthdate

          console.log(`- ${id}: ${fname} ${lname}, born ${bdate}`)

        }
      } else {
        console.log('No result found')
      }
      client.end();
    })
    .catch(function(error) {
      client.end();
      console.error(error)
    })

})