import React, { useState, useEffect, useRef } from "react";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "React is a powerful JavaScript library.",
  "Typing games are fun and challenging.",
  "Stay focused and type fast.",
  "Practice makes perfect in programming.",
   "Learning to code is a journey, not a destination.",
    "Debugging is an essential skill for developers.",
    "Always keep your code clean and readable.",
    "Collaboration is key in software development.",
    "Version control helps manage code changes.",
    "Testing your code ensures reliability.",
    "Documentation is crucial for understanding code.",
    "Front-end development is all about user experience.",
    "Back-end development powers the application logic.",
    "Full-stack developers work on both front-end and back-end.",
    "APIs allow different software systems to communicate.",
    "Responsive design ensures websites work on all devices.",  
    "Accessibility is important for inclusive web design.",
    "Performance optimization improves user experience.",
    "Security is a top priority in web applications.",
    "Continuous learning is vital in the tech industry.",
];

const getRandomSentence = () => sentences[Math.floor(Math.random() * sentences.length)];

const TypingGame = () => {
  const [targetText, setTargetText] = useState(getRandomSentence());
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startGame = () => {
    setIsRunning(true);
    setTimeLeft(20);
    setUserInput("");
    setTargetText(getRandomSentence());
    setWpm(null);
    setAccuracy(null);
    inputRef.current.focus();
  };

  const endGame = () => {
    setIsRunning(false);
    const wordsTyped = userInput.trim().split(" ").length;
    const correctChars = [...userInput].filter((char, idx) => char === targetText[idx]).length;
    const acc = Math.floor((correctChars / targetText.length) * 100);
    setWpm(wordsTyped * 6); // words in 20s × 6 = words per minute
    setAccuracy(acc);
  };

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-2xl font-bold mb-4">⌨️ Typing Speed Game</h1>
      <p className="mb-4 text-yellow-400 text-center max-w-xl">{targetText}</p>

      <textarea
        ref={inputRef}
        disabled={!isRunning}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full max-w-xl h-24 p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none resize-none"
        placeholder="Start typing here..."
      />

      <div className="mt-4">
        <p className="text-lg">⏳ Time Left: <span className="text-blue-400">{timeLeft}s</span></p>
        {wpm !== null && (
          <>
            <p className="text-green-400 mt-2">🚀 Speed: {wpm} WPM</p>
            <p className="text-pink-400">🎯 Accuracy: {accuracy}%</p>
          </>
        )}
      </div>

      <button
        onClick={startGame}
        className="mt-6 px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
      >
        {isRunning ? "Restart" : "Start Typing"}
      </button>
    </div>
  );
};

export default TypingGame;
