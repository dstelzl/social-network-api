const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    console.log('you hit the get all user route');
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    console.log('you hit the get single user route');
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    console.log('you hit the create user route');
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((deletedUser) =>
        !deletedUser
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(deletedUser)
      )
      .catch((err) => res.status(500).json(err));
  },

  // async deleteUser(req, res) {
  //   try {
  //     const deletedUser = await User.findByIdAndDelete(req.params.userId);

  //     !deletedUser
  //       ? res.status(404).json({ message: 'No user with that ID' })
  //       : res.json(deletedUser);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },

  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })

      .then((userData) => {
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )

      .then((userData) => {
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    console.log('you made it to the delete friend');
    res.json('deleted friend');
  },
};
