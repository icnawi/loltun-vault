import { IconButton } from '../common/icon-button.tsx';
import { MuteIcon } from '../../icons/mute-icon.tsx';
import { useSynth } from '../../context/synth.tsx';
import { UnmuteIcon } from '../../icons/unmute-icon.tsx';

export const MuteButton = () => {
  const { mute, muteOutput } = useSynth();
  return (
    <IconButton title={!mute ? 'Mute' : 'Unmute'} onClick={muteOutput}>
      {!mute ? <UnmuteIcon /> : <MuteIcon />}
    </IconButton>
  );
};
