import { useState, useEffect, useRef } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
const BALL_SIZE = 10;
const BRICK_HEIGHT = 20;
const BRICK_WIDTH = 60;
const BRICK_GAP = 4;
const BRICK_ROWS = 3;
const BRICK_COLS = 5;
const MIN_SCORE = 10;

// Уменьшите значения dx и dy для уменьшения скорости
const INITIAL_BALL_DX = 1; // Уменьшенная скорость по оси X
const INITIAL_BALL_DY = -1; // Уменьшенная скорость по оси Y

function Level3({ isActive, onComplete }) {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [playHitSound] = useSound('/assets/level3/hit.mp3', { volume: 0.5 });
  const [playHitPaddleSound] = useSound('/assets/level3/hit-paddle.mp3', { volume: 0.5 });

  const isCompleted = score >= MIN_SCORE;

  const gameStateRef = useRef({
    paddle: { x: 0, width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
    ball: { x: 0, y: 0, dx: INITIAL_BALL_DX, dy: INITIAL_BALL_DY, size: BALL_SIZE },
    bricks: [],
    animationFrame: null
  });

  useEffect(() => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize paddle position
    resetPaddlePosition(); // Сброс позиции ракетки
    resetBallPosition(); // Сброс позиции мяча
    
    // Initialize bricks
    initializeBricks();
    
    draw(); // Initial draw
  }, [isActive]);

  const resetPaddlePosition = () => {
    const canvas = canvasRef.current;
    gameStateRef.current.paddle.x = canvas.width / 2 - PADDLE_WIDTH / 2; // Центрирование ракетки
  };

  const resetBallPosition = () => {
    const canvas = canvasRef.current;
    gameStateRef.current.ball.x = canvas.width / 2;
    gameStateRef.current.ball.y = canvas.height - PADDLE_HEIGHT - BALL_SIZE - 10;
  };

  const initializeBricks = () => {
    const game = gameStateRef.current;
    game.bricks = [];
    
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        game.bricks.push({
          x: col * (BRICK_WIDTH + BRICK_GAP) + BRICK_GAP,
          y: row * (BRICK_HEIGHT + BRICK_GAP) + BRICK_GAP + 50,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          broken: false
        });
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = gameStateRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddle
    ctx.fillStyle = '#90caf9';
    ctx.fillRect(game.paddle.x, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(game.ball.x, game.ball.y, BALL_SIZE/2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
    
    // Draw bricks
    game.bricks.forEach(brick => {
      if (!brick.broken) {
        ctx.fillStyle = '#f48fb1';
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
    
    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    // ctx.fillText(`Счёт: ${score}`, 8, 20);
  };

  const update = () => {
    const canvas = canvasRef.current;
    const game = gameStateRef.current;
    
    // Move ball
    game.ball.x += game.ball.dx;
    game.ball.y += game.ball.dy;
    
    // Ball collision with walls
    if (game.ball.x + game.ball.size/2 > canvas.width || game.ball.x - game.ball.size/2 < 0) {
      game.ball.dx = -game.ball.dx;
    }
    if (game.ball.y - game.ball.size/2 < 0) {
      game.ball.dy = -game.ball.dy;
    }
    
    // Ball collision with paddle
    if (game.ball.y + game.ball.size/2 > canvas.height - PADDLE_HEIGHT) {
      if (game.ball.x > game.paddle.x && game.ball.x < game.paddle.x + PADDLE_WIDTH) {
        game.ball.dy = -game.ball.dy;
        playHitPaddleSound();
      } else {
        // Game over
        setShowDialog(true);
        setGameStarted(false);
        return;
      }
    }
    
    // Ball collision with bricks
    game.bricks.forEach(brick => {
      if (!brick.broken && isColliding(game.ball, brick)) {
        brick.broken = true;
        game.ball.dy = -game.ball.dy;
        console.log(score);
        setScore(s => s + 1); // Обновление счета в реальном времени
        playHitSound();
      }
    });
    
    draw();
    game.animationFrame = requestAnimationFrame(update);
  };

  const isColliding = (ball, brick) => {
    return ball.x > brick.x && 
           ball.x < brick.x + brick.width &&
           ball.y > brick.y &&
           ball.y < brick.y + brick.height;
  };

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setShowDialog(false);
      setScore(0); // Сброс счета
      initializeBricks();
      resetBallPosition(); // Сброс позиции мяча при начале игры
      resetPaddlePosition(); // Сброс позиции ракетки при начале игры
      gameStateRef.current.animationFrame = requestAnimationFrame(update);
    }
  };

  const handleContinuePlaying = () => {
    setShowDialog(false);
    startGame();
  };

  const handleShowReward = () => {
    setShowDialog(false);
    setShowReward(true);
    setTimeout(() => onComplete(), 3000);
  };

  const movePaddle = (direction) => {
    const canvas = canvasRef.current;
    const game = gameStateRef.current;
    if (direction === 'left') {
      game.paddle.x = Math.max(0, game.paddle.x - 20);
    } else if (direction === 'right') {
      game.paddle.x = Math.min(canvas.width - PADDLE_WIDTH, game.paddle.x + 20);
    }
    draw(); // Redraw after moving
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        {showReward ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
              />
            <Typography variant="h5" gutterBottom>
              Твоя финальная награда - это видео, которое ты можешь посмотреть во вкладке "Награды"
            </Typography>
          </motion.div>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Уровень 3: Леша Пидарас
            </Typography>
            <Typography variant="p" gutterBottom>Твоя задача - разбить минимум 10 кирпичей (как те, что мы дарили Жене на ДР)</Typography>
            <Typography variant="h6" gutterBottom>Счёт: {score}</Typography>
            <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
              <canvas
                ref={canvasRef}
                width={400}
                height={500}
                style={{ 
                  background: '#1e1e1e',
                  borderRadius: '8px',
                  cursor: 'none'
                }}
              />
            </Box>
            {!gameStarted && (
              <Button 
                variant="contained" 
                onClick={startGame}
                sx={{ mt: 2 }}
              >
                Начать игру
              </Button>
            )}
            {gameStarted && !showDialog && (
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => movePaddle('left')} sx={{ mr: 1 }}>
                  Влево
                </Button>
                <Button variant="contained" onClick={() => movePaddle('right')}>
                  Вправо
                </Button>
              </Box>
            )}
            {showDialog && (
              <Button variant="contained" onClick={startGame} sx={{ mt: 2 }}>
                Начать заново
              </Button>
            )}
          </>
        )}
      </Paper>

      <Dialog open={showDialog && isCompleted} onClose={() => setShowDialog(false)}>
        <DialogTitle>{isCompleted ? 'Поздравляем!' : 'Попытайтесь ещё раз!'}</DialogTitle>
        <DialogContent>
          <Typography>
            Ты набрал {score} очков! &nbsp;
            {isCompleted ? 'Хочешь начать игру заново или получить награду?' : 'Попытайтесь ещё раз! Надо получить минимум 10 очков'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinuePlaying}>Начать игру заново</Button>
          <Button onClick={handleShowReward} variant="contained">
            Получить награду
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default Level3; 