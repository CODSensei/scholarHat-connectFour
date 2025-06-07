Overview

A modern, interactive implementation of the classic two-player game Connect Four! Players take turns dropping colored discs (cyan for Player 1, pink for Player 2) into a 7x6 grid, aiming to connect four discs in a row—horizontally, vertically, or diagonally—before their opponent. This project features a sleek UI with theme toggling (dark/light), sound effects, and a responsive design for an engaging gameplay experience.

Tech Stack

The project is built using the following technologies:

React: A JavaScript library for building dynamic, component-based user interfaces.

TypeScript: Adds static typing to JavaScript, enhancing code reliability and maintainability.

JavaScript: Powers game logic, state management, and user interactions.

HTML: Structures the web-based game interface.

Tailwind CSS: A utility-first CSS framework for styling the board, cells, buttons, and other UI elements with a modern, neon aesthetic.

Node.js: Supports the development environment, dependency management, and build processes.

NPM: Manages dependencies (e.g., React) and scripts for running and building the app.

Audio Files: Custom sound effects for disc drops (click.mp3), wins (success.mp3), and draws (losing-horn-313723.mp3).

Components

The project is structured with the following key React components and features:

1. App

Purpose: The root component that renders the entire game.
Features: Serves as the entry point, wrapping and displaying the ConnectFour component.

2. ConnectFour

Purpose: The main game component, orchestrating game logic, state, and UI.

Features:

Initializes a 7x6 board using a 2D array of string | null values.

Manages state with React hooks: board (game grid), currentPlayer (P1 or P2), winner (winner or "Draw"), player1Name/player2Name (custom names), gameStarted (game status), and isDarkTheme (theme toggle).

Checks for wins (horizontal, vertical, diagonal) or draws after each move via checkWinner.

Plays sound effects for clicks, wins, and draws using the playAudio function.

Renders a start screen for player names, the game board, a theme toggle, and a reset button.

Displays a modal for win/draw results with a "Play Again" option.

3. Board

Purpose: Renders the 7x6 grid for gameplay.

Features:

Receives board, onDrop, and isDarkTheme as props.

Maps over the 2D board array to render rows and cells.

Applies Tailwind CSS for a responsive, shadowed container with theme-based styling (dark: gray-900 with cyan glow, light: blue-200 with blue shadow).

4. Cell

Purpose: Represents an individual slot in the game grid.

Features:

Receives value (null, "P1", or "P2"), onClick (triggers disc drop), and isDarkTheme as props.

Renders a clickable, rounded cell with a nested disc styled via Tailwind CSS (cyan for P1, pink for P2, gray for empty).

Includes hover effects and neon glow shadows, adapting to the selected theme.

5. LabelInput

Purpose: A reusable input component for entering player names.

Features:

Accepts label, playerName, onChange, placeholder, and CSS props.

Displays a labeled input field, styled with Tailwind CSS for theme consistency (dark: gray-800 with cyan accents, light: white with blue accents).

6. Button

Purpose: A reusable button component for game actions.

Features:

Accepts buttonCSS, onClick, and title props.

Used for theme toggling, starting the game, and resetting.

Styled with Tailwind CSS for a modern look with hover effects and neon shadows (dark: cyan/lime, light: blue).

Usage

Start the Game:

Enter names for Player 1 and Player 2.
Click "Start Game" to begin.

Gameplay:

Players take turns clicking a column to drop a disc (cyan for P1, pink for P2).
Discs fall to the lowest empty slot in the column.
A sound plays on each drop; the game checks for a win (four in a row) or draw.
A modal displays the result: "Winner: [Player Name]!" or "It's a Draw!".

Features:

Toggle between dark and light themes with a button.
Reset the game via "Reset Game" or "Play Again" buttons.
