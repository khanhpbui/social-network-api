const names = [
  "Aaron",
  "Aaryan",
  "Aaryn",
  "Ava",
  "Olivia",
  "Emma",
  "Charlotte",
  "Amelia",
  "Sophia",
  "James",
  "William",
  "Glenn",
  "Lee",
  "Silas",
  "Leo",
  "Caleb",
  "Harvey",
  "Smith",
  "Jones",
  "Coollastname",
  "Oscar",
  "Ze",
  "Allen",
  "Atticus",
  "Basil",
  "Cassius",
  "Cecil",
  "Zen",
  "Clifford",
  "Jared",
];

const thoughts = [
  "You are braver than you believe, and stronger than you seem, and smarter than you think.",
  "Keep your face to the sunshine and you cannot see a shadow.",
  "Positive anything is better than negative nothing.",
  "The only time you fail is when you fall down and stay down.",
  "Happiness is an attitude. We either make ourselves miserable, or happy and strong. The amount of work is the same.",
  "It is not whether you get knocked down, it is whether you get up.",
  "The struggle you are in today is developing the strength you need tomorrow.",
  "The happiness of your life depends upon the quality of your thoughts.",
  "The good life is a process, not a state of being. It is a direction, not a destination.",
  "The more you praise and celebrate your life, the more there is in life to celebrate.",
  "If you want light to come into your life, you need to stand where it is shining.",
  "A truly happy person is one who can enjoy the scenery while on a detour.",
  "You are never too old to set another goal or dream a new dream.",
  "Every day may not be good… but there is something good in every day.",
  "Be so happy that, when other people look at you, they become happy too.",
  "No one is perfect – that is why pencils have erasers.",
  "The difference between ordinary and extraordinary is that little extra.",
  "Wherever you go, no matter what the weather, always bring your own sunshine.",
];

const reactions = [
  "Love",
  "Awe",
  "Excitement",
  "Delight",
  "Astonishment",
  "Happy",
  "Pleased",
  "Content",
  "Relaxed",
  "Calm",
  "Interested",
  "Inspired",
  "Proud",
  "Attentive"
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(names)}.${getRandomArrItem(names)}`;

// Function to generate random thoughts
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      username: getRandomUsername(),
      reactions: [...getRandomReactions(5)],
    });
  }
  return results;
};

// Function to generate random reactions
const getRandomReactions = (int) => {
  
  if (int === 1) {
    return getRandomArrItem(reactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomUsername(),
    });
  }
  return results;
}

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughts, getRandomReactions };
