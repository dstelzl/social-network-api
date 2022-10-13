const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String, 
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Email is not valid' ]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    },]
  },
  {
    
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// thoughtSchema
// .virtual('getReactions')
// .get(function () {
//   return this.reactions.length;
// });
const User = model('User', userSchema);

module.exports = User;
