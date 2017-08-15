const moment = require('moment');
const settings = require("./settings") // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
})






  knex.select('*').from('famous_people')
    .then(function(rows) {
      if (rows !== 0){
        for (let index in rows) {
          let result = rows[index]
          let id    = result.id
          let fname = result.first_name
          let lname = result.last_name
          let bdate = moment(result.birthdate).format('YYYY-MM-DD')

          console.log(`- ${id}: ${fname} ${lname}, born ${bdate}`)

        }
      } else {
        console.log('No result found')
      }
      // knex.close()
      // knex.disconnect()
    })
    .catch(function(error) {
      console.error(error)
      // knex.close()
      // knex.disconnect()
    })

