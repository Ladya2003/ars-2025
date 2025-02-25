import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Box 
} from '@mui/material';
import { motion } from 'framer-motion';
import { questions } from '../data/questions';

function InitialQuestion({ onComplete }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === questions.initial.answer.toLowerCase()) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          mx: 'auto',
          mt: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {questions.initial.question}
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
        </Box>
      </Paper>
    </motion.div>
  );
}

export default InitialQuestion; 