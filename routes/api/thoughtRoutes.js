const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createThoughtReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(createThoughtReaction);


module.exports = router;