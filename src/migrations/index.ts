import * as migration_20260812_093326_initial from './20260812_093326_initial';
import * as migration_20260812_120157_home_sections from './20260812_120157_home_sections';
import * as migration_20260812_211156_hero_tile_corner from './20260812_211156_hero_tile_corner';
import * as migration_20260813_125157_add_storage_prefix from './20260813_125157_add_storage_prefix';

export const migrations = [
  {
    up: migration_20260812_093326_initial.up,
    down: migration_20260812_093326_initial.down,
    name: '20260812_093326_initial',
  },
  {
    up: migration_20260812_120157_home_sections.up,
    down: migration_20260812_120157_home_sections.down,
    name: '20260812_120157_home_sections',
  },
  {
    up: migration_20260812_211156_hero_tile_corner.up,
    down: migration_20260812_211156_hero_tile_corner.down,
    name: '20260812_211156_hero_tile_corner',
  },
  {
    up: migration_20260813_125157_add_storage_prefix.up,
    down: migration_20260813_125157_add_storage_prefix.down,
    name: '20260813_125157_add_storage_prefix'
  },
];
