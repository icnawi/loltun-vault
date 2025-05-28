import { ColorPad } from '../types';

export const ANIMALS_SKIN_CONFIG: ColorPad[] = [
  {
    id: 'turtle',
    name: 'Turtle',
    color: {
      base: `bg-green-500`,
      active: `bg-green-700`,
      hover: `bg-green-600`,
    },
    char: '🐢',
    note: 'G3',
  },
  {
    id: 'octopus',
    name: 'Octopus',
    color: {
      base: `bg-red-500`,
      active: `bg-red-700`,
      hover: `bg-red-600`,
    },
    char: '🐙',
    note: 'C4',
  },
  {
    id: 'jellyfish',
    name: 'Jellyfish',
    color: {
      base: `bg-blue-500`,
      active: `bg-blue-700`,
      hover: `bg-blue-600`,
    },
    char: '🪼',
    note: 'E4',
  },
  {
    id: 'blowfish',
    name: 'Blowfish',
    color: {
      base: `bg-yellow-500`,
      active: `bg-yellow-700`,
      hover: `bg-yellow-600`,
    },
    char: '🐡',
    note: 'G4',
  },
];
