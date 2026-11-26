/* Rumi's Alphabet Stage - all learning content lives here. */

const CHILD_NAME = 'Abby';

const ALPHABET = [
  { letter: 'A', emoji: '🍎', word: 'Apple', more: [{ word: 'Ant', emoji: '🐜' }, { word: 'Astronaut', emoji: '👨‍🚀' }] },
  { letter: 'B', emoji: '⚽', word: 'Ball', more: [{ word: 'Bear', emoji: '🐻' }, { word: 'Banana', emoji: '🍌' }] },
  { letter: 'C', emoji: '🐱', word: 'Cat', more: [{ word: 'Car', emoji: '🚗' }, { word: 'Cake', emoji: '🍰' }] },
  { letter: 'D', emoji: '🐶', word: 'Dog', more: [{ word: 'Duck', emoji: '🦆' }, { word: 'Dolphin', emoji: '🐬' }] },
  { letter: 'E', emoji: '🐘', word: 'Elephant', more: [{ word: 'Egg', emoji: '🥚' }, { word: 'Eagle', emoji: '🦅' }] },
  { letter: 'F', emoji: '🐟', word: 'Fish', more: [{ word: 'Frog', emoji: '🐸' }, { word: 'Flower', emoji: '🌸' }] },
  { letter: 'G', emoji: '🎸', word: 'Guitar', more: [{ word: 'Grapes', emoji: '🍇' }, { word: 'Giraffe', emoji: '🦒' }] },
  { letter: 'H', emoji: '🏠', word: 'House', more: [{ word: 'Hat', emoji: '🎩' }, { word: 'Horse', emoji: '🐴' }] },
  { letter: 'I', emoji: '🍦', word: 'Ice cream', more: [{ word: 'Igloo', emoji: '🧊' }, { word: 'Island', emoji: '🏝️' }] },
  { letter: 'J', emoji: '🧃', word: 'Juice', more: [{ word: 'Jacket', emoji: '🧥' }, { word: 'Jaguar', emoji: '🐆' }] },
  { letter: 'K', emoji: '🪁', word: 'Kite', more: [{ word: 'Koala', emoji: '🐨' }, { word: 'Key', emoji: '🔑' }] },
  { letter: 'L', emoji: '🦁', word: 'Lion', more: [{ word: 'Lemon', emoji: '🍋' }, { word: 'Ladybug', emoji: '🐞' }] },
  { letter: 'M', emoji: '🌙', word: 'Moon', more: [{ word: 'Monkey', emoji: '🐵' }, { word: 'Mushroom', emoji: '🍄' }] },
  { letter: 'N', emoji: '🍜', word: 'Noodles', more: [{ word: 'Nest', emoji: '🪺' }, { word: 'Nurse', emoji: '👩‍⚕️' }] },
  { letter: 'O', emoji: '🍊', word: 'Orange', more: [{ word: 'Owl', emoji: '🦉' }, { word: 'Octopus', emoji: '🐙' }] },
  { letter: 'P', emoji: '🐧', word: 'Penguin', more: [{ word: 'Pizza', emoji: '🍕' }, { word: 'Panda', emoji: '🐼' }] },
  { letter: 'Q', emoji: '👑', word: 'Queen', more: [{ word: 'Quilt', emoji: '🧶' }, { word: 'Quail', emoji: '🐤' }] },
  { letter: 'R', emoji: '🌈', word: 'Rainbow', more: [{ word: 'Robot', emoji: '🤖' }, { word: 'Rabbit', emoji: '🐰' }] },
  { letter: 'S', emoji: '⭐', word: 'Star', more: [{ word: 'Sun', emoji: '☀️' }, { word: 'Snake', emoji: '🐍' }] },
  { letter: 'T', emoji: '🧸', word: 'Teddy', more: [{ word: 'Tiger', emoji: '🐯' }, { word: 'Train', emoji: '🚂' }] },
  { letter: 'U', emoji: '☂️', word: 'Umbrella', more: [{ word: 'Unicorn', emoji: '🦄' }, { word: 'Uniform', emoji: '👕' }] },
  { letter: 'V', emoji: '🚐', word: 'Van', more: [{ word: 'Violin', emoji: '🎻' }, { word: 'Volcano', emoji: '🌋' }] },
  { letter: 'W', emoji: '🍉', word: 'Watermelon', more: [{ word: 'Wolf', emoji: '🐺' }, { word: 'Watch', emoji: '⌚' }] },
  { letter: 'X', emoji: '🎼', word: 'Xylophone', more: [{ word: 'X-ray', emoji: '🩻' }, { word: 'Xmas tree', emoji: '🎄' }] },
  { letter: 'Y', emoji: '🪀', word: 'Yoyo', more: [{ word: 'Yacht', emoji: '⛵' }, { word: 'Yellow', emoji: '💛' }] },
  { letter: 'Z', emoji: '🦓', word: 'Zebra', more: [{ word: 'Zipper', emoji: '🤐' }, { word: 'Zucchini', emoji: '🥒' }] }
];

const TILE_COLORS = ['#ff5fb8', '#7b5cff', '#21c9c4', '#ffb02e', '#ff7a59', '#4fa8ff'];

const COLORS = [
  { name: 'Red', hex: '#ff4d5e', emoji: '🍎' },
  { name: 'Orange', hex: '#ff9f2e', emoji: '🍊' },
  { name: 'Yellow', hex: '#ffd93d', emoji: '⭐' },
  { name: 'Green', hex: '#3fd07a', emoji: '🍃' },
  { name: 'Blue', hex: '#3d9bff', emoji: '🌊' },
  { name: 'Purple', hex: '#9a5cff', emoji: '🍇' },
  { name: 'Pink', hex: '#ff6fb5', emoji: '🌸' },
  { name: 'Brown', hex: '#a9663b', emoji: '🍫' },
  { name: 'Black', hex: '#2b2b3d', emoji: '⬛' },
  { name: 'White', hex: '#f2f2f7', emoji: '☁️' },
  { name: 'Gray', hex: '#8c93a8', emoji: '🪨' },
  { name: 'Teal', hex: '#25c4bf', emoji: '🐬' }
];

/* 80 picture words, grouped so the Picture Wall can filter them. */
const WORDS = [
  { word: 'cat', emoji: '🐱', category: 'Animals' },
  { word: 'dog', emoji: '🐶', category: 'Animals' },
  { word: 'fish', emoji: '🐟', category: 'Animals' },
  { word: 'bird', emoji: '🐦', category: 'Animals' },
  { word: 'duck', emoji: '🦆', category: 'Animals' },
  { word: 'frog', emoji: '🐸', category: 'Animals' },
  { word: 'lion', emoji: '🦁', category: 'Animals' },
  { word: 'bear', emoji: '🐻', category: 'Animals' },
  { word: 'monkey', emoji: '🐵', category: 'Animals' },
  { word: 'rabbit', emoji: '🐰', category: 'Animals' },
  { word: 'tiger', emoji: '🐯', category: 'Animals' },
  { word: 'panda', emoji: '🐼', category: 'Animals' },
  { word: 'horse', emoji: '🐴', category: 'Animals' },
  { word: 'cow', emoji: '🐮', category: 'Animals' },
  { word: 'pig', emoji: '🐷', category: 'Animals' },
  { word: 'sheep', emoji: '🐑', category: 'Animals' },

  { word: 'apple', emoji: '🍎', category: 'Food' },
  { word: 'banana', emoji: '🍌', category: 'Food' },
  { word: 'cake', emoji: '🍰', category: 'Food' },
  { word: 'bread', emoji: '🍞', category: 'Food' },
  { word: 'milk', emoji: '🥛', category: 'Food' },
  { word: 'juice', emoji: '🧃', category: 'Food' },
  { word: 'pizza', emoji: '🍕', category: 'Food' },
  { word: 'egg', emoji: '🥚', category: 'Food' },
  { word: 'cheese', emoji: '🧀', category: 'Food' },
  { word: 'grape', emoji: '🍇', category: 'Food' },
  { word: 'lemon', emoji: '🍋', category: 'Food' },
  { word: 'orange', emoji: '🍊', category: 'Food' },
  { word: 'cookie', emoji: '🍪', category: 'Food' },
  { word: 'rice', emoji: '🍚', category: 'Food' },
  { word: 'soup', emoji: '🍲', category: 'Food' },
  { word: 'ice cream', emoji: '🍦', category: 'Food' },

  { word: 'sun', emoji: '☀️', category: 'Nature' },
  { word: 'moon', emoji: '🌙', category: 'Nature' },
  { word: 'star', emoji: '⭐', category: 'Nature' },
  { word: 'tree', emoji: '🌳', category: 'Nature' },
  { word: 'flower', emoji: '🌸', category: 'Nature' },
  { word: 'rainbow', emoji: '🌈', category: 'Nature' },
  { word: 'cloud', emoji: '☁️', category: 'Nature' },
  { word: 'rain', emoji: '🌧️', category: 'Nature' },
  { word: 'snow', emoji: '❄️', category: 'Nature' },
  { word: 'mountain', emoji: '⛰️', category: 'Nature' },
  { word: 'sea', emoji: '🌊', category: 'Nature' },
  { word: 'fire', emoji: '🔥', category: 'Nature' },
  { word: 'leaf', emoji: '🍃', category: 'Nature' },
  { word: 'seed', emoji: '🌰', category: 'Nature' },
  { word: 'rock', emoji: '🪨', category: 'Nature' },
  { word: 'sky', emoji: '🌌', category: 'Nature' },

  { word: 'ball', emoji: '⚽', category: 'Things' },
  { word: 'hat', emoji: '🎩', category: 'Things' },
  { word: 'book', emoji: '📕', category: 'Things' },
  { word: 'key', emoji: '🔑', category: 'Things' },
  { word: 'cup', emoji: '🥤', category: 'Things' },
  { word: 'bed', emoji: '🛏️', category: 'Things' },
  { word: 'chair', emoji: '🪑', category: 'Things' },
  { word: 'door', emoji: '🚪', category: 'Things' },
  { word: 'lamp', emoji: '💡', category: 'Things' },
  { word: 'bag', emoji: '👜', category: 'Things' },
  { word: 'phone', emoji: '📱', category: 'Things' },
  { word: 'clock', emoji: '⌚', category: 'Things' },
  { word: 'toy', emoji: '🧸', category: 'Things' },
  { word: 'pen', emoji: '🖊️', category: 'Things' },
  { word: 'box', emoji: '📦', category: 'Things' },
  { word: 'brush', emoji: '🖌️', category: 'Things' },

  { word: 'car', emoji: '🚗', category: 'Vehicles' },
  { word: 'bus', emoji: '🚌', category: 'Vehicles' },
  { word: 'bike', emoji: '🚲', category: 'Vehicles' },
  { word: 'train', emoji: '🚂', category: 'Vehicles' },
  { word: 'plane', emoji: '✈️', category: 'Vehicles' },
  { word: 'boat', emoji: '⛵', category: 'Vehicles' },
  { word: 'truck', emoji: '🚚', category: 'Vehicles' },
  { word: 'taxi', emoji: '🚕', category: 'Vehicles' },
  { word: 'van', emoji: '🚐', category: 'Vehicles' },
  { word: 'rocket', emoji: '🚀', category: 'Vehicles' },
  { word: 'scooter', emoji: '🛴', category: 'Vehicles' },
  { word: 'tractor', emoji: '🚜', category: 'Vehicles' },
  { word: 'ambulance', emoji: '🚑', category: 'Vehicles' },
  { word: 'fire truck', emoji: '🚒', category: 'Vehicles' },
  { word: 'helicopter', emoji: '🚁', category: 'Vehicles' },
  { word: 'submarine', emoji: '🛳️', category: 'Vehicles' }
];

/* 50 spelling words: 20 three-letter, 20 four-letter, 10 five-letter. */
const SPELL_WORDS = [
  { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' },
  { word: 'sun', emoji: '☀️' }, { word: 'hat', emoji: '🎩' },
  { word: 'pen', emoji: '🖊️' }, { word: 'bus', emoji: '🚌' },
  { word: 'cup', emoji: '🥤' }, { word: 'pig', emoji: '🐷' },
  { word: 'bed', emoji: '🛏️' }, { word: 'fox', emoji: '🦊' },
  { word: 'cow', emoji: '🐮' }, { word: 'bee', emoji: '🐝' },
  { word: 'ant', emoji: '🐜' }, { word: 'egg', emoji: '🥚' },
  { word: 'owl', emoji: '🦉' }, { word: 'bat', emoji: '🦇' },
  { word: 'rat', emoji: '🐀' }, { word: 'hen', emoji: '🐔' },
  { word: 'toy', emoji: '🧸' }, { word: 'jar', emoji: '🫙' },

  { word: 'bird', emoji: '🐦' }, { word: 'fish', emoji: '🐟' },
  { word: 'duck', emoji: '🦆' }, { word: 'frog', emoji: '🐸' },
  { word: 'book', emoji: '📕' }, { word: 'cake', emoji: '🍰' },
  { word: 'ball', emoji: '⚽' }, { word: 'tree', emoji: '🌳' },
  { word: 'moon', emoji: '🌙' }, { word: 'star', emoji: '⭐' },
  { word: 'lion', emoji: '🦁' }, { word: 'bear', emoji: '🐻' },
  { word: 'door', emoji: '🚪' }, { word: 'lamp', emoji: '💡' },
  { word: 'milk', emoji: '🥛' }, { word: 'rice', emoji: '🍚' },
  { word: 'soup', emoji: '🍲' }, { word: 'boat', emoji: '⛵' },
  { word: 'bike', emoji: '🚲' }, { word: 'rain', emoji: '🌧️' },

  { word: 'apple', emoji: '🍎' }, { word: 'grape', emoji: '🍇' },
  { word: 'lemon', emoji: '🍋' }, { word: 'bread', emoji: '🍞' },
  { word: 'cloud', emoji: '☁️' }, { word: 'house', emoji: '🏠' },
  { word: 'horse', emoji: '🐴' }, { word: 'train', emoji: '🚂' },
  { word: 'plane', emoji: '✈️' }, { word: 'water', emoji: '💧' }
];

const PRAISE = [
  `Amazing, ${CHILD_NAME}!`,
  `Super star, ${CHILD_NAME}!`,
  `You got it, ${CHILD_NAME}!`,
  `Brilliant, ${CHILD_NAME}!`,
  `Way to shine, ${CHILD_NAME}!`,
  `Great job, ${CHILD_NAME}!`,
  `Rumi is so proud of you, ${CHILD_NAME}!`,
  `Wow, ${CHILD_NAME}! Perfect!`,
  `You did it, ${CHILD_NAME}!`,
  `${CHILD_NAME}, you're a superstar!`
];

const TRY_AGAIN = [
  `Almost, ${CHILD_NAME}! Try again!`,
  `You can do it, ${CHILD_NAME}!`,
  `Good try, ${CHILD_NAME}. Let's try again!`,
  `One more time, ${CHILD_NAME}!`,
  `Rumi believes in you, ${CHILD_NAME}!`
];

const GREETINGS = [
  `Hi ${CHILD_NAME}! I'm Rumi! Let's play and learn!`,
  `Hey ${CHILD_NAME}, super star! Ready to shine?`,
  `Hello ${CHILD_NAME}! Your stage is ready!`,
  `Hi ${CHILD_NAME}! Rumi saved you a spot on stage!`
];

const HOME_TIPS = [
  `${CHILD_NAME}, tap a letter to hear it sing!`,
  `Can you find the purple star, ${CHILD_NAME}?`,
  `${CHILD_NAME}, let's build a little word!`,
  `Rumi is waiting for you, ${CHILD_NAME}!`,
  `${CHILD_NAME}, pick a game and let's shine!`,
  `There are 80 pictures on your wall, ${CHILD_NAME}!`,
  `${CHILD_NAME}, your coloring book has 120 pages!`,
  `${CHILD_NAME}, Rumi's move parade is right at the bottom!`
];

/* Body moves for the First -> Next -> Then mini-game. */
const MOVES = [
  { emoji: '👏', label: 'Clap your hands', say: 'Clap your hands' },
  { emoji: '🦘', label: 'Jump up high', say: 'Jump up high' },
  { emoji: '👃', label: 'Touch your nose', say: 'Touch your nose' },
  { emoji: '🙌', label: 'Reach up high', say: 'Reach up high' },
  { emoji: '🦶', label: 'Stomp your foot', say: 'Stomp your foot' },
  { emoji: '🌀', label: 'Spin around', say: 'Spin around' },
  { emoji: '🪑', label: 'Sit down', say: 'Sit down' },
  { emoji: '🧍', label: 'Stand up', say: 'Stand up' },
  { emoji: '🙆', label: 'Wave your arms', say: 'Wave your arms' },

  { emoji: '👋', label: 'Wave hello', say: 'Wave hello' },
  { emoji: '🤗', label: 'Give a big hug', say: 'Give yourself a big hug' },
  { emoji: '😁', label: 'Smile big', say: 'Smile big' },
  { emoji: '👀', label: 'Blink your eyes', say: 'Blink your eyes' },
  { emoji: '🤚', label: 'Wiggle your fingers', say: 'Wiggle your fingers' },
  { emoji: '🦵', label: 'Tap your knees', say: 'Tap your knees' },
  { emoji: '💪', label: 'Touch your shoulders', say: 'Touch your shoulders' },
  { emoji: '👆', label: 'Point up high', say: 'Point up high' },
  { emoji: '👇', label: 'Point down low', say: 'Point down low' },
  { emoji: '🦶', label: 'Touch your toes', say: 'Touch your toes' },
  { emoji: '🚶', label: 'March in place', say: 'March in place' },
  { emoji: '🕺', label: 'Dance around', say: 'Dance around' },
  { emoji: '✨', label: 'Make a star shape', say: 'Make a star shape' },
  { emoji: '🐦', label: 'Flap like a bird', say: 'Flap your wings like a bird' },
  { emoji: '🦁', label: 'Roar like a lion', say: 'Roar like a lion' },
  { emoji: '🐱', label: 'Meow like a cat', say: 'Meow like a cat' },
  { emoji: '🦖', label: 'Stomp like a dinosaur', say: 'Stomp like a dinosaur' },
  { emoji: '🤫', label: 'Tiptoe quietly', say: 'Tiptoe quietly' },
  { emoji: '🙅', label: 'Cross your arms', say: 'Cross your arms' },
  { emoji: '😘', label: 'Blow a kiss', say: 'Blow a kiss' }
];

const MOVE_ORDER = ['First', 'Next', 'Then'];

/* Quest Map: each activity has a badge and a gentle goal. */
const QUESTS = [
  { id: 'alpha', emoji: '🔤', title: 'Letter Stage', sub: 'Meet the alphabet', view: 'alpha', goal: 26, badge: '🌱', source: 'letters' },
  { id: 'color', emoji: '🌈', title: 'Color Spotlight', sub: 'Find every color', view: 'color', goal: 12, badge: '🎨', source: 'colors' },
  { id: 'word', emoji: '🐱', title: 'Word Match', sub: 'Match 20 pictures', view: 'word', goal: 20, badge: '📖', source: 'words' },
  { id: 'spell', emoji: '🧩', title: 'Spell It!', sub: 'Build 10 words', view: 'spell', goal: 10, badge: '🧠', source: 'spells' },
  { id: 'wall', emoji: '🖼️', title: 'Picture Wall', sub: 'Explore 80 pictures', view: 'wall', goal: 20, badge: '🖼️', source: 'wall' },
  { id: 'coloring', emoji: '🖍️', title: 'Coloring Book', sub: 'Save 10 pages', view: 'coloring', goal: 10, badge: '🖍️', source: 'coloring' },
  { id: 'move', emoji: '💃', title: 'Move Parade', sub: 'Do 10 moves', view: 'move', goal: 10, badge: '⭐', source: 'moves' }
];

const LETTER_BANK = 'abcdefghijklmnopqrstuvwxyz'.split('');
