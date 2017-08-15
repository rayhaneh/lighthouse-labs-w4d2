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
const moment = require('moment');




const addPerson = function (fname, lname, bdate, callback) {
  let newPerson = {
    first_name : fname,
    last_name  : lname,
    birthdate  : bdate
  }
  knex.insert(newPerson).into('famous_people')
    .then((err) =>  {
      return callback(null)
    })
    .catch((err) =>  {
      return callback(err)
      knex.destroy()
    })
    .then((err) => {
      knex.destroy()
    })
}


const printAllPeople = function (callback){
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
      }
      else {
        console.log('No result found')
      }
      callback(null)
    })
    .then(function() {
      // close connection
    })
    .catch(function(err) {
      callback(err)
      // close connection
    })
}


module.exports = {
  addPerson      : addPerson,
  printAllPeople : printAllPeople
}
