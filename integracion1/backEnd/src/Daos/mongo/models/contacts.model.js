const { Schema, model } = require("mongoose")

const ContactCollection = "contacts"

const ContactSchema = Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  active: Boolean,
  phone: String,
})

let contactsModel = model(ContactCollection, ContactSchema)

module.exports = {
  contactsModel,
}
