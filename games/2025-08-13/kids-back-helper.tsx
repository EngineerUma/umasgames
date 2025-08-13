import React, { useState, useEffect } from 'react';
import { Heart, Star, Play, Pause, RotateCcw, Calendar, Award, AlertCircle, CheckCircle, Menu } from 'lucide-react';

const BackHelperApp = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [painLevel, setPainLevel] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [dailyWaterCount, setDailyWaterCount] = useState(0);
  const [sleepHours, setSleepHours] = useState(8);
  const [currentStory, setCurrentStory] = useState(0);
  const [postureScore, setPostureScore] = useState(0);
  const [showAllSections, setShowAllSections] = useState(false);

  const exercises = [
    {
      id: 1,
      name: "Cat-Cow Stretch",
      duration: 30,
      description: "Get on hands and knees. Arch your back like a happy cat, then dip it like a cow!",
      emoji: "🐱",
      instructions: [
        "Start on your hands and knees",
        "Arch your back up like a cat",
        "Then dip your belly down like a cow",
        "Repeat slowly and gently"
      ]
    },
    {
      id: 2,
      name: "Child's Pose",
      duration: 45,
      description: "Sit back on your heels and stretch forward like you're bowing to a king!",
      emoji: "🧘‍♀️",
      instructions: [
        "Kneel on the floor",
        "Sit back on your heels",
        "Lean forward and stretch your arms out",
        "Rest your forehead on the ground"
      ]
    },
    {
      id: 3,
      name: "Wall Angels",
      duration: 20,
      description: "Stand against a wall and make snow angels to strengthen your back!",
      emoji: "👼",
      instructions: [
        "Stand with your back against a wall",
        "Put your arms up like making snow angels",
        "Slowly move your arms up and down",
        "Keep your back touching the wall"
      ]
    },
    {
      id: 4,
      name: "Knee Rocks",
      duration: 30,
      description: "Hug your knees and rock side to side like a happy baby!",
      emoji: "🤗",
      instructions: [
        "Lie on your back",
        "Hug your knees to your chest",
        "Gently rock side to side",
        "Breathe deeply and relax"
      ]
    }
  ];

  const postureReminders = [
    { icon: "🪑", tip: "Sit up tall like a superhero!" },
    { icon: "📱", tip: "Hold devices at eye level" },
    { icon: "🎒", tip: "Wear your backpack on both shoulders" },
    { icon: "💺", tip: "Put both feet on the floor when sitting" },
    { icon: "📚", tip: "Take breaks every 20 minutes" }
  ];

  const yogaPoses = [
    { name: "Mountain Pose", emoji: "⛰️", description: "Stand tall like a mountain!" },
    { name: "Tree Pose", emoji: "🌳", description: "Balance on one foot like a tree" },
    { name: "Butterfly Pose", emoji: "🦋", description: "Sit with feet together like butterfly wings" },
    { name: "Happy Baby", emoji: "👶", description: "Lie down and grab your feet like a happy baby" }
  ];

  const stretches = [
    { name: "Shoulder Rolls", emoji: "🔄", description: "Roll shoulders like wheels" },
    { name: "Neck Stretches", emoji: "🦒", description: "Move neck like a tall giraffe" },
    { name: "Side Bends", emoji: "🌙", description: "Bend side to side like a crescent moon" },
    { name: "Arm Circles", emoji: "🌪️", description: "Make big circles with your arms" }
  ];

  const strengthMoves = [
    { name: "Superman", emoji: "🦸‍♂️", description: "Lie on tummy and fly like Superman!" },
    { name: "Bridge", emoji: "🌉", description: "Make a bridge with your back" },
    { name: "Dead Bug", emoji: "🪲", description: "Lie down and move opposite arm and leg" },
    { name: "Bird Dog", emoji: "🐕", description: "On hands and knees, lift opposite arm and leg" }
  ];

  const relaxationStories = [
    "Imagine you're floating on a fluffy cloud...",
    "Picture yourself as a tree swaying gently in the breeze...",
    "You're a starfish relaxing on a warm, sandy beach...",
    "Think of yourself melting like warm chocolate..."
  ];

  const healthyHabits = [
    { icon: "💧", tip: "Drink water to keep muscles happy", action: "water" },
    { icon: "🥗", tip: "Eat fruits and veggies for strong bones", action: null },
    { icon: "😴", tip: "Get 9-11 hours of sleep for growing bodies", action: "sleep" },
    { icon: "🚶‍♀️", tip: "Move around every hour", action: null },
    { icon: "🧘‍♀️", tip: "Take deep breaths when stressed", action: null }
  ];

  const allSections = [
    { id: 'home', name: 'Home', icon: Heart, color: 'blue' },
    { id: 'exercises', name: 'Exercises', icon: Play, color: 'green' },
    { id: 'progress', name: 'Progress', icon: Award, color: 'purple' },
    { id: 'yoga', name: 'Yoga', icon: '🧘‍♀️', color: 'purple' },
    { id: 'stretches', name: 'Stretches', icon: '🤸‍♀️', color: 'green' },
    { id: 'strength', name: 'Strength', icon: '💪', color: 'red' },
    { id: 'relaxation', name: 'Relax', icon: '😌', color: 'indigo' },
    { id: 'habits', name: 'Habits', icon: '🌟', color: 'orange' },
    { id: 'posture', name: 'Posture', icon: '🎮', color: 'pink' },
    { id: 'tips', name: 'Tips', icon: '💡', color: 'amber' }
  ];

  useEffect(() => {
    let interval;
    if (isTimerRunning && exerciseTimer > 0) {
      interval = setInterval(() => {
        setExerciseTimer(time => time - 1);
      }, 1000);
    } else if (exerciseTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (currentExercise) {
        setCompletedExercises(prev => [...prev, currentExercise.id]);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, exerciseTimer, currentExercise]);

  const startExercise = (exercise) => {
    setCurrentExercise(exercise);
    setExerciseTimer(exercise.duration);
    setIsTimerRunning(true);
    setCurrentSection('exercise');
  };

  const PainTracker = () => {
    const painEmojis = ['😊', '🙂', '😐', '😟', '😢'];
    const painLabels = ['No pain', 'A little', 'Some pain', 'Hurts', 'Really hurts'];

    return (
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
          <Heart className="mr-2" /> How does your back feel?
        </h2>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {painEmojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => setPainLevel(index)}
              className={`p-4 rounded-xl text-4xl transition-all ${
                painLevel === index 
                  ? 'bg-purple-200 scale-110 shadow-lg' 
                  : 'bg-white hover:bg-purple-50'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <p className="text-center text-purple-700 font-medium">
          {painLabels[painLevel]}
        </p>
        {painLevel > 2 && (
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-600 mr-2" size={20} />
              <p className="text-yellow-800 text-sm">
                If your pain is bad, tell a grown-up! They can help you feel better.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ExerciseCard = ({ exercise }) => {
    const isCompleted = completedExercises.includes(exercise.id);
    
    return (
      <div className={`p-4 rounded-xl border-2 transition-all ${
        isCompleted 
          ? 'bg-green-100 border-green-300' 
          : 'bg-white border-blue-200 hover:border-blue-400'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">{exercise.emoji}</span>
          {isCompleted && <CheckCircle className="text-green-600" size={24} />}
        </div>
        <h3 className="font-bold text-blue-800 mb-1">{exercise.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {exercise.duration}s
          </span>
          <button
            onClick={() => startExercise(exercise)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center"
          >
            <Play size={14} className="mr-1" /> Start
          </button>
        </div>
      </div>
    );
  };

  const ExerciseView = () => {
    if (!currentExercise) return null;

    return (
      <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-2xl">
        <div className="text-center mb-6">
          <span className="text-6xl block mb-2">{currentExercise.emoji}</span>
          <h2 className="text-2xl font-bold text-blue-800">{currentExercise.name}</h2>
        </div>

        <div className="bg-white rounded-xl p-4 mb-6">
          <h3 className="font-bold text-blue-700 mb-2">How to do it:</h3>
          <ol className="space-y-1">
            {currentExercise.instructions.map((instruction, index) => (
              <li key={index} className="text-sm text-gray-700">
                {index + 1}. {instruction}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold text-blue-600 mb-4">
            {exerciseTimer}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-6 py-3 rounded-xl text-white font-bold flex items-center ${
                isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isTimerRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => {
                setExerciseTimer(currentExercise.duration);
                setIsTimerRunning(false);
              }}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold flex items-center"
            >
              <RotateCcw className="mr-2" /> Reset
            </button>
          </div>
        </div>

        {exerciseTimer === 0 && (
          <div className="mt-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-green-600 font-bold">Great job! You did it!</p>
            <button
              onClick={() => setCurrentSection('exercises')}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Back to Exercises
            </button>
          </div>
        )}
      </div>
    );
  };

  const HomeView = () => (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">Back Buddy 🌟</h1>
        <p className="text-lg">Your friendly back helper!</p>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Star className="text-yellow-300" />
          <span className="font-bold">Start your streak today!</span>
          <Star className="text-yellow-300" />
        </div>
      </div>

      <PainTracker />

      <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-green-800 mb-4">Quick Posture Tips</h2>
        <div className="grid grid-cols-1 gap-3">
          {postureReminders.map((reminder, index) => (
            <div key={index} className="flex items-center bg-white p-3 rounded-lg">
              <span className="text-2xl mr-3">{reminder.icon}</span>
              <span className="text-green-700 font-medium">{reminder.tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentSection('exercises')}
          className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all"
        >
          Start Exercises! 💪
        </button>
      </div>
    </div>
  );

  const ExercisesView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Back Exercises</h2>
        <p className="text-gray-600">Pick an exercise to make your back feel better!</p>
        <div className="mt-2 text-sm text-green-600">
          Completed today: {completedExercises.length}/{exercises.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {completedExercises.length === exercises.length && (
        <div className="text-center bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-2 border-yellow-300">
          <div className="text-4xl mb-2">🏆</div>
          <h3 className="text-xl font-bold text-orange-800">Amazing!</h3>
          <p className="text-orange-700">You completed all exercises today!</p>
        </div>
      )}
    </div>
  );

  const ProgressView = () => {
    const weeklyProgress = [
      { day: 'Mon', completed: false },
      { day: 'Tue', completed: false },
      { day: 'Wed', completed: false },
      { day: 'Thu', completed: false },
      { day: 'Fri', completed: false },
      { day: 'Sat', completed: false },
      { day: 'Sun', completed: false }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-2">Your Progress</h2>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <Award className="text-yellow-500" />
            <span className="font-bold text-purple-700">
              {dailyStreak === 0 ? 'Start Your Journey!' : `${dailyStreak} Day Streak!`}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">This Week</h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  day.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {day.completed ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl">
          <h3 className="font-bold text-orange-800 mb-4">Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center bg-gray-100 p-3 rounded-lg opacity-50">
              <span className="text-2xl mr-3">🏅</span>
              <span className="text-gray-500">First Exercise Complete! (locked)</span>
            </div>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg opacity-50">
              <span className="text-2xl mr-3">🔥</span>
              <span className="text-gray-500">3 Day Streak! (locked)</span>
            </div>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg opacity-50">
              <span className="text-2xl mr-3">⭐</span>
              <span className="text-gray-500">7 Day Streak! (locked)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const YogaView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">🧘‍♀️ Yoga Time</h2>
        <p className="text-gray-600">Gentle yoga poses for your back!</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {yogaPoses.map((pose, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border-2 border-purple-200">
            <div className="text-4xl text-center mb-2">{pose.emoji}</div>
            <h3 className="font-bold text-purple-800 text-center mb-1">{pose.name}</h3>
            <p className="text-xs text-gray-600 text-center">{pose.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-purple-100 p-4 rounded-xl">
        <p className="text-purple-800 text-center">
          Hold each pose for 5-10 deep breaths. Listen to your body! 🌸
        </p>
      </div>
    </div>
  );

  const StretchesView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">🤸‍♀️ Daily Stretches</h2>
        <p className="text-gray-600">Quick stretches to feel amazing!</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stretches.map((stretch, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border-2 border-green-200">
            <div className="text-4xl text-center mb-2">{stretch.emoji}</div>
            <h3 className="font-bold text-green-800 text-center mb-1">{stretch.name}</h3>
            <p className="text-xs text-gray-600 text-center">{stretch.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-green-100 p-4 rounded-xl">
        <p className="text-green-800 text-center">
          Do these stretches slowly and gently. Never force it! 🌱
        </p>
      </div>
    </div>
  );

  const StrengthView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-800 mb-2">💪 Strength Building</h2>
        <p className="text-gray-600">Fun moves to make your back stronger!</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {strengthMoves.map((move, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border-2 border-red-200">
            <div className="text-4xl text-center mb-2">{move.emoji}</div>
            <h3 className="font-bold text-red-800 text-center mb-1">{move.name}</h3>
            <p className="text-xs text-gray-600 text-center">{move.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-red-100 p-4 rounded-xl">
        <p className="text-red-800 text-center">
          Start with 5 repetitions. You're getting stronger every day! 🚀
        </p>
      </div>
    </div>
  );

  const RelaxationView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-indigo-800 mb-2">😌 Relaxation Zone</h2>
        <p className="text-gray-600">Calm activities to help your back relax</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-bold text-indigo-700 mb-4 flex items-center">
          <span className="mr-2">🌙</span> Bedtime Story
        </h3>
        <div className="bg-indigo-50 p-4 rounded-lg mb-4">
          <p className="text-indigo-800 italic">
            {relaxationStories[currentStory]}
          </p>
        </div>
        <button
          onClick={() => setCurrentStory((currentStory + 1) % relaxationStories.length)}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
        >
          Next Story
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-xl">
        <h3 className="font-bold text-indigo-800 mb-4">🫁 Breathing Exercise</h3>
        <div className="text-center">
          <div className="text-6xl mb-4">🫧</div>
          <p className="text-indigo-700 mb-4">Breathe in slowly for 4 counts, hold for 4, breathe out for 4</p>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-indigo-600 font-medium">In... 2... 3... 4... Hold... 2... 3... 4... Out... 2... 3... 4...</p>
          </div>
        </div>
      </div>
    </div>
  );

  const HabitsView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-800 mb-2">🌟 Healthy Habits</h2>
        <p className="text-gray-600">Good habits for a happy back!</p>
      </div>

      <div className="space-y-4">
        {healthyHabits.map((habit, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{habit.icon}</span>
                <span className="text-orange-800 font-medium">{habit.tip}</span>
              </div>
              {habit.action === 'water' && (
                <button
                  onClick={() => setDailyWaterCount(prev => prev + 1)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  +1 💧
                </button>
              )}
            </div>
            {habit.action === 'water' && (
              <div className="mt-2 text-center">
                <span className="text-blue-600 font-bold">Today: {dailyWaterCount} glasses</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-orange-100 p-4 rounded-xl">
        <h3 className="font-bold text-orange-800 mb-2">💤 Sleep Tracker</h3>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setSleepHours(Math.max(6, sleepHours - 1))}
            className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 rounded-full"
          >
            -
          </button>
          <span className="text-2xl font-bold text-orange-800">{sleepHours}h</span>
          <button
            onClick={() => setSleepHours(Math.min(12, sleepHours + 1))}
            className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 rounded-full"
          >
            +
          </button>
        </div>
        <p className="text-center text-orange-700 text-sm mt-2">
          {sleepHours >= 9 ? "Perfect sleep! 🌟" : "Try to get more sleep! 😴"}
        </p>
      </div>
    </div>
  );

  const PostureView = () => {
    const [gameActive, setGameActive] = useState(false);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-pink-800 mb-2">🎮 Posture Game</h2>
          <p className="text-gray-600">Practice good posture and earn points!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-6xl mb-4">🏆</div>
          <div className="text-4xl font-bold text-pink-600 mb-2">{postureScore}</div>
          <p className="text-pink-800 font-medium mb-4">Posture Points</p>
          
          <button
            onClick={() => {
              setGameActive(true);
              setPostureScore(prev => prev + 10);
              setTimeout(() => setGameActive(false), 2000);
            }}
            disabled={gameActive}
            className={`px-6 py-3 rounded-xl font-bold text-white ${
              gameActive 
                ? 'bg-green-500 cursor-not-allowed' 
                : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {gameActive ? '✅ Good Posture!' : 'Check My Posture!'}
          </button>
        </div>

        <div className="bg-pink-100 p-4 rounded-xl">
          <h3 className="font-bold text-pink-800 mb-2">🎯 Posture Challenges</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white p-2 rounded-lg">
              <span className="text-pink-700">Sit up straight for 10 minutes</span>
              <span className="text-pink-500">+50 pts</span>
            </div>
            <div className="flex items-center justify-between bg-white p-2 rounded-lg">
              <span className="text-pink-700">Keep shoulders back all morning</span>
              <span className="text-pink-500">+100 pts</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TipsView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-800 mb-2">💡 Back Care Tips</h2>
        <p className="text-gray-600">Smart tips to keep your back happy!</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border-l-4 border-amber-400">
          <h3 className="font-bold text-amber-800 mb-2">🎒 Backpack Safety</h3>
          <ul className="text-amber-700 space-y-1 text-sm">
            <li>• Pack should weigh less than 10% of your body weight</li>
            <li>• Use both shoulder straps</li>
            <li>• Put heavy items closest to your back</li>
            <li>• Adjust straps so pack sits close to your body</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl border-l-4 border-green-400">
          <h3 className="font-bold text-green-800 mb-2">🪑 Sitting Smart</h3>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• Keep feet flat on the floor</li>
            <li>• Sit all the way back in your chair</li>
            <li>• Keep your screen at eye level</li>
            <li>• Take standing breaks every 30 minutes</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400">
          <h3 className="font-bold text-blue-800 mb-2">🏃‍♀️ Stay Active</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Play outside every day</li>
            <li>• Try swimming - it's great for backs!</li>
            <li>• Do jumping jacks during TV commercials</li>
            <li>• Walk or bike instead of riding in cars</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentSection) {
      case 'home': return <HomeView />;
      case 'exercises': return <ExercisesView />;
      case 'exercise': return <ExerciseView />;
      case 'progress': return <ProgressView />;
      case 'yoga': return <YogaView />;
      case 'stretches': return <StretchesView />;
      case 'strength': return <StrengthView />;
      case 'relaxation': return <RelaxationView />;
      case 'habits': return <HabitsView />;
      case 'posture': return <PostureView />;
      case 'tips': return <TipsView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Back Buddy</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <Star className="text-yellow-300" size={16} />
              <span className="text-sm font-bold">{dailyStreak === 0 ? 'Start!' : dailyStreak}</span>
            </div>
            <button
              onClick={() => setShowAllSections(!showAllSections)}
              className="bg-white bg-opacity-20 p-2 rounded-full"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* All Sections Menu */}
      {showAllSections && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="grid grid-cols-2 gap-2">
            {allSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setCurrentSection(section.id);
                  setShowAllSections(false);
                }}
                className={`p-3 rounded-lg text-left transition-all ${
                  currentSection === section.id 
                    ? 'bg-blue-100 border-2 border-blue-300' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  {typeof section.icon === 'string' ? (
                    <span className="text-xl mr-2">{section.icon}</span>
                  ) : (
                    <section.icon size={20} className="mr-2" />
                  )}
                  <span className="font-medium text-gray-800">{section.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 pb-32">
        {renderCurrentView()}
      </div>

      {/* Bottom Navigation - Now shows 5 sections with scroll */}
      {currentSection !== 'exercise' && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white border-t border-gray-200">
          <div className="grid grid-cols-5 gap-1 text-xs">
            <button
              onClick={() => setCurrentSection('home')}
              className={`p-3 text-center ${
                currentSection === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Heart className="mx-auto mb-1" size={16} />
              <div>Home</div>
            </button>
            <button
              onClick={() => setCurrentSection('exercises')}
              className={`p-3 text-center ${
                currentSection === 'exercises' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Play className="mx-auto mb-1" size={16} />
              <div>Exercise</div>
            </button>
            <button
              onClick={() => setCurrentSection('yoga')}
              className={`p-3 text-center ${
                currentSection === 'yoga' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1 block">🧘‍♀️</span>
              <div>Yoga</div>
            </button>
            <button
              onClick={() => setCurrentSection('habits')}
              className={`p-3 text-center ${
                currentSection === 'habits' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1 block">🌟</span>
              <div>Habits</div>
            </button>
            <button
              onClick={() => setCurrentSection('progress')}
              className={`p-3 text-center ${
                currentSection === 'progress' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Award className="mx-auto mb-1" size={16} />
              <div>Progress</div>
            </button>
          </div>
          {/* Second row for remaining sections */}
          <div className="grid grid-cols-5 gap-1 text-xs border-t border-gray-100">
            <button
              onClick={() => setCurrentSection('stretches')}
              className={`p-3 text-center ${
                currentSection === 'stretches' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1 block">🤸‍♀️</span>
              <div>Stretch</div>
            </button>
            <button
              onClick={() => setCurrentSection('strength')}
              className={`p-3 text-center ${
                currentSection === 'strength' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1 block">💪</span>
              <div>Strong</div>
            </button>
            <button
              onClick={() => setCurrentSection('relaxation')}
              className={`p-3 text-center ${
                currentSection === 'relaxation' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1 block">😌</span>
              <div>Relax</div>
            </button>
            <button
              onClick={() => setCurrentSection('posture')}
              className={`p-3 text-center ${
                currentSection === 'posture' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1 block">🎮</span>
              <div>Game</div>
            </button>
            <button
              onClick={() => setCurrentSection('tips')}
              className={`p-3 text-center ${
                currentSection === 'tips' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <span className="text-lg mb-1 block">💡</span>
              <div>Tips</div>
            </button>
          </div>
        </div>
      )}

      {/* Back button for exercise view */}
      {currentSection === 'exercise' && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setCurrentSection('exercises')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
          >
            ← Back to Exercises
          </button>
        </div>
      )}
    </div>
  );
};

export default BackHelperApp;