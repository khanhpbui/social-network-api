const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThoughts, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the user
  let users = [];


  // Loop 5 times
  for (let i = 0; i < 5; i++) {
    
    const username = getRandomUsername();
    const email = `${username}@test.com`;

    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  // await Thought.collection.insertOne(thoughts);

  // // Log out the seed data to indicate what should appear in the database
  console.table(users);
  // console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
