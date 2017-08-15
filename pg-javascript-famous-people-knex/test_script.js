const dataHelpers = require('./data_helpers')



dataHelpers.addPerson ('Andy', 'Anderson', '2010-10-10', (err) => {
  if (err) {
    console.log(err)
  }
  dataHelpers.printAllPeople((err) => {
    if (err) {
      console.log(err)
    }
  })
})

