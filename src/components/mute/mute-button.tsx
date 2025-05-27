import { IconButton } from '../common/icon-button.tsx';
import { MuteIcon } from '../../icons/mute-icon.tsx';
import { useTone } from '../../context/tone.tsx';
import { UnmuteIcon } from '../../icons/unmute-icon.tsx';

export const MuteButton = () => {
  const { mute, muteOutput } = useTone();
  return (
    <IconButton title={!mute ? 'Mute' : 'Unmute'} onClick={muteOutput}>
      {!mute ? <UnmuteIcon /> : <MuteIcon />}
    </IconButton>
  );
};
