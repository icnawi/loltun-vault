import { useCallback, useState } from 'react';
import './App.css';
import StatsDisplay from './components/stats-display';
import { HIGHLIGHT_DURATION, LEVERS, MAX_ROUNDS, NO_SCORE, PAUSE_BETWEEN_HIGHLIGHTS, REWARD } from './constants';
import { useStats } from './hooks';
import GameOver from './screens/game-over';
import GameplayScreen from './screens/gameplay-screen';
import StartScreen from './screens/start-screen';
import { LeverId, Screen, Stats } from './types';
import { sleep } from './utils';

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('start');
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [sequence, setSequence] = useState<LeverId[]>([]);
  const [playerTurnIndex, setPlayerTurnIndex] = useState<number>(0);
  const [isPlayingSequence, setIsPlayingSequence] = useState<boolean>(false);
  const [highlightedLever, setHighlightedLever] = useState<LeverId | null>(null);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useStats(NO_SCORE, 'loltun-game-stats')

  const playSequence = useCallback(async (seq: LeverId[]) => {
    setIsPlayingSequence(true);
    setHighlightedLever(null);
    await sleep(1000); // pause before the sequence starts

    for (const leverId of seq) {
      setHighlightedLever(leverId);
      await sleep(HIGHLIGHT_DURATION);
      setHighlightedLever(null);
      await sleep(PAUSE_BETWEEN_HIGHLIGHTS);
    }

    setIsPlayingSequence(false);
    setPlayerTurnIndex(0)
  }, []) // no deps needed, we are using constants

  const startNextRound = useCallback(() => {
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);

    const nextButton = LEVERS[Math.floor(Math.random() * LEVERS.length)];
    const newSequence = [...sequence, nextButton];
    setSequence(newSequence);
    playSequence(newSequence);
  }, [currentRound, sequence, playSequence]); // depending on current round, seq, demo

  const startGame = useCallback(() => {
    setBestScore((prev: Stats) => ({ ...prev, playCount: prev.playCount }));
    setCurrentScore(0);
    setCurrentRound(0);
    setSequence([]);
    setPlayerTurnIndex(0);
    setIsPlayingSequence(false);
    setHighlightedLever(null);
    setActiveScreen('game');
    
    setTimeout(() => startNextRound(), 100);
  }, [startNextRound])
  
  const handlePlayerInput = useCallback((leverId: LeverId) => {
    if (isPlayingSequence) return;

    const correctButton = sequence[playerTurnIndex];
    
    if (leverId === correctButton) {
      const nextPlayerTurnIndex = playerTurnIndex + 1;
      setPlayerTurnIndex(nextPlayerTurnIndex);

      if (nextPlayerTurnIndex >= sequence.length) {
        const reward = REWARD[currentRound];
        let roundScore = 0;
        let gainedOneUp = false;

        if (reward) {
          roundScore = reward.value;
          gainedOneUp = reward.isOneUp ?? false;
          setCurrentScore(prev => prev + roundScore);
          console.log(`Раунд ${currentRound}: Получена награда ${reward.name} (+${roundScore} очков) ${gainedOneUp ? '+1UP!' : ''}`);
        }

        if (currentRound >= MAX_ROUNDS) {
          console.log("Поздравляем! Игра пройдена!");
          setBestScore(prev => ({
            ...prev,
            score: Math.max(prev.score, currentScore + roundScore),
            oneUpsCount: prev.oneUpsCount + (gainedOneUp ? 1 : 0),
          }));
          setActiveScreen('gameover');
        } else {
          setIsPlayingSequence(true);
          setTimeout(() => {
            startNextRound();
          }, 1000)
        }
      }

      
    } else {
      console.log(`Неверно! Ожидалось ${correctButton}, нажато ${leverId}. Игра окончена.`);
      setBestScore(prev => ({
        ...prev,
        score: Math.max(prev.score, currentScore)
      }))
      setActiveScreen('gameover')
    }
  }, [isPlayingSequence, sequence, playerTurnIndex, currentRound, startNextRound, currentScore])

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans overflow-hidden">
      {/* Статистика отображается всегда, кроме стартового экрана */}
      {activeScreen !== 'start' && <StatsDisplay stats={stats} />}

      {/* Условный рендеринг экранов в зависимости от activeScreen */}
      <div className="w-full h-full flex items-center justify-center">
          {activeScreen === 'start' && <StartScreen onStart={startGame} />}

          {activeScreen === 'game' && (
            <GameplayScreen
              currentRound={currentRound}
              sequence={sequence} // Передаем текущую последовательность
              onCorrectPress={handlePlayerInput} // Функция обработки нажатия
              onIncorrectPress={() => { /* Логика неверного нажатия теперь в handlePlayerInput */ }}
              highlightedButton={highlightedLever} // Какая кнопка подсвечена
              // Ход игрока, если последовательность не пуста и система ее не показывает
              isPlayerTurn={!isPlayingSequence && sequence.length > 0}
            />
          )}

          {activeScreen === 'gameover' && (
            // Передаем счет ТЕКУЩЕЙ игры на экран Game Over
            <GameOver score={currentScore} onReplay={startGame} />
          )}
       </div>
    </div>
  )
}

export default App;

