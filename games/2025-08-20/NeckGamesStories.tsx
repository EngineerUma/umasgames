import React, { useState, useEffect } from 'react';
import { BookOpen, Gamepad2, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, CheckCircle, Star } from 'lucide-react';

const NeckGamesStories = () => {
  const [activeTab, setActiveTab] = useState('simon-says');
  const [currentStory, setCurrentStory] = useState(0);
  
  // Interactive Animal Pose Challenge states
  const [isPlayingAnimalGame, setIsPlayingAnimalGame] = useState(false);
  const [currentPose, setCurrentPose] = useState(0);
  const [poseTimer, setPoseTimer] = useState(15);
  const [completedPoses, setCompletedPoses] = useState([]);
  const [gamePhase, setGamePhase] = useState('ready'); // ready, playing, completed

  const games = [
    {
      id: "simon-says",
      name: "Simon Says Neck Edition",
      description: "Play Simon Says with neck-friendly moves!",
      instructions: [
        "Simon says turn your head left!",
        "Simon says roll your shoulders back!",
        "Simon says look up at the ceiling!",
        "Touch your toes! (Don't do it - Simon didn't say!)",
        "Simon says make a gentle chin tuck!"
      ],
      emoji: "🎮"
    },
    {
      id: "animal-challenge",
      name: "Animal Pose Challenge",
      description: "Can you copy these animal poses?",
      instructions: [
        "🦒 Tall Giraffe: Stand super tall and look up high",
        "🐢 Turtle: Pull your chin back into your 'shell'",
        "🦅 Eagle: Roll your shoulders back and spread them wide",
        "🐍 Snake: Slowly move your head side to side",
        "🦢 Swan: Gracefully stretch your neck up long"
      ],
      emoji: "🎪",
      isInteractive: true
    },
    {
      id: "neck-detective",
      name: "Neck Detective",
      description: "Find the clues by moving your neck!",
      instructions: [
        "🔍 Look left - Can you spot the hidden treasure?",
        "🔍 Look right - What's lurking in the shadows?",
        "🔍 Look up - Is there something in the clouds?",
        "🔍 Look down carefully - Any footprints on the ground?",
        "🔍 Circle look - Scan all around like a detective!"
      ],
      emoji: "🕵️"
    },
    {
      id: "magical-mirror",
      name: "Magical Mirror",
      description: "Copy the mirror's magic movements!",
      instructions: [
        "✨ Mirror shows: Gentle head nod like saying 'yes'",
        "✨ Mirror shows: Shoulder shrug like asking 'maybe?'",
        "✨ Mirror shows: Head tilt like a curious puppy",
        "✨ Mirror shows: Slow shoulder rolls like casting spells",
        "✨ Mirror shows: Graceful neck stretch like a dancing fairy"
      ],
      emoji: "🪞"
    },
    {
      id: "robot-human",
      name: "Robot vs Human",
      description: "Move smoothly like a human, not jerky like a robot!",
      instructions: [
        "🤖 Robot move: Jerky head turn (DON'T do this!)",
        "👤 Human move: Smooth, flowing head turn (DO this!)",
        "🤖 Robot move: Sharp shoulder jerk (DON'T do this!)",
        "👤 Human move: Gentle shoulder roll (DO this!)",
        "🤖 vs 👤: Practice smooth, human-like movements!"
      ],
      emoji: "🤖"
    },
    {
      id: "weather-reporter",
      name: "Weather Reporter",
      description: "Be a TV weather person pointing at the sky!",
      instructions: [
        "☀️ Point to the sunny sky (look up and point right)",
        "⛅ Show the clouds moving (gentle head tracking left to right)",
        "🌧️ Look for rain coming (tilt head and look around)",
        "🌈 Spot the rainbow (look up and smile big)",
        "📺 Wave goodbye to viewers (gentle shoulder and neck wave)"
      ],
      emoji: "📺"
    },
    {
      id: "sleepy-stretches",
      name: "Sleepy Stretches",
      description: "Gentle moves like a cat waking up from a nap!",
      instructions: [
        "😴 Yawn and stretch like you just woke up",
        "🐱 Arch your neck gently like a stretching cat",
        "🥱 Roll your shoulders like shaking off sleepiness",
        "😌 Look around slowly like checking your surroundings",
        "☺️ Gentle head nods like saying 'good morning!'"
      ],
      emoji: "😴"
    },
    {
      id: "space-explorer",
      name: "Space Explorer",
      description: "Look around for aliens and planets!",
      instructions: [
        "🚀 Scan left for alien spaceships (slow head turn)",
        "🛸 Look right for flying saucers (gentle neck turn)",
        "🌟 Gaze up at distant stars (careful upward look)",
        "🪐 Search for planets below (slight downward glance)",
        "👽 360° space scan (slow, complete head circle)"
      ],
      emoji: "🚀"
    },
    {
      id: "dancing-dj",
      name: "Dancing DJ",
      description: "Move your head and shoulders to the rhythm!",
      instructions: [
        "🎵 Nod your head to the beat (gentle up and down)",
        "🎶 Shoulder bounce to the music (light shoulder lifts)",
        "🎤 Look left and right at your audience",
        "🕺 Smooth neck waves like dancing",
        "🎉 Big finish with gentle head circles!"
      ],
      emoji: "🎵"
    },
    {
      id: "superhero-training",
      name: "Superhero Training",
      description: "Train your neck like a superhero!",
      instructions: [
        "🦸 Hero pose: Stand tall with strong shoulders",
        "👀 Super vision: Look far into the distance",
        "🔄 Power spin: Gentle head turns to scan for danger",
        "💪 Strength stretch: Reach up like flying",
        "⭐ Victory pose: Gentle neck stretch to the sky"
      ],
      emoji: "🦸"
    }
  ];

  const animalPoses = [
    {
      name: "Tall Giraffe",
      emoji: "🦒",
      instruction: "Stand super tall and look up high like reaching for leaves!",
      description: "Giraffes are the tallest animals - stretch your neck up proudly!",
      duration: 15
    },
    {
      name: "Turtle Shell",
      emoji: "🐢",
      instruction: "Pull your chin back into your 'shell' like a shy turtle!",
      description: "Turtles can hide in their shells when they feel scared!",
      duration: 10
    },
    {
      name: "Eagle Wings",
      emoji: "🦅",
      instruction: "Roll your shoulders back and spread them wide like eagle wings!",
      description: "Eagles have powerful wings that help them soar through the sky!",
      duration: 12
    },
    {
      name: "Slithery Snake",
      emoji: "🐍",
      instruction: "Slowly move your head side to side like a curious snake!",
      description: "Snakes move their heads gracefully to explore their world!",
      duration: 15
    },
    {
      name: "Graceful Swan",
      emoji: "🦢",
      instruction: "Gracefully stretch your neck up long like an elegant swan!",
      description: "Swans have the most beautiful, long necks in the animal kingdom!",
      duration: 12
    }
  ];

  // Timer effect for animal pose game
  useEffect(() => {
    let interval;
    if (isPlayingAnimalGame && poseTimer > 0 && gamePhase === 'playing') {
      interval = setInterval(() => {
        setPoseTimer(poseTimer - 1);
      }, 1000);
    } else if (poseTimer === 0 && isPlayingAnimalGame && gamePhase === 'playing') {
      // Move to next pose
      const newCompletedPoses = [...completedPoses, currentPose];
      setCompletedPoses(newCompletedPoses);
      
      if (currentPose < animalPoses.length - 1) {
        setCurrentPose(currentPose + 1);
        setPoseTimer(animalPoses[currentPose + 1].duration);
      } else {
        // Game completed
        setGamePhase('completed');
        setIsPlayingAnimalGame(false);
      }
    }
    return () => clearInterval(interval);
  }, [isPlayingAnimalGame, poseTimer, gamePhase, currentPose, completedPoses]);

  const startAnimalGame = () => {
    setIsPlayingAnimalGame(true);
    setGamePhase('playing');
    setCurrentPose(0);
    setPoseTimer(animalPoses[0].duration);
    setCompletedPoses([]);
  };

  const pauseAnimalGame = () => {
    setIsPlayingAnimalGame(!isPlayingAnimalGame);
  };

  const resetAnimalGame = () => {
    setIsPlayingAnimalGame(false);
    setGamePhase('ready');
    setCurrentPose(0);
    setPoseTimer(animalPoses[0].duration);
    setCompletedPoses([]);
  };

  const skipPose = () => {
    const newCompletedPoses = [...completedPoses, currentPose];
    setCompletedPoses(newCompletedPoses);
    
    if (currentPose < animalPoses.length - 1) {
      setCurrentPose(currentPose + 1);
      setPoseTimer(animalPoses[currentPose + 1].duration);
    } else {
      setGamePhase('completed');
      setIsPlayingAnimalGame(false);
    }
  };

  const stories = [
    {
      title: "Gerry the Giraffe's Neck Adventure",
      story: "Once upon a time, Gerry the Giraffe spent all day looking down at his tablet. His long neck started to ache! 'Oh no!' said Gerry. His wise friend Ollie the Owl taught him to look up at the clouds, turn his head like he was saying 'no-no' to bad posture, and take breaks to dance around. Soon Gerry's neck felt much better, and he could reach the highest leaves again! 🦒✨",
      emoji: "🦒"
    },
    {
      title: "Super Stretchy Cat's Mission",
      story: "Captain Whiskers was the stretchiest superhero cat in the world! But even superheroes can get neck pain from looking at screens too long. She discovered her special powers: rolling her shoulders like big wheels, tucking her chin like a shy turtle, and reaching for the stars. Now she teaches all the little kittens how to keep their necks happy and strong! 🐱‍🏍️",
      emoji: "🐱"
    },
    {
      title: "The Magic Neck Garden",
      story: "In a secret garden, there grew magical flowers that only bloomed when children did neck exercises. Emma discovered this garden and learned that each gentle head turn made the roses bloom, each shoulder roll made the sunflowers dance, and each sky reach made the clouds form happy faces. The garden taught her that taking care of her neck was like watering beautiful flowers! 🌻",
      emoji: "🌺"
    },
    {
      title: "Danny the Dancing Dragon",
      story: "Danny was a young dragon who loved to play video games all day. But his neck got so stiff, he couldn't breathe fire properly - only little puffs of smoke came out! The wise old dragon taught him the ancient Dragon Neck Dance: graceful head movements, powerful shoulder rolls, and majestic neck stretches. Soon Danny was breathing the most beautiful rainbow fires in all the land! 🐲🌈",
      emoji: "🐲"
    },
    {
      title: "Princess Luna's Stargazing Secret",
      story: "Princess Luna loved looking at the stars, but she always got a crick in her neck from tilting her head back too long. The Moon Fairy taught her a magical secret: take breaks to look around, do gentle neck circles like drawing moons in the air, and stretch like she was reaching for the stars. Now Princess Luna can stargaze all night without any neck pain! 🌙⭐",
      emoji: "🌙"
    },
    {
      title: "Benny the Bear's Computer Cave",
      story: "Benny the Bear had the coolest computer cave in the forest, but he spent so much time coding that his neck felt like a rusty robot! His friend Ruby the Rabbit showed him the 'Forest Stretch' - turning his head like he was looking for honey, rolling his shoulders like shaking off snow, and stretching up like reaching for the tallest tree. Now Benny's cave has the best tech AND the happiest neck! 🐻💻",
      emoji: "🐻"
    },
    {
      title: "The Mermaid's Swimming Lesson",
      story: "Marina the Mermaid spent hours looking down at her underwater phone, texting her fish friends. But her neck started hurting like she'd been caught in seaweed! The wise Sea Turtle taught her the 'Ocean Flow' movements: graceful head turns like swimming through currents, shoulder movements like floating kelp, and neck stretches like reaching for the surface. Now Marina swims beautifully through both water and technology! 🧜‍♀️🌊",
      emoji: "🧜‍♀️"
    },
    {
      title: "Captain Zoom's Racing Adventure",
      story: "Captain Zoom was the fastest race car driver in Speedway City, but always looking at his dashboard made his neck super stiff! His pit crew chief taught him the 'Pit Stop Stretches' - quick head checks like scanning the track, shoulder rolls like shifting gears, and victory stretches like celebrating a win. Now Captain Zoom races with comfort AND speed! 🏁🏎️",
      emoji: "🏎️"
    },
    {
      title: "The Robot's First Feelings",
      story: "Robo-Buddy was built to be the perfect helper robot, but he copied human bad posture and got a 'system error' in his neck circuits! The kind Inventor taught him that even robots need good posture: smooth head movements instead of jerky ones, gentle shoulder adjustments, and regular 'maintenance stretches.' Now Robo-Buddy helps everyone with both chores AND posture! 🤖❤️",
      emoji: "🤖"
    },
    {
      title: "The Wizard's Spell Book Problem",
      story: "Wizard Wiggles loved reading his ancient spell books, but hunching over them all day put a curse on his neck! He couldn't cast spells properly - his magic wand kept pointing the wrong way! The Great Owl Sage taught him the 'Mystic Neck Spell': magical head turns, enchanted shoulder circles, and spells cast while stretching to the sky. Now his magic is more powerful than ever! 🧙‍♂️✨",
      emoji: "🧙‍♂️"
    },
    {
      title: "Penny the Penguin's Ice Skating Dream",
      story: "Penny the Penguin dreamed of becoming an ice skating champion, but she kept looking down at her feet while practicing. This made her neck so stiff that she kept falling over! The elegant Swan taught her to look ahead proudly, do graceful neck movements like a skating routine, and stretch like she was reaching for the ice skating crown. Soon Penny was gliding beautifully across the ice! 🐧⛸️",
      emoji: "🐧"
    },
    {
      title: "The Friendly Giant's Tiny Problem",
      story: "Gilbert the Friendly Giant was so tall that he always had to look down to talk to his small friends. This gave him terrible neck pain! His friend Tiny the Mouse taught him to sit down for conversations, do gentle 'giant-sized' neck stretches, and practice looking at things at his own height like the clouds and treetops. Now Gilbert can be friendly with everyone without any pain! 👨‍🦲🐭",
      emoji: "👥"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Neck Fun Zone
          </h1>
          <p className="text-gray-600">
            Games and stories to keep your neck happy and healthy!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-white rounded-2xl p-2 shadow-lg">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveTab(game.id)}
                className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all font-medium text-xs ${
                  activeTab === game.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="text-lg mb-1">{game.emoji}</span>
                <span className="text-center leading-tight">{game.name}</span>
              </button>
            ))}
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all font-medium text-xs ${
                activeTab === 'stories'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BookOpen className="w-4 h-4 mb-1" />
              <span className="text-center leading-tight">Stories</span>
            </button>
          </div>
        </div>

        {/* Interactive Animal Pose Challenge Tab */}
        {activeTab === 'animal-challenge' && (
          <div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🎪</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Interactive Animal Pose Challenge
              </h2>
              <p className="text-gray-600">
                Follow along with the timer and copy each animal pose!
              </p>
              <button
                onClick={() => setActiveTab('simon-says')}
                className="mt-3 text-purple-500 hover:text-purple-700 text-sm underline"
              >
                ← Back to Other Games
              </button>
            </div>

            {gamePhase === 'ready' && (
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 text-center shadow-lg">
                <div className="text-6xl mb-4">🦒🐢🦅🐍🦢</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Play?</h3>
                <p className="text-gray-600 mb-6">
                  You'll go through 5 different animal poses. Each pose has a timer to help you hold it for the right amount of time!
                </p>
                <button
                  onClick={startAnimalGame}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-lg transition-all"
                >
                  <Play className="w-6 h-6 inline mr-2" />
                  Start Animal Challenge!
                </button>
              </div>
            )}

            {gamePhase === 'playing' && (
              <div className="space-y-6">
                {/* Current Pose Display */}
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 text-center shadow-lg">
                  <div className="text-8xl mb-4">{animalPoses[currentPose].emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {animalPoses[currentPose].name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {animalPoses[currentPose].description}
                  </p>
                  
                  {/* Timer Circle */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white">
                      <span className="text-3xl font-bold">{poseTimer}</span>
                    </div>
                  </div>
                </div>

                {/* Instruction */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Now try this pose:</h4>
                    <p className="text-gray-700 text-lg">
                      {animalPoses[currentPose].instruction}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={pauseAnimalGame}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    {isPlayingAnimalGame ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={skipPose}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Skip Pose →
                  </button>
                  <button
                    onClick={resetAnimalGame}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-center mb-3">
                    <span className="text-gray-600 font-medium">
                      Pose {currentPose + 1} of {animalPoses.length}
                    </span>
                  </div>
                  <div className="flex justify-center space-x-2 mb-3">
                    {animalPoses.map((pose, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          completedPoses.includes(idx) ? 'bg-green-500 text-white' :
                          idx === currentPose ? 'bg-orange-500 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {completedPoses.includes(idx) ? <CheckCircle className="w-4 h-4" /> : pose.emoji}
                      </div>
                    ))}
                  </div>
                  {completedPoses.length > 0 && (
                    <div className="text-center">
                      <span className="text-green-600 font-medium">
                        🎉 {completedPoses.length} pose{completedPoses.length > 1 ? 's' : ''} completed!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {gamePhase === 'completed' && (
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center shadow-lg">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Congratulations!</h3>
                <p className="text-gray-600 mb-6">
                  You completed all 5 animal poses! Your neck should feel amazing now!
                </p>
                <div className="flex justify-center space-x-4 mb-6">
                  {animalPoses.map((pose, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl mb-1">{pose.emoji}</div>
                      <Star className="w-5 h-5 text-yellow-500 mx-auto" />
                    </div>
                  ))}
                </div>
                <div className="space-x-4">
                  <button
                    onClick={resetAnimalGame}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                  >
                    Play Again! 🔄
                  </button>
                  <button
                    onClick={() => setActiveTab('simon-says')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Try Other Games
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Individual Game Sections */}
        {games.map((game) => (
          activeTab === game.id && !game.isInteractive && (
            <div key={game.id}>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{game.emoji}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {game.name}
                </h2>
                <p className="text-gray-600 text-lg">
                  {game.description}
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-2xl p-8 shadow-lg">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">How to Play:</h3>
                  {game.instructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start mb-4 last:mb-0">
                      <span className="text-purple-500 mr-4 font-bold text-xl">{idx + 1}.</span>
                      <span className="text-gray-700 text-lg">{instruction}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Remember!</h4>
                  <p className="text-gray-700">Move slowly, have fun, and stop if anything hurts!</p>
                </div>
              </div>
            </div>
          )
        ))}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Magical Neck Stories
              </h2>
              <p className="text-gray-600">
                Learn about neck care through fun adventures!
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{stories[currentStory].emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {stories[currentStory].title}
                </h3>
              </div>
              
              <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {stories[currentStory].story}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
                  disabled={currentStory === 0}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Previous
                </button>
                <div className="text-center">
                  <span className="text-gray-600 font-medium">
                    {currentStory + 1} of {stories.length}
                  </span>
                  <div className="flex justify-center mt-2 space-x-1">
                    {stories.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentStory ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStory(Math.min(stories.length - 1, currentStory + 1))}
                  disabled={currentStory === stories.length - 1}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-md"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Story Time Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <span className="text-2xl block mb-2">🎭</span>
                  <p className="text-gray-700 text-sm font-medium">Act out the characters while reading!</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="text-2xl block mb-2">🤔</span>
                  <p className="text-gray-700 text-sm font-medium">Think about the neck care lessons!</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="text-2xl block mb-2">📖</span>
                  <p className="text-gray-700 text-sm font-medium">Share stories with friends and family!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-2xl mb-3">🌟</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Remember!</h3>
            <p className="text-gray-600">
              Take breaks, move gently, and have fun keeping your neck healthy!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeckGamesStories;
