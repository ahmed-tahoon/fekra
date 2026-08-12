import * as migration_20260812_093326_initial from './20260812_093326_initial';

export const migrations = [
  {
    up: migration_20260812_093326_initial.up,
    down: migration_20260812_093326_initial.down,
    name: '20260812_093326_initial'
  },
];
