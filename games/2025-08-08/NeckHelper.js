import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Star, CheckCircle, AlertTriangle } from 'lucide-react';

const NeckHelperApp = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [activeTab, setActiveTab] = useState('exercises');
  const [currentStory, setCurrentStory] = useState(0);
  const [readStories, setReadStories] = useState([]);
  const [breathingTimer, setBreathingTimer] = useState(4);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [isBreathing, setIsBreathing] = useState(false);
  const [streakDays, setStreakDays] = useState(0);
  const [totalStars, setTotalStars] = useState(0);

  const exercises = [
    {
      name: "Gentle Head Turns",
      description: "Slowly turn your head left and right like you're saying 'no'",
      duration: 15,
      instructions: "Turn your head slowly to the left, hold for 2 seconds, then slowly to the right. Repeat 5 times.",
      emoji: "👈👉"
    },
    {
      name: "Chin Tucks",
      description: "Make a funny double chin by pulling your chin back",
      duration: 10,
      instructions: "Pull your chin back like a turtle going into its shell. Hold for 3 seconds. Repeat 5 times.",
      emoji: "🐢"
    },
    {
      name: "Shoulder Rolls",
      description: "Roll your shoulders like you're drawing big circles",
      duration: 15,
      instructions: "Lift your shoulders up, roll them back, then down and forward. Do 5 circles each direction.",
      emoji: "🔄"
    },
    {
      name: "Sky Reaches",
      description: "Reach up to the clouds and stretch your neck",
      duration: 10,
      instructions: "Reach both arms up high like you're trying to touch the sky. Hold for 5 seconds. Repeat 3 times.",
      emoji: "☁️"
    },
    {
      name: "Ear to Shoulder",
      description: "Try to touch your ear to your shoulder gently",
      duration: 20,
      instructions: "Slowly tilt your head to one side like you're listening to your shoulder. Hold for 5 seconds each side.",
      emoji: "👂"
    }
  ];

  const postureReminders = [
    "Keep your screen at eye level like looking at a friend! 👀",
    "Sit up tall like a proud giraffe! 🦒",
    "Keep both feet on the floor like tree roots! 🌳",
    "Take breaks every 30 minutes to move around! 🏃",
    "Keep your shoulders relaxed, not hunched up! 😌"
  ];

  const painTips = [
    {
      title: "When to Tell a Grown-Up",
      tips: [
        "If your neck hurts for more than a day",
        "If the pain is very strong",
        "If you can't move your neck normally",
        "If you feel dizzy or sick"
      ],
      icon: "🚨"
    },
    {
      title: "Quick Pain Relief",
      tips: [
        "Use a warm, cozy towel on your neck",
        "Ask for a gentle neck massage",
        "Rest and avoid looking down too much",
        "Drink water to stay hydrated"
      ],
      icon: "💙"
    }
  ];

  const funStories = [
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
    }
  ];

  const games = [
    {
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
      name: "Animal Pose Challenge",
      description: "Can you copy these animal poses?",
      instructions: [
        "🦒 Tall Giraffe: Stand super tall and look up high",
        "🐢 Turtle: Pull your chin back into your 'shell'",
        "🦅 Eagle: Roll your shoulders back and spread them wide",
        "🐍 Snake: Slowly move your head side to side",
        "🦢 Swan: Gracefully stretch your neck up long"
      ],
      emoji: "🎪"
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isPlaying) {
      setIsPlaying(false);
      if (!completedExercises.includes(currentExercise)) {
        setCompletedExercises([...completedExercises, currentExercise]);
        // Update rewards when exercise is completed
        setTotalStars(prev => prev + 1);
        if (completedExercises.length === 0) {
          setStreakDays(1); // First exercise starts the streak
        }
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer, currentExercise, completedExercises]);

  // Breathing exercise timer
  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          if (prev <= 1) {
            setBreathingPhase(currentPhase => {
              const nextPhase = currentPhase === 'inhale' ? 'hold' : 
                              currentPhase === 'hold' ? 'exhale' : 'inhale';
              return nextPhase;
            });
            return breathingPhase === 'hold' ? 2 : 4; // Hold for 2, inhale/exhale for 4
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathingPhase]);

  const startExercise = () => {
    setTimer(exercises[currentExercise].duration);
    setIsPlaying(true);
  };

  const pauseExercise = () => {
    setIsPlaying(false);
  };

  const resetExercise = () => {
    setIsPlaying(false);
    setTimer(exercises[currentExercise].duration);
  };

  const markStoryAsRead = (storyIndex) => {
    if (!readStories.includes(storyIndex)) {
      setReadStories([...readStories, storyIndex]);
    }
  };

  const changeStory = (newStoryIndex) => {
    markStoryAsRead(currentStory); // Mark current story as read when navigating away
    setCurrentStory(newStoryIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">🦒 Neck Helper</h1>
          <p className="text-purple-100">Feel better with fun exercises!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium ${
              activeTab === 'exercises' 
                ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600'
            }`}
          >
            🏃 Exercises
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium ${
              activeTab === 'games' 
                ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600'
            }`}
          >
            🎮 Games
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium ${
              activeTab === 'stories' 
                ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600'
            }`}
          >
            📚 Stories
          </button>
          <button
            onClick={() => setActiveTab('breathing')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium ${
              activeTab === 'breathing' 
                ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600'
            }`}
          >
            🫧 Breathe
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium ${
              activeTab === 'rewards' 
                ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600'
            }`}
          >
            ⭐ Rewards
          </button>
          <button
            onClick={() => setActiveTab('posture')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium ${
              activeTab === 'posture' 
                ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600'
            }`}
          >
            🦒 Posture
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium ${
              activeTab === 'help' 
                ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-600'
            }`}
          >
            💙 Help
          </button>
        </div>

        <div className="p-6">
          {/* Exercises Tab */}
          {activeTab === 'exercises' && (
            <div>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Progress: {completedExercises.length}/{exercises.length}
                  </span>
                  <div className="flex">
                    {completedExercises.map((index) => (
                      <Star key={index} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Exercise */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-4">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{exercises[currentExercise].emoji}</div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {exercises[currentExercise].name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {exercises[currentExercise].description}
                  </p>
                </div>

                {/* Timer */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {timer || exercises[currentExercise].duration}s
                  </div>
                  <div className="flex justify-center space-x-3">
                    {!isPlaying ? (
                      <button
                        onClick={startExercise}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition-colors"
                      >
                        <Play className="w-6 h-6" />
                      </button>
                    ) : (
                      <button
                        onClick={pauseExercise}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-colors"
                      >
                        <Pause className="w-6 h-6" />
                      </button>
                    )}
                    <button
                      onClick={resetExercise}
                      className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-3 transition-colors"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    {exercises[currentExercise].instructions}
                  </p>
                </div>

                {completedExercises.includes(currentExercise) && (
                  <div className="mt-3 flex items-center justify-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Great job! Exercise completed!</span>
                  </div>
                )}
              </div>

              {/* Exercise Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                  disabled={currentExercise === 0}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-600">
                  {currentExercise + 1} of {exercises.length}
                </span>
                <button
                  onClick={() => setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1))}
                  disabled={currentExercise === exercises.length - 1}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Games Tab */}
          {activeTab === 'games' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🎮</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Fun Neck Games
                </h2>
                <p className="text-gray-600">
                  Play games while helping your neck feel better!
                </p>
              </div>

              <div className="space-y-4">
                {games.map((game, index) => (
                  <div key={index} className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{game.emoji}</span>
                      <h3 className="text-lg font-bold text-gray-800">{game.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{game.description}</p>
                    <div className="bg-white rounded-lg p-3">
                      {game.instructions.map((instruction, idx) => (
                        <div key={idx} className="flex items-start mb-2 last:mb-0">
                          <span className="text-purple-500 mr-2">{idx + 1}.</span>
                          <span className="text-gray-700 text-sm">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stories Tab */}
          {activeTab === 'stories' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">📚</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Neck Care Stories
                </h2>
                <p className="text-gray-600">
                  Learn about neck care through fun stories!
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-6 mb-4">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{funStories[currentStory].emoji}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {funStories[currentStory].title}
                  </h3>
                </div>
                
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {funStories[currentStory].story}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
                    disabled={currentStory === 0}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    ← Previous Story
                  </button>
                  <span className="text-sm text-gray-600">
                    {currentStory + 1} of {funStories.length}
                  </span>
                  <button
                    onClick={() => setCurrentStory(Math.min(funStories.length - 1, currentStory + 1))}
                    disabled={currentStory === funStories.length - 1}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    Next Story →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Breathing Tab */}
          {activeTab === 'breathing' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🫧</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Calm Breathing
                </h2>
                <p className="text-gray-600">
                  Breathe slowly to help your neck and body relax!
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl p-6 text-center">
                <div className="mb-6">
                  <div className={`w-32 h-32 mx-auto rounded-full transition-all duration-1000 flex items-center justify-center text-white font-bold text-lg ${
                    breathingPhase === 'inhale' ? 'bg-blue-400 scale-110' :
                    breathingPhase === 'hold' ? 'bg-green-400 scale-105' :
                    'bg-purple-400 scale-95'
                  }`}>
                    {breathingPhase === 'inhale' ? '🌬️ Breathe In' :
                     breathingPhase === 'hold' ? '⏸️ Hold' :
                     '🌪️ Breathe Out'}
                  </div>
                </div>

                <div className="text-2xl font-bold text-purple-600 mb-4">
                  {breathingTimer}
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 capitalize font-medium">
                    {breathingPhase === 'inhale' ? 'Slowly breathe in through your nose' :
                     breathingPhase === 'hold' ? 'Hold your breath gently' :
                     'Slowly breathe out through your mouth'}
                  </p>
                </div>

                <button
                  onClick={() => setIsBreathing(!isBreathing)}
                  className={`px-6 py-3 rounded-full text-white font-medium transition-colors ${
                    isBreathing 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isBreathing ? 'Stop Breathing Exercise' : 'Start Breathing Exercise'}
                </button>

                <div className="mt-4 bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Deep breathing helps relax your neck muscles and reduces tension!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">⭐</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Your Rewards
                </h2>
                <p className="text-gray-600">
                  Look at all the amazing things you've accomplished!
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Daily Streak</h3>
                  {streakDays > 0 ? (
                    <>
                      <div className="text-2xl font-bold text-orange-600 mb-2">{streakDays} Days!</div>
                      <p className="text-gray-600 text-sm">You've been taking care of your neck for {streakDays} days in a row!</p>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-medium text-gray-600 mb-2">Ready to Start!</div>
                      <p className="text-gray-600 text-sm">Complete your first exercise to begin your streak!</p>
                    </>
                  )}
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Total Stars</h3>
                  {totalStars > 0 ? (
                    <>
                      <div className="text-2xl font-bold text-purple-600 mb-2">{totalStars} Stars!</div>
                      <div className="flex justify-center mb-2">
                        {Array.from({length: Math.min(10, totalStars)}).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current mx-1" />
                        ))}
                        {totalStars > 10 && <span className="text-yellow-400 ml-2">+{totalStars - 10}</span>}
                      </div>
                      <p className="text-gray-600 text-sm">Every completed exercise earns you a star!</p>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-medium text-gray-600 mb-2">Start Earning Stars!</div>
                      <p className="text-gray-600 text-sm">Complete exercises to collect your first stars!</p>
                    </>
                  )}
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">🎖️ Achievements</h3>
                  <div className="space-y-2">
                    <div className={`flex items-center rounded-lg p-3 ${
                      completedExercises.length > 0 ? 'bg-white' : 'bg-gray-100'
                    }`}>
                      {completedExercises.length > 0 ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
                      )}
                      <div>
                        <div className={`font-medium ${
                          completedExercises.length > 0 ? 'text-gray-800' : 'text-gray-500'
                        }`}>First Exercise</div>
                        <div className={`text-sm ${
                          completedExercises.length > 0 ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {completedExercises.length > 0 ? 'Completed your first neck exercise!' : 'Complete your first neck exercise!'}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center rounded-lg p-3 ${
                      readStories.length > 0 ? 'bg-white' : 'bg-gray-100'
                    }`}>
                      {readStories.length > 0 ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
                      )}
                      <div>
                        <div className={`font-medium ${
                          readStories.length > 0 ? 'text-gray-800' : 'text-gray-500'
                        }`}>Story Reader</div>
                        <div className={`text-sm ${
                          readStories.length > 0 ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {readStories.length > 0 ? 
                            `Read ${readStories.length} ${readStories.length === 1 ? 'story' : 'stories'}!` : 
                            'Read your first neck care story!'
                          }
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center rounded-lg p-3 ${
                      completedExercises.length >= 5 ? 'bg-white' : 'bg-gray-100'
                    }`}>
                      {completedExercises.length >= 5 ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
                      )}
                      <div>
                        <div className={`font-medium ${
                          completedExercises.length >= 5 ? 'text-gray-800' : 'text-gray-500'
                        }`}>Exercise Master</div>
                        <div className={`text-sm ${
                          completedExercises.length >= 5 ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {completedExercises.length >= 5 ? 
                            'Completed all 5 exercises!' : 
                            `Complete all 5 exercises (Progress: ${completedExercises.length}/5)`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'posture' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🦒</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Good Posture Tips
                </h2>
                <p className="text-gray-600">
                  Sit like a proud giraffe to keep your neck happy!
                </p>
              </div>

              <div className="space-y-4">
                {postureReminders.map((tip, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4">
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-100 rounded-xl p-4 border-l-4 border-yellow-500">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">Remember:</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  Set a timer to remind yourself to check your posture every 30 minutes!
                </p>
              </div>
            </div>
          )}

          {/* Help Tab */}
          {activeTab === 'help' && (
            <div className="space-y-6">
              {painTips.map((section, index) => (
                <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🏥</div>
                <p className="text-gray-700 font-medium mb-2">
                  Always tell a parent, teacher, or doctor if your neck hurts!
                </p>
                <p className="text-gray-600 text-sm">
                  They can help you feel better and make sure everything is okay.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeckHelperApp;