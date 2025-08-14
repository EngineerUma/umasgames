import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Gift, Sparkles, Heart, Award, Timer } from 'lucide-react';

const ChoreQuestApp = () => {
  const [completedChores, setCompletedChores] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [points, setPoints] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const chores = [
    {
      id: 'dishes',
      name: 'Wash dishes after lunch',
      emoji: '🍽️',
      description: 'Clean all the plates, cups, and utensils from lunch!',
      points: 30,
      tips: [
        'Use warm soapy water',
        'Scrub gently to get them sparkly clean',
        'Don\'t forget to dry them too!',
        'Stack them neatly when done'
      ]
    },
    {
      id: 'wardrobe',
      name: 'Put away things in wardrobe',
      emoji: '👗',
      description: 'Organize all your clothes and put them in the right place!',
      points: 25,
      tips: [
        'Hang up shirts and dresses',
        'Fold t-shirts and pants neatly',
        'Put dirty clothes in the hamper',
        'Match up your socks!'
      ]
    },
    {
      id: 'clemon',
      name: 'Train Clemon to clean under table',
      emoji: '🐶',
      description: 'Help Clemon learn to pick up crumbs under the table for a yummy treat!',
      points: 35,
      tips: [
        'Show Clemon where the crumbs are',
        'Use a happy voice to encourage them',
        'Give them a puppy treat when they do good',
        'Pet them and say "Good dog!"'
      ]
    }
  ];

  const totalPoints = chores.reduce((sum, chore) => sum + chore.points, 0);
  const allChoresCompleted = completedChores.length === chores.length;

  useEffect(() => {
    if (allChoresCompleted && !showReward) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setShowReward(true);
      }, 3000);
    }
  }, [allChoresCompleted, showReward]);

  const completeChore = (choreId) => {
    if (!completedChores.includes(choreId)) {
      const chore = chores.find(c => c.id === choreId);
      setCompletedChores(prev => [...prev, choreId]);
      setPoints(prev => prev + chore.points);
      
      // Mini celebration for individual chore
      const button = document.querySelector(`[data-chore="${choreId}"]`);
      if (button) {
        button.classList.add('animate-bounce');
        setTimeout(() => button.classList.remove('animate-bounce'), 1000);
      }
    }
  };

  const resetGame = () => {
    setCompletedChores([]);
    setPoints(0);
    setShowReward(false);
    setShowCelebration(false);
  };

  const ChoreCard = ({ chore }) => {
    const isCompleted = completedChores.includes(chore.id);
    
    return (
      <div className={`relative p-6 rounded-2xl border-3 transition-all duration-500 ${
        isCompleted 
          ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-lg' 
          : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-md'
      }`}>
        {isCompleted && (
          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
            <CheckCircle className="text-white" size={24} />
          </div>
        )}
        
        <div className="text-center mb-4">
          <span className="text-6xl block mb-2">{chore.emoji}</span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{chore.name}</h3>
          <p className="text-gray-600 text-sm">{chore.description}</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-xl mb-4">
          <h4 className="font-bold text-blue-800 mb-2 text-sm">💡 Tips:</h4>
          <ul className="space-y-1">
            {chore.tips.map((tip, index) => (
              <li key={index} className="text-xs text-blue-700 flex items-start">
                <span className="mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-500" size={16} />
            <span className="font-bold text-yellow-600">{chore.points} pts</span>
          </div>
          
          <button
            data-chore={chore.id}
            onClick={() => completeChore(chore.id)}
            disabled={isCompleted}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              isCompleted
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
            }`}
          >
            {isCompleted ? '✅ Done!' : '🎯 Complete'}
          </button>
        </div>
      </div>
    );
  };

  const ProgressBar = () => {
    const progress = (points / totalPoints) * 100;
    
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-purple-800">🏆 Quest Progress</h2>
          <span className="text-2xl font-bold text-purple-600">{points}/{totalPoints}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
          <div 
            className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
            style={{ width: `${Math.max(progress, 8)}%` }}
          >
            {progress > 15 && <Sparkles className="text-white" size={16} />}
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Start your quest!</span>
          <span className="text-purple-600 font-bold">🥧 Apple Pie Awaits!</span>
        </div>
      </div>
    );
  };

  const CelebrationScreen = () => (
    <div className="fixed inset-0 bg-purple-600 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl text-center max-w-sm mx-4 shadow-2xl">
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Amazing Job!</h2>
        <p className="text-purple-600 mb-4">You completed all your chores!</p>
        <div className="flex justify-center space-x-2 text-4xl animate-bounce">
          <span>⭐</span>
          <span>🏆</span>
          <span>⭐</span>
        </div>
      </div>
    </div>
  );

  const RewardScreen = () => (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-3xl text-center shadow-xl">
      <div className="text-8xl mb-4">🥧</div>
      <h2 className="text-3xl font-bold text-orange-800 mb-4">🎁 REWARD TIME!</h2>
      <div className="bg-white p-6 rounded-2xl mb-6 border-4 border-orange-300">
        <h3 className="text-2xl font-bold text-orange-700 mb-2">Popeye's Apple Pie!</h3>
        <p className="text-orange-600 text-lg">You've earned your delicious treat! 🍎✨</p>
      </div>
      
      <div className="flex justify-center space-x-4 mb-6">
        <div className="text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-sm font-bold text-orange-700">Quest Master</div>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-sm font-bold text-orange-700">{totalPoints} Points</div>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-2">💪</div>
          <div className="text-sm font-bold text-orange-700">Super Helper</div>
        </div>
      </div>

      <button
        onClick={resetGame}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-lg"
      >
        🔄 New Quest
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">🏰 Chore Quest</h1>
        <p className="text-purple-600 text-lg">Complete your magical chores to earn the treasure!</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Chores or Reward */}
      {showReward ? (
        <RewardScreen />
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {chores.map(chore => (
            <ChoreCard key={chore.id} chore={chore} />
          ))}
        </div>
      )}

      {/* Celebration overlay */}
      {showCelebration && <CelebrationScreen />}

      {/* Floating stars for completed chores */}
      {completedChores.length > 0 && (
        <div className="fixed top-4 right-4 z-40">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-2">
              <Award className="text-yellow-500" size={20} />
              <span className="font-bold text-purple-800">{completedChores.length}/3 Done!</span>
            </div>
            <div className="flex justify-center mt-2 space-x-1">
              {[...Array(completedChores.length)].map((_, i) => (
                <Star key={i} className="text-yellow-500 animate-pulse" size={16} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoreQuestApp;
