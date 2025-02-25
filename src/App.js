import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Fab } from '@mui/material';
import InitialQuestion from './components/InitialQuestion';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import RewardsDrawer from './components/RewardsDrawer';
import { EmojiEvents } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  const [gameState, setGameState] = useState({
    isInitialCompleted: false,
    level1Completed: false,
    level2Completed: false,
    level3Completed: false,
    drawerOpen: false,
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
            gap: 4,
          }}
        >
          {!gameState.isInitialCompleted ? (
            <InitialQuestion 
              onComplete={() => setGameState(prev => ({...prev, isInitialCompleted: true}))} 
            />
          ) : (
            <>
              <Level1 
                isActive={!gameState.level1Completed}
                onComplete={() => setGameState(prev => ({...prev, level1Completed: true}))}
              />
              
              {gameState.level1Completed && (
                <Level2
                  isActive={!gameState.level2Completed}
                  onComplete={() => setGameState(prev => ({...prev, level2Completed: true}))}
                />
              )}
              
              {gameState.level2Completed && (
                <Level3
                  isActive={!gameState.level3Completed}
                  onComplete={() => setGameState(prev => ({...prev, level3Completed: true}))}
                />
              )}
            </>
          )}
        </Box>
      </Container>
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setGameState(prev => ({...prev, drawerOpen: true}))}
      >
        <EmojiEvents />
      </Fab>
      <RewardsDrawer 
        gameState={gameState}
        open={gameState.drawerOpen}
        onClose={() => setGameState(prev => ({...prev, drawerOpen: false}))}
      />
    </ThemeProvider>
  );
}

export default App; 