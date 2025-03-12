import React, { useState, useEffect } from "react";
import "./App.css";

// Sample words list with descriptions
const sampleWords = [
  { word: "HELLO", description: "A common greeting to say hi." },
  { word: "WORLD", description: "The planet we live on, which is full of land and water." },
  { word: "JAVASCRIPT", description: "A popular programming language for building interactive websites." },
  { word: "REACT", description: "A JavaScript library used to build user interfaces." },
  { word: "PROGRAMMING", description: "The process of developing code for computers to perform tasks." },
  { word: "GEEKSFORGEEKS", description: "An educational website for computer science enthusiasts." }
];

// Function to get a random word from the list
const getRandomWord = () => sampleWords[Math.floor(Math.random() * sampleWords.length)];

function App() {
  // State variables
  const [wordData, setWordData] = useState(getRandomWord()); // Stores the selected word
  const [chosenLetters, setChosenLetters] = useState([]); // Stores selected letters
  const [hints, setHints] = useState(3); // Stores the number of remaining hints
  const [message, setMessage] = useState(""); // Stores the game result message
  const [wrongGuesses, setWrongGuesses] = useState(0); // Tracks the number of wrong guesses
  const maxWrongGuess = 3; // Maximum allowed wrong guesses

  // Effect hook to check for game over
  useEffect(() => {
    if (wrongGuesses >= maxWrongGuess) {
      alert("Game Over! You made too many wrong guesses.");
      restartGame();
    }
  }, [wrongGuesses]);

  // Function to handle letter selection
  const handleLetterClick = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters((prev) => [...prev, letter]); // Add selected letter to chosenLetters
      if (!wordData.word.includes(letter)) {
        setWrongGuesses((prev) => prev + 1); // Increase wrong guesses if the letter is incorrect
      }
    }
  };

  // Function to use a hint (reveals a missing letter)
  const useHint = () => {
    if (hints > 0) {
      // Find missing letters
      const missingLetters = wordData.word.split("").filter((letter) => !chosenLetters.includes(letter));
      if (missingLetters.length > 0) {
        setChosenLetters((prev) => [...prev, missingLetters[0]]); // Add a missing letter
        setHints((prev) => prev - 1); // Decrease the hint count
      }
    }
  };

  // Function to remove the last selected letter
  const removeLastLetter = () => {
    setChosenLetters((prev) => prev.slice(0, -1));
  };

  // Function to check if the whole word is guessed correctly
  const isWordGuessed = () => wordData.word.split("").every((letter) => chosenLetters.includes(letter));

  // Function to handle guessing the word
  const handleGuess = () => {
    if (isWordGuessed()) {
      setMessage("Congratulations! You guessed the word correctly! 🎉");
    } else {
      setMessage("Wrong guess! Try again.");
    }
  };

  // Function to restart the game
  const restartGame = () => {
    setWordData(getRandomWord()); // Get a new word
    setChosenLetters([]); // Reset chosen letters
    setHints(3); // Reset hints
    setWrongGuesses(0); // Reset wrong guesses
    setMessage(""); // Clear message
  };

  return (
    <div className="container">
      <h1>Word Guess Game</h1>

      {/* Display the word with guessed letters revealed */}
      <div className="word-container">
        {wordData.word.split("").map((letter, index) => (
          <div key={index} className={`letter ${chosenLetters.includes(letter) ? "visible" : ""}`}>
            {chosenLetters.includes(letter) ? letter : ""}
          </div>
        ))}
      </div>

      {/* Display the hint (word description) */}
      <p className="word-description">Hint: {wordData.description}</p>

      {/* Display the game message */}
      {message && <div className="message"><p>{message}</p></div>}

      {/* Letter selection buttons */}
      <div className="letter-selection">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter)}
            disabled={chosenLetters.includes(letter)}
            className={chosenLetters.includes(letter) ? "selected" : ""}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Game action buttons */}
      <div className="button-section">
        <button onClick={restartGame} className="restart-button">Restart</button>
        <button onClick={removeLastLetter} disabled={!chosenLetters.length} className="remove-button">Undo</button>
        <button onClick={useHint} disabled={hints === 0} className="hint-button">Use Hint ({hints} left)</button>
        <button onClick={handleGuess} disabled={!chosenLetters.length} className="guess-button">Guess</button>
      </div>

      {/* Display wrong guesses count */}
      <p>Wrong Guesses: {wrongGuesses} / {maxWrongGuess}</p>
    </div>
  );
}

export default App;
