
const mysql = require('mysql')
const BaseModel = require('./base');
class Register {
  async create (nameUser,city,restroom,wc,price,description){
    const sql='insert into  homestay(name,city,bedrooms,price,bathrooms,description) value' +
        ' (nameUser,city,restroom,price,wc,description)'
    return BaseModel.querySql(sql)
  }
}
module.exports = new Register()