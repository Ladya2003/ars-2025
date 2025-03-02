import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Box,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import Confetti from 'react-confetti';

function Level1({ isActive, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === questions.level1[currentQuestion].answer.toLowerCase()) {
      if (currentQuestion === questions.level1.length - 1) {
        setShowReward(true);
        setTimeout(() => onComplete(), 3000);
      } else {
        setCurrentQuestion(prev => prev + 1);
        setAnswer('');
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
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
        <Stepper activeStep={currentQuestion} sx={{ mb: 4 }}>
          {questions.level1.map((_, index) => (
            <Step key={index}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode='wait'>
          {showReward ? (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Confetti 
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
              />
              <Typography variant="h5" gutterBottom>
                Поздравляем! Вот твоя награда:
              </Typography>
              <Box
                component="img"
                src="/assets/rewards/watch-reward.jpg"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  mt: 2
                }}
                alt="Reward"
              />
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="h6" gutterBottom>
                {questions.level1[currentQuestion].question}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <TextField
                  fullWidth
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  error={error}
                  helperText={error ? "Попробуй еще раз!" : ""}
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
                <Button 
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Ответить
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
}

export default Level1; 