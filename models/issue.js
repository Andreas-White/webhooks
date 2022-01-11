import mongoose from 'mongoose'

const Schema = mongoose.Schema

const issueSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'The password must be at least 10 characters long'],
  },
})

const Issue = mongoose.model('Issue', issueSchema)

export default {
  Issue,
}
