const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addThoughtReaction,
  removeThoughtReaction,
} = require('../../controllers/thoughtController');


router.route('/').get(getThoughts).post(createThought);


router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


router.route('/:thoughtId/responses').post(addThoughtReaction);


router.route('/:thoughtId/responses/:responseId').delete(removeThoughtReaction);

module.exports = router;
