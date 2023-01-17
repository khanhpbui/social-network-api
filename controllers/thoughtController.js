const { User, Thought } = require("../models");

module.exports = {
  // /api/thoughts

  // GET to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

  //create new thought with create method
  //find userId by username from req.body and update thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user with this id but thought is deleted!" })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // /api/thoughts/:thoughtId/reactions

  // POST to create a reaction stored in a single thought's reactions array field
  createThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $addToSet: { reactions: req.params.body } },
        { new: true }
    )
    // Create Reaction
    //Push that reaction to req.params.thoughtId
    .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Reaction created but no thought with this id!" })
          : res.json({ message: "Reaction successfully created!" })
      )
      .catch((err) => res.status(500).json(err));

  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {

  }
};
