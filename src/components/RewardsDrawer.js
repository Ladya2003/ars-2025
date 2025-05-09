import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  IconButton,
  Divider
} from '@mui/material';
import {
  Close,
  EmojiEvents,
  MusicNote,
  Videocam,
  Watch
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function RewardsDrawer({ gameState, open, onClose }) {
  const rewards = [
    {
      title: 'Фотография с часами',
      icon: <Watch />,
      content: (
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/rewards/watch-reward.jpg`}
          sx={{
            width: '100%',
            borderRadius: 1,
            mt: 2
          }}
          alt="Watch Reward"
        />
      ),
      unlocked: gameState.level1Completed
    },
    {
      title: 'Особенная песня',
      icon: <MusicNote />,
      content: (
        <audio
          controls
          src={`${process.env.PUBLIC_URL}/assets/rewards/reward-song.mp3`}
          style={{ width: '100%', marginTop: '16px', minWidth: '300px' }}
        />
      ),
      unlocked: gameState.level2Completed
    },
    {
      title: 'Финальное видео',
      icon: <Videocam />,
      content: (
        <Box
          component="iframe"
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/CKIUa8rKBj8?si=oEfz34LmastM_Xp3"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          sx={{ borderRadius: 1, mt: 2 }}
        />
      ),
      unlocked: gameState.level3Completed
    }
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 }, p: 2 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div">
          Награды
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {gameState.level3Completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 2,
              borderRadius: 1,
              textAlign: 'center',
              mb: 2
            }}
          >
            <Typography variant="h4" component="div">
              КРУТОЙ ЧЕЛ
            </Typography>
          </Box>
        </motion.div>
      )}

      <List>
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem>
              <ListItemIcon>
                {reward.unlocked ? (
                  <EmojiEvents color="primary" />
                ) : (
                  reward.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={reward.title}
                secondary={reward.unlocked ? 'Разблокировано' : 'Заблокировано'}
              />
            </ListItem>
            {reward.unlocked && (
              <ListItem>
                {reward.content}
              </ListItem>
            )}
            <Divider />
          </motion.div>
        ))}
      </List>
    </Drawer>
  );
}

export default RewardsDrawer; 