import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, Volume2 } from 'lucide-react';

const letterPairs = [
  { letter: 'A', word: '🍎', name: 'Apple' },
  { letter: 'B', word: '🦋', name: 'Butterfly' },
  { letter: 'C', word: '🐱', name: 'Cat' },
  { letter: 'D', word: '🐶', name: 'Dog' }
];

const ABCGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const gameCards = [];
    letterPairs.forEach((pair, idx) => {
      gameCards.push({ id: idx * 2, type: 'letter', content: pair.letter, pairId: idx });
      gameCards.push({ id: idx * 2 + 1, type: 'word', content: pair.word, name: pair.name, pairId: idx });
    });
    
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const speakWord = (name) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    
    const clickedCard = cards.find(c => c.id === id);
    if (clickedCard && clickedCard.name) {
      speakWord(clickedCard.name);
    }
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);
      
      if (firstCard.pairId === secondCard.pairId) {
        setMatched([...matched, firstId, secondId]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setTimeout(() => setGameWon(true), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1200);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-600 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" />
            ABC Match Game!
            <Sparkles className="text-yellow-400" />
          </h1>
          <p className="text-gray-600 text-lg">Match letters with words!</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
            <Volume2 size={16} />
            <span>Click words to hear them!</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 bg-green-100 rounded-2xl p-4">
          <div className="text-2xl font-bold text-green-700">
            Moves: {moves}
          </div>
          <button
            onClick={initGame}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-colors"
          >
            <RotateCcw size={20} />
            New Game
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-colors ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? 'bg-white shadow-lg'
                  : 'bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
              }`}
              disabled={matched.includes(card.id)}
            >
              {flipped.includes(card.id) || matched.includes(card.id) ? (
                <>
                  {card.type === 'letter' ? (
                    <span className="text-6xl font-bold text-green-600">{card.content}</span>
                  ) : (
                    <>
                      <span className="text-5xl">{card.content}</span>
                      <span className="text-sm font-bold text-gray-600 mt-1">{card.name}</span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-3xl text-white font-bold">?</span>
              )}
            </button>
          ))}
        </div>

        {gameWon && (
          <div className="text-center bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-6">
            <Trophy className="mx-auto text-yellow-600 mb-2" size={48} />
            <h2 className="text-3xl font-bold text-orange-700 mb-2">
              🎉 Great Job! 🎉
            </h2>
            <p className="text-xl text-orange-600">
              You matched all the letters in {moves} moves!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ABCGame;