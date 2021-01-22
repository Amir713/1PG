const backgroundURLs = [
  'https://cdn.pixabay.com/photo/2020/12/03/16/58/sunset-5801050_960_720.jpg',
  'https://cdn.pixabay.com/photo/2020/05/31/15/58/sea-5243072_960_720.jpg',
  'https://cdn.pixabay.com/photo/2019/12/15/09/16/blue-4696630_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/03/27/07/32/light-1282314_960_720.jpg'
];

const colors = [
  '#123456',
  '#289374',
  '#093248',
  '#943853',

  '#293870',
  '#219837',
  '#945837',
  '#2948772',
];

function getRandom(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index]; 
}

module.exports = [
  {
    name: 'Random Color',
    description: 'Set primary, and secondary profile card colors.',
    cost: 2000,
    execute: (savedUser) => {
      savedUser.profile.colors = {
        primary: getRandom(colors),
        secondary: getRandom(colors)
      }
      return savedUser.save();
    }
  },
  {
    name: 'Random Background',
    description: 'Unlock ability to customize background to any URL.',
    cost: 2500,
    execute: (savedUser) => {
      savedUser.profile.backgroundURL = getRandom(backgroundURLs);
      return savedUser.save();
    }
  },
  {
    name: 'Random Everything',
    description: 'Randomize profile card. This item can only be used once.',
    cost: 3500,
    execute: (savedUser) => {
      savedUser.profile.colors = {
        primary: getRandom(colors),
        secondary: getRandom(colors)
      }
      savedUser.profile.backgroundURL = getRandom(backgroundURLs);
      return savedUser.save();
    }
  }
];