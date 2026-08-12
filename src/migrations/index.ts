import * as migration_20260812_093326_initial from './20260812_093326_initial';
import * as migration_20260812_120157_home_sections from './20260812_120157_home_sections';

export const migrations = [
  {
    up: migration_20260812_093326_initial.up,
    down: migration_20260812_093326_initial.down,
    name: '20260812_093326_initial',
  },
  {
    up: migration_20260812_120157_home_sections.up,
    down: migration_20260812_120157_home_sections.down,
    name: '20260812_120157_home_sections'
  },
];
