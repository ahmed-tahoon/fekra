import * as migration_20260812_093326_initial from './20260812_093326_initial';
import * as migration_20260812_120157_home_sections from './20260812_120157_home_sections';
import * as migration_20260812_211156_hero_tile_corner from './20260812_211156_hero_tile_corner';
import * as migration_20260813_125157_add_storage_prefix from './20260813_125157_add_storage_prefix';
import * as migration_20260813_131949_talent_panel_tone_side from './20260813_131949_talent_panel_tone_side';
import * as migration_20260813_135600_card_grid_variant from './20260813_135600_card_grid_variant';
import * as migration_20260813_160007_industries_block from './20260813_160007_industries_block';
import * as migration_20260813_161941_testimonial_stats from './20260813_161941_testimonial_stats';
import * as migration_20260813_165009_cta_feature_media from './20260813_165009_cta_feature_media';
import * as migration_20260813_165418_logo_cloud_badges from './20260813_165418_logo_cloud_badges';
import * as migration_20260813_165657_faq_footnote_cta from './20260813_165657_faq_footnote_cta';

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
    name: '20260813_125157_add_storage_prefix',
  },
  {
    up: migration_20260813_131949_talent_panel_tone_side.up,
    down: migration_20260813_131949_talent_panel_tone_side.down,
    name: '20260813_131949_talent_panel_tone_side',
  },
  {
    up: migration_20260813_135600_card_grid_variant.up,
    down: migration_20260813_135600_card_grid_variant.down,
    name: '20260813_135600_card_grid_variant',
  },
  {
    up: migration_20260813_160007_industries_block.up,
    down: migration_20260813_160007_industries_block.down,
    name: '20260813_160007_industries_block',
  },
  {
    up: migration_20260813_161941_testimonial_stats.up,
    down: migration_20260813_161941_testimonial_stats.down,
    name: '20260813_161941_testimonial_stats',
  },
  {
    up: migration_20260813_165009_cta_feature_media.up,
    down: migration_20260813_165009_cta_feature_media.down,
    name: '20260813_165009_cta_feature_media',
  },
  {
    up: migration_20260813_165418_logo_cloud_badges.up,
    down: migration_20260813_165418_logo_cloud_badges.down,
    name: '20260813_165418_logo_cloud_badges',
  },
  {
    up: migration_20260813_165657_faq_footnote_cta.up,
    down: migration_20260813_165657_faq_footnote_cta.down,
    name: '20260813_165657_faq_footnote_cta'
  },
];
