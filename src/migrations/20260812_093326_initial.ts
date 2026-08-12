import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_posts_teaser_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_posts_teaser_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_posts_teaser_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_pages_blocks_cta_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_pages_blocks_media_block_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_pages_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_teaser_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_teaser_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_teaser_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum__pages_v_version_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_card_grid_cards_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_card_grid_cards_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_card_grid_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_card_grid_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_blocks_posts_teaser_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_posts_teaser_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_posts_teaser_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_cta_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_cta_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_cta_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  CREATE TYPE "public"."enum_posts_blocks_rich_text_width" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_posts_blocks_media_block_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_posts_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_card_grid_cards_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_card_grid_cards_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_card_grid_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_card_grid_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__posts_v_blocks_posts_teaser_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_posts_teaser_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_posts_teaser_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  CREATE TYPE "public"."enum__posts_v_blocks_rich_text_width" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_media_block_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum__posts_v_version_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_services_blocks_hero_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_services_blocks_hero_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_hero_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_card_grid_cards_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_card_grid_cards_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_services_blocks_card_grid_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_card_grid_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_blocks_posts_teaser_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_services_blocks_posts_teaser_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_posts_teaser_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_cta_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_services_blocks_cta_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_cta_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  CREATE TYPE "public"."enum_services_blocks_rich_text_width" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_services_blocks_media_block_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_services_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_hero_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__services_v_blocks_hero_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_hero_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_card_grid_cards_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_card_grid_cards_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__services_v_blocks_card_grid_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_card_grid_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__services_v_blocks_posts_teaser_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__services_v_blocks_posts_teaser_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_posts_teaser_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_cta_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__services_v_blocks_cta_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_cta_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_width" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum__services_v_blocks_media_block_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum__services_v_version_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_jobs_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_jobs_work_model" AS ENUM('onsite', 'hybrid', 'remote');
  CREATE TYPE "public"."enum_jobs_employment_type" AS ENUM('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'INTERN');
  CREATE TYPE "public"."enum_jobs_role_status" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_version_available_locales" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum__jobs_v_version_work_model" AS ENUM('onsite', 'hybrid', 'remote');
  CREATE TYPE "public"."enum__jobs_v_version_employment_type" AS ENUM('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'INTERN');
  CREATE TYPE "public"."enum__jobs_v_version_role_status" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum__jobs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_published_locale" AS ENUM('en', 'ar', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_job_applications_status" AS ENUM('new', 'reviewing', 'interviewing', 'rejected', 'hired');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'replied', 'closed', 'spam');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_header_items_children_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_header_items_children_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_header_items_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_header_items_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_header_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_header_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_header_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_header_announcement_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_header_announcement_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__header_v_version_items_children_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__header_v_version_items_children_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__header_v_version_items_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__header_v_version_items_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__header_v_version_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__header_v_version_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__header_v_version_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__header_v_version_announcement_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__header_v_version_announcement_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_footer_columns_links_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_footer_legal_links_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__footer_v_version_columns_links_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__footer_v_version_columns_links_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__footer_v_version_legal_links_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__footer_v_version_legal_links_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_site_settings_social_profiles_platform" AS ENUM('linkedin', 'x', 'facebook', 'instagram', 'youtube', 'github');
  CREATE TYPE "public"."enum_site_settings_consent_mode" AS ENUM('opt-in', 'essential');
  CREATE TYPE "public"."enum__site_settings_v_version_social_profiles_platform" AS ENUM('linkedin', 'x', 'facebook', 'instagram', 'youtube', 'github');
  CREATE TYPE "public"."enum__site_settings_v_version_consent_mode" AS ENUM('opt-in', 'essential');
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_hero_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_hero_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"trust_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"marquee" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"link_type" "enum_pages_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_card_grid_cards_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_card_grid_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_card_grid_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_name" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"emit_schema" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_posts_teaser_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_posts_teaser_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_posts_teaser_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_posts_teaser_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_posts_teaser_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_posts_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posts_teaser_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tech_stack_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_blocks_tech_stack_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tech_stack_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tech_stack_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_cta_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_cta_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_cta_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_cta_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT 'prose',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"width" "enum_pages_blocks_media_block_width" DEFAULT 'container',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_offices" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"calendly_url" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_pages_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"hide_from_sitemap" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"meta_canonical_override" varchar,
  	"meta_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_hero_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_hero_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"trust_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"marquee" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"link_type" "enum__pages_v_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_card_grid_cards_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_card_grid_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_card_grid_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__pages_v_blocks_card_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"emit_schema" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_posts_teaser_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_posts_teaser_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_posts_teaser_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_posts_teaser_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts_teaser_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_posts_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts_teaser_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tech_stack_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tech_stack_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tech_stack_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tech_stack_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_cta_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_cta_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_cta_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__pages_v_blocks_cta_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT 'prose',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"width" "enum__pages_v_blocks_media_block_width" DEFAULT 'container',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_offices" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"calendly_url" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_version_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_hide_from_sitemap" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_canonical_override" varchar,
  	"version_meta_noindex" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "posts_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_hero_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_posts_blocks_hero_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_hero_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_hero_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "posts_blocks_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"trust_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"marquee" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_cloud_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"link_type" "enum_posts_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_card_grid_cards_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_posts_blocks_card_grid_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_card_grid_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_card_grid_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_posts_blocks_card_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "posts_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_process_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_name" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "posts_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"emit_schema" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_posts_teaser_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_posts_teaser_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_posts_blocks_posts_teaser_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_posts_teaser_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_posts_teaser_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_posts_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_posts_teaser_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_tech_stack_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "posts_blocks_tech_stack_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_tech_stack_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_tech_stack_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_cta_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_posts_blocks_cta_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_cta_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_cta_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_posts_blocks_cta_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_posts_blocks_rich_text_width" DEFAULT 'prose',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"width" "enum_posts_blocks_media_block_width" DEFAULT 'container',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_offices" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"calendly_url" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_posts_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"hero_image_id" integer,
  	"category_id" integer,
  	"author_id" integer,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"meta_canonical_override" varchar,
  	"meta_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "_posts_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_hero_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__posts_v_blocks_hero_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_hero_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"trust_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"marquee" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_cloud_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"link_type" "enum__posts_v_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_card_grid_cards_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__posts_v_blocks_card_grid_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_card_grid_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_card_grid_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__posts_v_blocks_card_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_process_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"emit_schema" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_posts_teaser_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_posts_teaser_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__posts_v_blocks_posts_teaser_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_posts_teaser_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_posts_teaser_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_posts_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_posts_teaser_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_tech_stack_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_tech_stack_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_tech_stack_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_tech_stack_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_cta_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__posts_v_blocks_cta_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_cta_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__posts_v_blocks_cta_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__posts_v_blocks_rich_text_width" DEFAULT 'prose',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"width" "enum__posts_v_blocks_media_block_width" DEFAULT 'container',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_offices" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"calendly_url" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__posts_v_version_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_hero_image_id" integer,
  	"version_category_id" integer,
  	"version_author_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_canonical_override" varchar,
  	"version_meta_noindex" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_hero_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_services_blocks_hero_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_hero_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_hero_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services_blocks_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"trust_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "services_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"marquee" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_logo_cloud_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"link_type" "enum_services_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_card_grid_cards_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_services_blocks_card_grid_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_card_grid_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_card_grid_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_services_blocks_card_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_process_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_name" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "services_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"emit_schema" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_posts_teaser_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_posts_teaser_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_services_blocks_posts_teaser_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_posts_teaser_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_posts_teaser_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_posts_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_posts_teaser_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_tech_stack_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "services_blocks_tech_stack_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_tech_stack_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_tech_stack_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_cta_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_services_blocks_cta_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_cta_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_cta_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_services_blocks_cta_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_services_blocks_rich_text_width" DEFAULT 'prose',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"width" "enum_services_blocks_media_block_width" DEFAULT 'container',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_offices" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"calendly_url" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_services_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"icon_id" integer,
  	"parent_id" integer,
  	"order" numeric DEFAULT 0,
  	"meta_canonical_override" varchar,
  	"meta_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "_services_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_hero_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__services_v_blocks_hero_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_hero_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"trust_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"marquee" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_logo_cloud_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"link_type" "enum__services_v_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_card_grid_cards_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__services_v_blocks_card_grid_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_card_grid_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_card_grid_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__services_v_blocks_card_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"emit_schema" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_posts_teaser_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_posts_teaser_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__services_v_blocks_posts_teaser_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_posts_teaser_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_posts_teaser_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_posts_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"category_id" integer,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_posts_teaser_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_tech_stack_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_tech_stack_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_tech_stack_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_tech_stack_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_cta_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__services_v_blocks_cta_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_cta_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__services_v_blocks_cta_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__services_v_blocks_rich_text_width" DEFAULT 'prose',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"width" "enum__services_v_blocks_media_block_width" DEFAULT 'container',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_offices" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"calendly_url" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__services_v_version_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_icon_id" integer,
  	"version_parent_id" integer,
  	"version_order" numeric DEFAULT 0,
  	"version_meta_canonical_override" varchar,
  	"version_meta_noindex" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "jobs_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_jobs_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"work_model" "enum_jobs_work_model" DEFAULT 'onsite',
  	"employment_type" "enum_jobs_employment_type" DEFAULT 'FULL_TIME',
  	"country_code" varchar DEFAULT 'EG',
  	"city" varchar,
  	"valid_through" timestamp(3) with time zone,
  	"role_status" "enum_jobs_role_status" DEFAULT 'open',
  	"published_at" timestamp(3) with time zone,
  	"meta_canonical_override" varchar,
  	"meta_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_jobs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "jobs_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"requirements" jsonb,
  	"benefits" jsonb,
  	"department" varchar,
  	"location" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_jobs_v_version_available_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__jobs_v_version_available_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_jobs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_work_model" "enum__jobs_v_version_work_model" DEFAULT 'onsite',
  	"version_employment_type" "enum__jobs_v_version_employment_type" DEFAULT 'FULL_TIME',
  	"version_country_code" varchar DEFAULT 'EG',
  	"version_city" varchar,
  	"version_valid_through" timestamp(3) with time zone,
  	"version_role_status" "enum__jobs_v_version_role_status" DEFAULT 'open',
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_canonical_override" varchar,
  	"version_meta_noindex" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__jobs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__jobs_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_jobs_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_requirements" jsonb,
  	"version_benefits" jsonb,
  	"version_department" varchar,
  	"version_location" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"decorative" boolean DEFAULT false,
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_content_url" varchar,
  	"sizes_content_width" numeric,
  	"sizes_content_height" numeric,
  	"sizes_content_mime_type" varchar,
  	"sizes_content_filesize" numeric,
  	"sizes_content_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "applicant_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"original_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "job_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"linkedin" varchar,
  	"job_id" integer NOT NULL,
  	"cv_id" integer NOT NULL,
  	"cover_note" varchar,
  	"status" "enum_job_applications_status" DEFAULT 'new',
  	"dedupe_key" varchar,
  	"locale" varchar,
  	"source_path" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"referrer" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_submissions_status" DEFAULT 'new',
  	"locale" varchar,
  	"source_path" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"referrer" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"services_id" integer,
  	"jobs_id" integer,
  	"media_id" integer,
  	"applicant_files_id" integer,
  	"job_applications_id" integer,
  	"contact_submissions_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_items_children_link_type" DEFAULT 'internal',
  	"link_route" "enum_header_items_children_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "header_items_children_locales" (
  	"link_label" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_items_link_type" DEFAULT 'internal',
  	"link_route" "enum_header_items_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "header_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_header_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_header_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_header_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "header_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"announcement_enabled" boolean DEFAULT false,
  	"announcement_link_type" "enum_header_announcement_link_type" DEFAULT 'internal',
  	"announcement_link_route" "enum_header_announcement_link_route",
  	"announcement_link_url" varchar,
  	"announcement_link_new_tab" boolean,
  	"announcement_link_analytics_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"announcement_text" varchar,
  	"announcement_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "_header_v_version_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__header_v_version_items_children_link_type" DEFAULT 'internal',
  	"link_route" "enum__header_v_version_items_children_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v_version_items_children_locales" (
  	"link_label" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_header_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__header_v_version_items_link_type" DEFAULT 'internal',
  	"link_route" "enum__header_v_version_items_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v_version_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_header_v_version_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__header_v_version_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__header_v_version_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__header_v_version_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v_version_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_announcement_enabled" boolean DEFAULT false,
  	"version_announcement_link_type" "enum__header_v_version_announcement_link_type" DEFAULT 'internal',
  	"version_announcement_link_route" "enum__header_v_version_announcement_link_route",
  	"version_announcement_link_url" varchar,
  	"version_announcement_link_new_tab" boolean,
  	"version_announcement_link_analytics_id" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_header_v_locales" (
  	"version_announcement_text" varchar,
  	"version_announcement_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_header_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'internal',
  	"link_route" "enum_footer_columns_links_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'internal',
  	"link_route" "enum_footer_legal_links_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "footer_legal_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar,
  	"blurb" varchar,
  	"newsletter_heading" varchar,
  	"newsletter_body" varchar,
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "_footer_v_version_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_columns_links_link_type" DEFAULT 'internal',
  	"link_route" "enum__footer_v_version_columns_links_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_columns_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_version_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_legal_links_link_type" DEFAULT 'internal',
  	"link_route" "enum__footer_v_version_legal_links_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_legal_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_newsletter_enabled" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_footer_v_locales" (
  	"version_tagline" varchar,
  	"version_blurb" varchar,
  	"version_newsletter_heading" varchar,
  	"version_newsletter_body" varchar,
  	"version_copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "site_settings_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_profiles_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"country_code" varchar,
  	"map_url" varchar,
  	"is_headquarters" boolean
  );
  
  CREATE TABLE "site_settings_offices_locales" (
  	"city" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"address_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'FEKRA' NOT NULL,
  	"legal_name" varchar DEFAULT 'Fekra',
  	"logo_light_id" integer,
  	"logo_dark_id" integer,
  	"default_og_image_id" integer,
  	"general_email" varchar DEFAULT 'info@fekra-egy.com',
  	"calendly_url" varchar,
  	"ga4_measurement_id" varchar,
  	"gtm_container_id" varchar,
  	"linkedin_partner_id" varchar,
  	"consent_mode" "enum_site_settings_consent_mode" DEFAULT 'opt-in',
  	"crawler_policy_allow_search_engines" boolean DEFAULT true,
  	"crawler_policy_allow_ai_search_bots" boolean DEFAULT true,
  	"crawler_policy_allow_ai_training_bots" boolean DEFAULT false,
  	"crawler_policy_publish_llms_txt" boolean DEFAULT false,
  	"search_console_verification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar,
  	"default_title_suffix" varchar DEFAULT ' | FEKRA',
  	"default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_settings_v_version_social_profiles_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"country_code" varchar,
  	"map_url" varchar,
  	"is_headquarters" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_offices_locales" (
  	"city" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"address_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_name" varchar DEFAULT 'FEKRA' NOT NULL,
  	"version_legal_name" varchar DEFAULT 'Fekra',
  	"version_logo_light_id" integer,
  	"version_logo_dark_id" integer,
  	"version_default_og_image_id" integer,
  	"version_general_email" varchar DEFAULT 'info@fekra-egy.com',
  	"version_calendly_url" varchar,
  	"version_ga4_measurement_id" varchar,
  	"version_gtm_container_id" varchar,
  	"version_linkedin_partner_id" varchar,
  	"version_consent_mode" "enum__site_settings_v_version_consent_mode" DEFAULT 'opt-in',
  	"version_crawler_policy_allow_search_engines" boolean DEFAULT true,
  	"version_crawler_policy_allow_ai_search_bots" boolean DEFAULT true,
  	"version_crawler_policy_allow_ai_training_bots" boolean DEFAULT false,
  	"version_crawler_policy_publish_llms_txt" boolean DEFAULT false,
  	"version_search_console_verification" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_tagline" varchar,
  	"version_default_title_suffix" varchar DEFAULT ' | FEKRA',
  	"version_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas_locales" ADD CONSTRAINT "pages_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_stats" ADD CONSTRAINT "pages_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_stats_locales" ADD CONSTRAINT "pages_blocks_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_locales" ADD CONSTRAINT "pages_blocks_logo_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards_locales" ADD CONSTRAINT "pages_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_ctas" ADD CONSTRAINT "pages_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_ctas_locales" ADD CONSTRAINT "pages_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_locales" ADD CONSTRAINT "pages_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_locales" ADD CONSTRAINT "pages_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items_locales" ADD CONSTRAINT "pages_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_teaser_ctas" ADD CONSTRAINT "pages_blocks_posts_teaser_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_teaser_ctas_locales" ADD CONSTRAINT "pages_blocks_posts_teaser_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_posts_teaser_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_teaser" ADD CONSTRAINT "pages_blocks_posts_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_teaser" ADD CONSTRAINT "pages_blocks_posts_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_teaser_locales" ADD CONSTRAINT "pages_blocks_posts_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_groups_items" ADD CONSTRAINT "pages_blocks_tech_stack_groups_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_groups_items" ADD CONSTRAINT "pages_blocks_tech_stack_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_groups" ADD CONSTRAINT "pages_blocks_tech_stack_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_groups_locales" ADD CONSTRAINT "pages_blocks_tech_stack_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack" ADD CONSTRAINT "pages_blocks_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_locales" ADD CONSTRAINT "pages_blocks_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_ctas" ADD CONSTRAINT "pages_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_ctas_locales" ADD CONSTRAINT "pages_blocks_cta_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block_locales" ADD CONSTRAINT "pages_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking" ADD CONSTRAINT "pages_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_locales" ADD CONSTRAINT "pages_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_available_locales" ADD CONSTRAINT "pages_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_stats" ADD CONSTRAINT "_pages_v_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_stats_locales" ADD CONSTRAINT "_pages_v_blocks_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_ctas" ADD CONSTRAINT "_pages_v_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_locales" ADD CONSTRAINT "_pages_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_teaser_ctas" ADD CONSTRAINT "_pages_v_blocks_posts_teaser_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_teaser_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_posts_teaser_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_posts_teaser_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_teaser" ADD CONSTRAINT "_pages_v_blocks_posts_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_teaser" ADD CONSTRAINT "_pages_v_blocks_posts_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_teaser_locales" ADD CONSTRAINT "_pages_v_blocks_posts_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_groups_items" ADD CONSTRAINT "_pages_v_blocks_tech_stack_groups_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_groups_items" ADD CONSTRAINT "_pages_v_blocks_tech_stack_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_groups" ADD CONSTRAINT "_pages_v_blocks_tech_stack_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_groups_locales" ADD CONSTRAINT "_pages_v_blocks_tech_stack_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack" ADD CONSTRAINT "_pages_v_blocks_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_locales" ADD CONSTRAINT "_pages_v_blocks_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_cta_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block_locales" ADD CONSTRAINT "_pages_v_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_locales" ADD CONSTRAINT "_pages_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_booking" ADD CONSTRAINT "_pages_v_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_booking_locales" ADD CONSTRAINT "_pages_v_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_available_locales" ADD CONSTRAINT "_pages_v_version_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_ctas" ADD CONSTRAINT "posts_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_ctas_locales" ADD CONSTRAINT "posts_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_stats" ADD CONSTRAINT "posts_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_stats_locales" ADD CONSTRAINT "posts_blocks_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_locales" ADD CONSTRAINT "posts_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud_logos" ADD CONSTRAINT "posts_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud_logos" ADD CONSTRAINT "posts_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud" ADD CONSTRAINT "posts_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud_locales" ADD CONSTRAINT "posts_blocks_logo_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_card_grid_cards" ADD CONSTRAINT "posts_blocks_card_grid_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_card_grid_cards" ADD CONSTRAINT "posts_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_card_grid_cards_locales" ADD CONSTRAINT "posts_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_card_grid_ctas" ADD CONSTRAINT "posts_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_card_grid_ctas_locales" ADD CONSTRAINT "posts_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_card_grid" ADD CONSTRAINT "posts_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_card_grid_locales" ADD CONSTRAINT "posts_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_items" ADD CONSTRAINT "posts_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_items_locales" ADD CONSTRAINT "posts_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats" ADD CONSTRAINT "posts_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_locales" ADD CONSTRAINT "posts_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_process_steps" ADD CONSTRAINT "posts_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_process_steps_locales" ADD CONSTRAINT "posts_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_process" ADD CONSTRAINT "posts_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_process_locales" ADD CONSTRAINT "posts_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items" ADD CONSTRAINT "posts_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items" ADD CONSTRAINT "posts_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items_locales" ADD CONSTRAINT "posts_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials" ADD CONSTRAINT "posts_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_locales" ADD CONSTRAINT "posts_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items" ADD CONSTRAINT "posts_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items_locales" ADD CONSTRAINT "posts_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_locales" ADD CONSTRAINT "posts_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_posts_teaser_ctas" ADD CONSTRAINT "posts_blocks_posts_teaser_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_posts_teaser_ctas_locales" ADD CONSTRAINT "posts_blocks_posts_teaser_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_posts_teaser_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_posts_teaser" ADD CONSTRAINT "posts_blocks_posts_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_posts_teaser" ADD CONSTRAINT "posts_blocks_posts_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_posts_teaser_locales" ADD CONSTRAINT "posts_blocks_posts_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tech_stack_groups_items" ADD CONSTRAINT "posts_blocks_tech_stack_groups_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_tech_stack_groups_items" ADD CONSTRAINT "posts_blocks_tech_stack_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tech_stack_groups" ADD CONSTRAINT "posts_blocks_tech_stack_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tech_stack_groups_locales" ADD CONSTRAINT "posts_blocks_tech_stack_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tech_stack" ADD CONSTRAINT "posts_blocks_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tech_stack_locales" ADD CONSTRAINT "posts_blocks_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_ctas" ADD CONSTRAINT "posts_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_ctas_locales" ADD CONSTRAINT "posts_blocks_cta_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_locales" ADD CONSTRAINT "posts_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text" ADD CONSTRAINT "posts_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text_locales" ADD CONSTRAINT "posts_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block_locales" ADD CONSTRAINT "posts_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_contact" ADD CONSTRAINT "posts_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_contact_locales" ADD CONSTRAINT "posts_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_booking" ADD CONSTRAINT "posts_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_booking_locales" ADD CONSTRAINT "posts_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_available_locales" ADD CONSTRAINT "posts_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_ctas" ADD CONSTRAINT "_posts_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_ctas_locales" ADD CONSTRAINT "_posts_v_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_stats" ADD CONSTRAINT "_posts_v_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_stats_locales" ADD CONSTRAINT "_posts_v_blocks_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_locales" ADD CONSTRAINT "_posts_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_card_grid_cards" ADD CONSTRAINT "_posts_v_blocks_card_grid_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_card_grid_cards" ADD CONSTRAINT "_posts_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_card_grid_cards_locales" ADD CONSTRAINT "_posts_v_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_card_grid_ctas" ADD CONSTRAINT "_posts_v_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_card_grid_ctas_locales" ADD CONSTRAINT "_posts_v_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_card_grid" ADD CONSTRAINT "_posts_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_card_grid_locales" ADD CONSTRAINT "_posts_v_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_items" ADD CONSTRAINT "_posts_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_items_locales" ADD CONSTRAINT "_posts_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats" ADD CONSTRAINT "_posts_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_locales" ADD CONSTRAINT "_posts_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_process_steps" ADD CONSTRAINT "_posts_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_process_steps_locales" ADD CONSTRAINT "_posts_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_process" ADD CONSTRAINT "_posts_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_process_locales" ADD CONSTRAINT "_posts_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials" ADD CONSTRAINT "_posts_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_locales" ADD CONSTRAINT "_posts_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items" ADD CONSTRAINT "_posts_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items_locales" ADD CONSTRAINT "_posts_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_locales" ADD CONSTRAINT "_posts_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_posts_teaser_ctas" ADD CONSTRAINT "_posts_v_blocks_posts_teaser_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_posts_teaser_ctas_locales" ADD CONSTRAINT "_posts_v_blocks_posts_teaser_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_posts_teaser_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_posts_teaser" ADD CONSTRAINT "_posts_v_blocks_posts_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_posts_teaser" ADD CONSTRAINT "_posts_v_blocks_posts_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_posts_teaser_locales" ADD CONSTRAINT "_posts_v_blocks_posts_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tech_stack_groups_items" ADD CONSTRAINT "_posts_v_blocks_tech_stack_groups_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tech_stack_groups_items" ADD CONSTRAINT "_posts_v_blocks_tech_stack_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tech_stack_groups" ADD CONSTRAINT "_posts_v_blocks_tech_stack_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tech_stack_groups_locales" ADD CONSTRAINT "_posts_v_blocks_tech_stack_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tech_stack" ADD CONSTRAINT "_posts_v_blocks_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tech_stack_locales" ADD CONSTRAINT "_posts_v_blocks_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_ctas" ADD CONSTRAINT "_posts_v_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_ctas_locales" ADD CONSTRAINT "_posts_v_blocks_cta_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_locales" ADD CONSTRAINT "_posts_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text" ADD CONSTRAINT "_posts_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text_locales" ADD CONSTRAINT "_posts_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block_locales" ADD CONSTRAINT "_posts_v_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_contact" ADD CONSTRAINT "_posts_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_contact_locales" ADD CONSTRAINT "_posts_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_booking" ADD CONSTRAINT "_posts_v_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_booking_locales" ADD CONSTRAINT "_posts_v_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_available_locales" ADD CONSTRAINT "_posts_v_version_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_texts" ADD CONSTRAINT "_posts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_ctas" ADD CONSTRAINT "services_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_ctas_locales" ADD CONSTRAINT "services_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_stats" ADD CONSTRAINT "services_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_stats_locales" ADD CONSTRAINT "services_blocks_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_locales" ADD CONSTRAINT "services_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_cloud_logos" ADD CONSTRAINT "services_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_cloud_logos" ADD CONSTRAINT "services_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_cloud" ADD CONSTRAINT "services_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_cloud_locales" ADD CONSTRAINT "services_blocks_logo_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_card_grid_cards" ADD CONSTRAINT "services_blocks_card_grid_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_card_grid_cards" ADD CONSTRAINT "services_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_card_grid_cards_locales" ADD CONSTRAINT "services_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_card_grid_ctas" ADD CONSTRAINT "services_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_card_grid_ctas_locales" ADD CONSTRAINT "services_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_card_grid" ADD CONSTRAINT "services_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_card_grid_locales" ADD CONSTRAINT "services_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items_locales" ADD CONSTRAINT "services_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_locales" ADD CONSTRAINT "services_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps" ADD CONSTRAINT "services_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps_locales" ADD CONSTRAINT "services_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process" ADD CONSTRAINT "services_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_locales" ADD CONSTRAINT "services_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items" ADD CONSTRAINT "services_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items" ADD CONSTRAINT "services_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items_locales" ADD CONSTRAINT "services_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_locales" ADD CONSTRAINT "services_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items" ADD CONSTRAINT "services_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items_locales" ADD CONSTRAINT "services_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_locales" ADD CONSTRAINT "services_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_posts_teaser_ctas" ADD CONSTRAINT "services_blocks_posts_teaser_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_posts_teaser_ctas_locales" ADD CONSTRAINT "services_blocks_posts_teaser_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_posts_teaser_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_posts_teaser" ADD CONSTRAINT "services_blocks_posts_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_posts_teaser" ADD CONSTRAINT "services_blocks_posts_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_posts_teaser_locales" ADD CONSTRAINT "services_blocks_posts_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_tech_stack_groups_items" ADD CONSTRAINT "services_blocks_tech_stack_groups_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_tech_stack_groups_items" ADD CONSTRAINT "services_blocks_tech_stack_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_tech_stack_groups" ADD CONSTRAINT "services_blocks_tech_stack_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_tech_stack_groups_locales" ADD CONSTRAINT "services_blocks_tech_stack_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_tech_stack" ADD CONSTRAINT "services_blocks_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_tech_stack_locales" ADD CONSTRAINT "services_blocks_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_ctas" ADD CONSTRAINT "services_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_ctas_locales" ADD CONSTRAINT "services_blocks_cta_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_locales" ADD CONSTRAINT "services_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text_locales" ADD CONSTRAINT "services_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_block" ADD CONSTRAINT "services_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_media_block" ADD CONSTRAINT "services_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_block_locales" ADD CONSTRAINT "services_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact" ADD CONSTRAINT "services_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_locales" ADD CONSTRAINT "services_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_booking" ADD CONSTRAINT "services_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_booking_locales" ADD CONSTRAINT "services_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_available_locales" ADD CONSTRAINT "services_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_ctas" ADD CONSTRAINT "_services_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_ctas_locales" ADD CONSTRAINT "_services_v_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_stats" ADD CONSTRAINT "_services_v_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_stats_locales" ADD CONSTRAINT "_services_v_blocks_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_locales" ADD CONSTRAINT "_services_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_services_v_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_services_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_cloud" ADD CONSTRAINT "_services_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" ADD CONSTRAINT "_services_v_blocks_logo_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_card_grid_cards" ADD CONSTRAINT "_services_v_blocks_card_grid_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_card_grid_cards" ADD CONSTRAINT "_services_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_card_grid_cards_locales" ADD CONSTRAINT "_services_v_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_card_grid_ctas" ADD CONSTRAINT "_services_v_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_card_grid_ctas_locales" ADD CONSTRAINT "_services_v_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_card_grid" ADD CONSTRAINT "_services_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_card_grid_locales" ADD CONSTRAINT "_services_v_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items_locales" ADD CONSTRAINT "_services_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_locales" ADD CONSTRAINT "_services_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps_locales" ADD CONSTRAINT "_services_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process" ADD CONSTRAINT "_services_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_locales" ADD CONSTRAINT "_services_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items" ADD CONSTRAINT "_services_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items" ADD CONSTRAINT "_services_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_services_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_locales" ADD CONSTRAINT "_services_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_items" ADD CONSTRAINT "_services_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_items_locales" ADD CONSTRAINT "_services_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq" ADD CONSTRAINT "_services_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_locales" ADD CONSTRAINT "_services_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_posts_teaser_ctas" ADD CONSTRAINT "_services_v_blocks_posts_teaser_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_posts_teaser_ctas_locales" ADD CONSTRAINT "_services_v_blocks_posts_teaser_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_posts_teaser_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_posts_teaser" ADD CONSTRAINT "_services_v_blocks_posts_teaser_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_posts_teaser" ADD CONSTRAINT "_services_v_blocks_posts_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_posts_teaser_locales" ADD CONSTRAINT "_services_v_blocks_posts_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_posts_teaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_tech_stack_groups_items" ADD CONSTRAINT "_services_v_blocks_tech_stack_groups_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_tech_stack_groups_items" ADD CONSTRAINT "_services_v_blocks_tech_stack_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_tech_stack_groups" ADD CONSTRAINT "_services_v_blocks_tech_stack_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_tech_stack_groups_locales" ADD CONSTRAINT "_services_v_blocks_tech_stack_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_tech_stack_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_tech_stack" ADD CONSTRAINT "_services_v_blocks_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_tech_stack_locales" ADD CONSTRAINT "_services_v_blocks_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_ctas" ADD CONSTRAINT "_services_v_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_ctas_locales" ADD CONSTRAINT "_services_v_blocks_cta_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_locales" ADD CONSTRAINT "_services_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text" ADD CONSTRAINT "_services_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text_locales" ADD CONSTRAINT "_services_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_block" ADD CONSTRAINT "_services_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_block" ADD CONSTRAINT "_services_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_block_locales" ADD CONSTRAINT "_services_v_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact" ADD CONSTRAINT "_services_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_locales" ADD CONSTRAINT "_services_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_booking" ADD CONSTRAINT "_services_v_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_booking_locales" ADD CONSTRAINT "_services_v_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_available_locales" ADD CONSTRAINT "_services_v_version_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_icon_id_media_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_parent_id_services_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_available_locales" ADD CONSTRAINT "jobs_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_jobs_v_version_available_locales" ADD CONSTRAINT "_jobs_v_version_available_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_jobs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_jobs_v" ADD CONSTRAINT "_jobs_v_parent_id_jobs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_jobs_v_locales" ADD CONSTRAINT "_jobs_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_jobs_v_locales" ADD CONSTRAINT "_jobs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_jobs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_cv_id_applicant_files_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."applicant_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applicant_files_fk" FOREIGN KEY ("applicant_files_id") REFERENCES "public"."applicant_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_applications_fk" FOREIGN KEY ("job_applications_id") REFERENCES "public"."job_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_items_children" ADD CONSTRAINT "header_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_items_children_locales" ADD CONSTRAINT "header_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_items" ADD CONSTRAINT "header_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_items_locales" ADD CONSTRAINT "header_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_ctas" ADD CONSTRAINT "header_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_ctas_locales" ADD CONSTRAINT "header_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_items_children" ADD CONSTRAINT "_header_v_version_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_items_children_locales" ADD CONSTRAINT "_header_v_version_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_items" ADD CONSTRAINT "_header_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_items_locales" ADD CONSTRAINT "_header_v_version_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_ctas" ADD CONSTRAINT "_header_v_version_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_ctas_locales" ADD CONSTRAINT "_header_v_version_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_locales" ADD CONSTRAINT "_header_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links_locales" ADD CONSTRAINT "_footer_v_version_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_locales" ADD CONSTRAINT "_footer_v_version_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_legal_links" ADD CONSTRAINT "_footer_v_version_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_legal_links_locales" ADD CONSTRAINT "_footer_v_version_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_locales" ADD CONSTRAINT "_footer_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_profiles" ADD CONSTRAINT "site_settings_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_offices" ADD CONSTRAINT "site_settings_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_offices_locales" ADD CONSTRAINT "site_settings_offices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_texts" ADD CONSTRAINT "site_settings_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social_profiles" ADD CONSTRAINT "_site_settings_v_version_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_offices" ADD CONSTRAINT "_site_settings_v_version_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_offices_locales" ADD CONSTRAINT "_site_settings_v_version_offices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_light_id_media_id_fk" FOREIGN KEY ("version_logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_dark_id_media_id_fk" FOREIGN KEY ("version_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_og_image_id_media_id_fk" FOREIGN KEY ("version_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_texts" ADD CONSTRAINT "_site_settings_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_ctas_locales_locale_parent_id_unique" ON "pages_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_stats_order_idx" ON "pages_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_stats_parent_id_idx" ON "pages_blocks_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_stats_locales_locale_parent_id_unique" ON "pages_blocks_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_order_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_logos_parent_id_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_image_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_logo_cloud_locales_locale_parent_id_unique" ON "pages_blocks_logo_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_icon_idx" ON "pages_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_cards_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_ctas_order_idx" ON "pages_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_ctas_parent_id_idx" ON "pages_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_ctas_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stats_locales_locale_parent_id_unique" ON "pages_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_locales_locale_parent_id_unique" ON "pages_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_avatar_idx" ON "pages_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_items_locales_locale_parent_id_uni" ON "pages_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_posts_teaser_ctas_order_idx" ON "pages_blocks_posts_teaser_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_teaser_ctas_parent_id_idx" ON "pages_blocks_posts_teaser_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_posts_teaser_ctas_locales_locale_parent_id_uniq" ON "pages_blocks_posts_teaser_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_posts_teaser_order_idx" ON "pages_blocks_posts_teaser" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_teaser_parent_id_idx" ON "pages_blocks_posts_teaser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_teaser_path_idx" ON "pages_blocks_posts_teaser" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_teaser_category_idx" ON "pages_blocks_posts_teaser" USING btree ("category_id");
  CREATE UNIQUE INDEX "pages_blocks_posts_teaser_locales_locale_parent_id_unique" ON "pages_blocks_posts_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_tech_stack_groups_items_order_idx" ON "pages_blocks_tech_stack_groups_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tech_stack_groups_items_parent_id_idx" ON "pages_blocks_tech_stack_groups_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tech_stack_groups_items_logo_idx" ON "pages_blocks_tech_stack_groups_items" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_tech_stack_groups_order_idx" ON "pages_blocks_tech_stack_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_tech_stack_groups_parent_id_idx" ON "pages_blocks_tech_stack_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_tech_stack_groups_locales_locale_parent_id_uniq" ON "pages_blocks_tech_stack_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_tech_stack_order_idx" ON "pages_blocks_tech_stack" USING btree ("_order");
  CREATE INDEX "pages_blocks_tech_stack_parent_id_idx" ON "pages_blocks_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tech_stack_path_idx" ON "pages_blocks_tech_stack" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_tech_stack_locales_locale_parent_id_unique" ON "pages_blocks_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_ctas_order_idx" ON "pages_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_ctas_parent_id_idx" ON "pages_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_ctas_locales_locale_parent_id_unique" ON "pages_blocks_cta_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_media_block_locales_locale_parent_id_unique" ON "pages_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_booking_order_idx" ON "pages_blocks_booking" USING btree ("_order");
  CREATE INDEX "pages_blocks_booking_parent_id_idx" ON "pages_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_booking_path_idx" ON "pages_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_booking_locales_locale_parent_id_unique" ON "pages_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_available_locales_order_idx" ON "pages_available_locales" USING btree ("order");
  CREATE INDEX "pages_available_locales_parent_idx" ON "pages_available_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_jobs_id_idx" ON "pages_rels" USING btree ("jobs_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_order_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_ctas_parent_id_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_ctas_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_stats_order_idx" ON "_pages_v_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_stats_parent_id_idx" ON "_pages_v_blocks_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_stats_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_order_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_image_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_logo_cloud_locales_locale_parent_id_unique" ON "_pages_v_blocks_logo_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_icon_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_grid_cards_locales_locale_parent_id_uni" ON "_pages_v_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_ctas_order_idx" ON "_pages_v_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_ctas_parent_id_idx" ON "_pages_v_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_grid_ctas_locales_locale_parent_id_uniq" ON "_pages_v_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_order_idx" ON "_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_parent_id_idx" ON "_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_path_idx" ON "_pages_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_locales_locale_parent_id_unique" ON "_pages_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_avatar_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_items_locales_locale_parent_id_" ON "_pages_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_teaser_ctas_order_idx" ON "_pages_v_blocks_posts_teaser_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_teaser_ctas_parent_id_idx" ON "_pages_v_blocks_posts_teaser_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_posts_teaser_ctas_locales_locale_parent_id_u" ON "_pages_v_blocks_posts_teaser_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_teaser_order_idx" ON "_pages_v_blocks_posts_teaser" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_teaser_parent_id_idx" ON "_pages_v_blocks_posts_teaser" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_teaser_path_idx" ON "_pages_v_blocks_posts_teaser" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_teaser_category_idx" ON "_pages_v_blocks_posts_teaser" USING btree ("category_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_posts_teaser_locales_locale_parent_id_unique" ON "_pages_v_blocks_posts_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_groups_items_order_idx" ON "_pages_v_blocks_tech_stack_groups_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tech_stack_groups_items_parent_id_idx" ON "_pages_v_blocks_tech_stack_groups_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_groups_items_logo_idx" ON "_pages_v_blocks_tech_stack_groups_items" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_groups_order_idx" ON "_pages_v_blocks_tech_stack_groups" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tech_stack_groups_parent_id_idx" ON "_pages_v_blocks_tech_stack_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_tech_stack_groups_locales_locale_parent_id_u" ON "_pages_v_blocks_tech_stack_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_order_idx" ON "_pages_v_blocks_tech_stack" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tech_stack_parent_id_idx" ON "_pages_v_blocks_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_path_idx" ON "_pages_v_blocks_tech_stack" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_tech_stack_locales_locale_parent_id_unique" ON "_pages_v_blocks_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_ctas_order_idx" ON "_pages_v_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_ctas_parent_id_idx" ON "_pages_v_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_ctas_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_booking_order_idx" ON "_pages_v_blocks_booking" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_booking_parent_id_idx" ON "_pages_v_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_booking_path_idx" ON "_pages_v_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_booking_locales_locale_parent_id_unique" ON "_pages_v_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_available_locales_order_idx" ON "_pages_v_version_available_locales" USING btree ("order");
  CREATE INDEX "_pages_v_version_available_locales_parent_idx" ON "_pages_v_version_available_locales" USING btree ("parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_jobs_id_idx" ON "_pages_v_rels" USING btree ("jobs_id");
  CREATE INDEX "posts_blocks_hero_ctas_order_idx" ON "posts_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_ctas_parent_id_idx" ON "posts_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_hero_ctas_locales_locale_parent_id_unique" ON "posts_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hero_stats_order_idx" ON "posts_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_stats_parent_id_idx" ON "posts_blocks_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_hero_stats_locales_locale_parent_id_unique" ON "posts_blocks_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_media_idx" ON "posts_blocks_hero" USING btree ("media_id");
  CREATE UNIQUE INDEX "posts_blocks_hero_locales_locale_parent_id_unique" ON "posts_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_logo_cloud_logos_order_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_cloud_logos_parent_id_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_cloud_logos_image_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "posts_blocks_logo_cloud_order_idx" ON "posts_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_cloud_parent_id_idx" ON "posts_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_cloud_path_idx" ON "posts_blocks_logo_cloud" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_logo_cloud_locales_locale_parent_id_unique" ON "posts_blocks_logo_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_card_grid_cards_order_idx" ON "posts_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_card_grid_cards_parent_id_idx" ON "posts_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_card_grid_cards_icon_idx" ON "posts_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "posts_blocks_card_grid_cards_locales_locale_parent_id_unique" ON "posts_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_card_grid_ctas_order_idx" ON "posts_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_card_grid_ctas_parent_id_idx" ON "posts_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_card_grid_ctas_locales_locale_parent_id_unique" ON "posts_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_card_grid_order_idx" ON "posts_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_card_grid_parent_id_idx" ON "posts_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_card_grid_path_idx" ON "posts_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_card_grid_locales_locale_parent_id_unique" ON "posts_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_stats_items_order_idx" ON "posts_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_items_parent_id_idx" ON "posts_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_stats_items_locales_locale_parent_id_unique" ON "posts_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_stats_order_idx" ON "posts_blocks_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_parent_id_idx" ON "posts_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_path_idx" ON "posts_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_stats_locales_locale_parent_id_unique" ON "posts_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_process_steps_order_idx" ON "posts_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "posts_blocks_process_steps_parent_id_idx" ON "posts_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_process_steps_locales_locale_parent_id_unique" ON "posts_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_process_order_idx" ON "posts_blocks_process" USING btree ("_order");
  CREATE INDEX "posts_blocks_process_parent_id_idx" ON "posts_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_process_path_idx" ON "posts_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_process_locales_locale_parent_id_unique" ON "posts_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_testimonials_items_order_idx" ON "posts_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_items_parent_id_idx" ON "posts_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_items_avatar_idx" ON "posts_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "posts_blocks_testimonials_items_locales_locale_parent_id_uni" ON "posts_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_testimonials_order_idx" ON "posts_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_parent_id_idx" ON "posts_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_path_idx" ON "posts_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_testimonials_locales_locale_parent_id_unique" ON "posts_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_items_order_idx" ON "posts_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_items_parent_id_idx" ON "posts_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_faq_items_locales_locale_parent_id_unique" ON "posts_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_order_idx" ON "posts_blocks_faq" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_parent_id_idx" ON "posts_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_path_idx" ON "posts_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_faq_locales_locale_parent_id_unique" ON "posts_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_posts_teaser_ctas_order_idx" ON "posts_blocks_posts_teaser_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_posts_teaser_ctas_parent_id_idx" ON "posts_blocks_posts_teaser_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_posts_teaser_ctas_locales_locale_parent_id_uniq" ON "posts_blocks_posts_teaser_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_posts_teaser_order_idx" ON "posts_blocks_posts_teaser" USING btree ("_order");
  CREATE INDEX "posts_blocks_posts_teaser_parent_id_idx" ON "posts_blocks_posts_teaser" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_posts_teaser_path_idx" ON "posts_blocks_posts_teaser" USING btree ("_path");
  CREATE INDEX "posts_blocks_posts_teaser_category_idx" ON "posts_blocks_posts_teaser" USING btree ("category_id");
  CREATE UNIQUE INDEX "posts_blocks_posts_teaser_locales_locale_parent_id_unique" ON "posts_blocks_posts_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_tech_stack_groups_items_order_idx" ON "posts_blocks_tech_stack_groups_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_tech_stack_groups_items_parent_id_idx" ON "posts_blocks_tech_stack_groups_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_tech_stack_groups_items_logo_idx" ON "posts_blocks_tech_stack_groups_items" USING btree ("logo_id");
  CREATE INDEX "posts_blocks_tech_stack_groups_order_idx" ON "posts_blocks_tech_stack_groups" USING btree ("_order");
  CREATE INDEX "posts_blocks_tech_stack_groups_parent_id_idx" ON "posts_blocks_tech_stack_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_tech_stack_groups_locales_locale_parent_id_uniq" ON "posts_blocks_tech_stack_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_tech_stack_order_idx" ON "posts_blocks_tech_stack" USING btree ("_order");
  CREATE INDEX "posts_blocks_tech_stack_parent_id_idx" ON "posts_blocks_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_tech_stack_path_idx" ON "posts_blocks_tech_stack" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_tech_stack_locales_locale_parent_id_unique" ON "posts_blocks_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_cta_ctas_order_idx" ON "posts_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_ctas_parent_id_idx" ON "posts_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_cta_ctas_locales_locale_parent_id_unique" ON "posts_blocks_cta_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_cta_order_idx" ON "posts_blocks_cta" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_parent_id_idx" ON "posts_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_path_idx" ON "posts_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_cta_locales_locale_parent_id_unique" ON "posts_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_rich_text_order_idx" ON "posts_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_rich_text_parent_id_idx" ON "posts_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_path_idx" ON "posts_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_rich_text_locales_locale_parent_id_unique" ON "posts_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_media_block_order_idx" ON "posts_blocks_media_block" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_block_parent_id_idx" ON "posts_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_block_path_idx" ON "posts_blocks_media_block" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_block_media_idx" ON "posts_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "posts_blocks_media_block_locales_locale_parent_id_unique" ON "posts_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_contact_order_idx" ON "posts_blocks_contact" USING btree ("_order");
  CREATE INDEX "posts_blocks_contact_parent_id_idx" ON "posts_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_contact_path_idx" ON "posts_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_contact_locales_locale_parent_id_unique" ON "posts_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_booking_order_idx" ON "posts_blocks_booking" USING btree ("_order");
  CREATE INDEX "posts_blocks_booking_parent_id_idx" ON "posts_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_booking_path_idx" ON "posts_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_booking_locales_locale_parent_id_unique" ON "posts_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_available_locales_order_idx" ON "posts_available_locales" USING btree ("order");
  CREATE INDEX "posts_available_locales_parent_idx" ON "posts_available_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_texts_order_parent" ON "posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "posts_texts_locale_parent" ON "posts_texts" USING btree ("locale","parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_services_id_idx" ON "posts_rels" USING btree ("services_id");
  CREATE INDEX "posts_rels_jobs_id_idx" ON "posts_rels" USING btree ("jobs_id");
  CREATE INDEX "_posts_v_blocks_hero_ctas_order_idx" ON "_posts_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_ctas_parent_id_idx" ON "_posts_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_ctas_locales_locale_parent_id_unique" ON "_posts_v_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_stats_order_idx" ON "_posts_v_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_stats_parent_id_idx" ON "_posts_v_blocks_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_stats_locales_locale_parent_id_unique" ON "_posts_v_blocks_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_order_idx" ON "_posts_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_parent_id_idx" ON "_posts_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_path_idx" ON "_posts_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hero_media_idx" ON "_posts_v_blocks_hero" USING btree ("media_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_locales_locale_parent_id_unique" ON "_posts_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_order_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_parent_id_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_image_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_order_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_cloud_parent_id_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_path_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_logo_cloud_locales_locale_parent_id_unique" ON "_posts_v_blocks_logo_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_card_grid_cards_order_idx" ON "_posts_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_card_grid_cards_parent_id_idx" ON "_posts_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_card_grid_cards_icon_idx" ON "_posts_v_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_card_grid_cards_locales_locale_parent_id_uni" ON "_posts_v_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_card_grid_ctas_order_idx" ON "_posts_v_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_card_grid_ctas_parent_id_idx" ON "_posts_v_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_card_grid_ctas_locales_locale_parent_id_uniq" ON "_posts_v_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_card_grid_order_idx" ON "_posts_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_card_grid_parent_id_idx" ON "_posts_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_card_grid_path_idx" ON "_posts_v_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_card_grid_locales_locale_parent_id_unique" ON "_posts_v_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_items_order_idx" ON "_posts_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_items_parent_id_idx" ON "_posts_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_posts_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_order_idx" ON "_posts_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_parent_id_idx" ON "_posts_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_path_idx" ON "_posts_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_stats_locales_locale_parent_id_unique" ON "_posts_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_process_steps_order_idx" ON "_posts_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_process_steps_parent_id_idx" ON "_posts_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_process_steps_locales_locale_parent_id_uniqu" ON "_posts_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_process_order_idx" ON "_posts_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_process_parent_id_idx" ON "_posts_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_process_path_idx" ON "_posts_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_process_locales_locale_parent_id_unique" ON "_posts_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_items_order_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_items_parent_id_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_items_avatar_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_testimonials_items_locales_locale_parent_id_" ON "_posts_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_order_idx" ON "_posts_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_parent_id_idx" ON "_posts_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_path_idx" ON "_posts_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_posts_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_items_order_idx" ON "_posts_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_items_parent_id_idx" ON "_posts_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_posts_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_order_idx" ON "_posts_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_parent_id_idx" ON "_posts_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_path_idx" ON "_posts_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_locales_locale_parent_id_unique" ON "_posts_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_posts_teaser_ctas_order_idx" ON "_posts_v_blocks_posts_teaser_ctas" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_posts_teaser_ctas_parent_id_idx" ON "_posts_v_blocks_posts_teaser_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_posts_teaser_ctas_locales_locale_parent_id_u" ON "_posts_v_blocks_posts_teaser_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_posts_teaser_order_idx" ON "_posts_v_blocks_posts_teaser" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_posts_teaser_parent_id_idx" ON "_posts_v_blocks_posts_teaser" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_posts_teaser_path_idx" ON "_posts_v_blocks_posts_teaser" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_posts_teaser_category_idx" ON "_posts_v_blocks_posts_teaser" USING btree ("category_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_posts_teaser_locales_locale_parent_id_unique" ON "_posts_v_blocks_posts_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_tech_stack_groups_items_order_idx" ON "_posts_v_blocks_tech_stack_groups_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_tech_stack_groups_items_parent_id_idx" ON "_posts_v_blocks_tech_stack_groups_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_tech_stack_groups_items_logo_idx" ON "_posts_v_blocks_tech_stack_groups_items" USING btree ("logo_id");
  CREATE INDEX "_posts_v_blocks_tech_stack_groups_order_idx" ON "_posts_v_blocks_tech_stack_groups" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_tech_stack_groups_parent_id_idx" ON "_posts_v_blocks_tech_stack_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_tech_stack_groups_locales_locale_parent_id_u" ON "_posts_v_blocks_tech_stack_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_tech_stack_order_idx" ON "_posts_v_blocks_tech_stack" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_tech_stack_parent_id_idx" ON "_posts_v_blocks_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_tech_stack_path_idx" ON "_posts_v_blocks_tech_stack" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_tech_stack_locales_locale_parent_id_unique" ON "_posts_v_blocks_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_ctas_order_idx" ON "_posts_v_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_ctas_parent_id_idx" ON "_posts_v_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_cta_ctas_locales_locale_parent_id_unique" ON "_posts_v_blocks_cta_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_order_idx" ON "_posts_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_parent_id_idx" ON "_posts_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_path_idx" ON "_posts_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_cta_locales_locale_parent_id_unique" ON "_posts_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_order_idx" ON "_posts_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_rich_text_parent_id_idx" ON "_posts_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_path_idx" ON "_posts_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_posts_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_media_block_order_idx" ON "_posts_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_block_parent_id_idx" ON "_posts_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_block_path_idx" ON "_posts_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_block_media_idx" ON "_posts_v_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_media_block_locales_locale_parent_id_unique" ON "_posts_v_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_contact_order_idx" ON "_posts_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_contact_parent_id_idx" ON "_posts_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_contact_path_idx" ON "_posts_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_contact_locales_locale_parent_id_unique" ON "_posts_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_booking_order_idx" ON "_posts_v_blocks_booking" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_booking_parent_id_idx" ON "_posts_v_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_booking_path_idx" ON "_posts_v_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_booking_locales_locale_parent_id_unique" ON "_posts_v_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_available_locales_order_idx" ON "_posts_v_version_available_locales" USING btree ("order");
  CREATE INDEX "_posts_v_version_available_locales_parent_idx" ON "_posts_v_version_available_locales" USING btree ("parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_texts_order_parent" ON "_posts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_texts_locale_parent" ON "_posts_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_services_id_idx" ON "_posts_v_rels" USING btree ("services_id");
  CREATE INDEX "_posts_v_rels_jobs_id_idx" ON "_posts_v_rels" USING btree ("jobs_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_ctas_order_idx" ON "services_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_ctas_parent_id_idx" ON "services_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hero_ctas_locales_locale_parent_id_unique" ON "services_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_stats_order_idx" ON "services_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_stats_parent_id_idx" ON "services_blocks_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hero_stats_locales_locale_parent_id_unique" ON "services_blocks_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_media_idx" ON "services_blocks_hero" USING btree ("media_id");
  CREATE UNIQUE INDEX "services_blocks_hero_locales_locale_parent_id_unique" ON "services_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_logo_cloud_logos_order_idx" ON "services_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "services_blocks_logo_cloud_logos_parent_id_idx" ON "services_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logo_cloud_logos_image_idx" ON "services_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "services_blocks_logo_cloud_order_idx" ON "services_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "services_blocks_logo_cloud_parent_id_idx" ON "services_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logo_cloud_path_idx" ON "services_blocks_logo_cloud" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_logo_cloud_locales_locale_parent_id_unique" ON "services_blocks_logo_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_card_grid_cards_order_idx" ON "services_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "services_blocks_card_grid_cards_parent_id_idx" ON "services_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_card_grid_cards_icon_idx" ON "services_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "services_blocks_card_grid_cards_locales_locale_parent_id_uni" ON "services_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_card_grid_ctas_order_idx" ON "services_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_card_grid_ctas_parent_id_idx" ON "services_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_card_grid_ctas_locales_locale_parent_id_uniq" ON "services_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_card_grid_order_idx" ON "services_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_card_grid_parent_id_idx" ON "services_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_card_grid_path_idx" ON "services_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_card_grid_locales_locale_parent_id_unique" ON "services_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_stats_items_locales_locale_parent_id_unique" ON "services_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_stats_locales_locale_parent_id_unique" ON "services_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_process_steps_order_idx" ON "services_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_process_steps_parent_id_idx" ON "services_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_process_steps_locales_locale_parent_id_uniqu" ON "services_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_process_order_idx" ON "services_blocks_process" USING btree ("_order");
  CREATE INDEX "services_blocks_process_parent_id_idx" ON "services_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_path_idx" ON "services_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_process_locales_locale_parent_id_unique" ON "services_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_testimonials_items_order_idx" ON "services_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_items_parent_id_idx" ON "services_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_items_avatar_idx" ON "services_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "services_blocks_testimonials_items_locales_locale_parent_id_" ON "services_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_testimonials_locales_locale_parent_id_unique" ON "services_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_items_order_idx" ON "services_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_items_parent_id_idx" ON "services_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_faq_items_locales_locale_parent_id_unique" ON "services_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_faq_locales_locale_parent_id_unique" ON "services_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_posts_teaser_ctas_order_idx" ON "services_blocks_posts_teaser_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_posts_teaser_ctas_parent_id_idx" ON "services_blocks_posts_teaser_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_posts_teaser_ctas_locales_locale_parent_id_u" ON "services_blocks_posts_teaser_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_posts_teaser_order_idx" ON "services_blocks_posts_teaser" USING btree ("_order");
  CREATE INDEX "services_blocks_posts_teaser_parent_id_idx" ON "services_blocks_posts_teaser" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_posts_teaser_path_idx" ON "services_blocks_posts_teaser" USING btree ("_path");
  CREATE INDEX "services_blocks_posts_teaser_category_idx" ON "services_blocks_posts_teaser" USING btree ("category_id");
  CREATE UNIQUE INDEX "services_blocks_posts_teaser_locales_locale_parent_id_unique" ON "services_blocks_posts_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_tech_stack_groups_items_order_idx" ON "services_blocks_tech_stack_groups_items" USING btree ("_order");
  CREATE INDEX "services_blocks_tech_stack_groups_items_parent_id_idx" ON "services_blocks_tech_stack_groups_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_tech_stack_groups_items_logo_idx" ON "services_blocks_tech_stack_groups_items" USING btree ("logo_id");
  CREATE INDEX "services_blocks_tech_stack_groups_order_idx" ON "services_blocks_tech_stack_groups" USING btree ("_order");
  CREATE INDEX "services_blocks_tech_stack_groups_parent_id_idx" ON "services_blocks_tech_stack_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_tech_stack_groups_locales_locale_parent_id_u" ON "services_blocks_tech_stack_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_tech_stack_order_idx" ON "services_blocks_tech_stack" USING btree ("_order");
  CREATE INDEX "services_blocks_tech_stack_parent_id_idx" ON "services_blocks_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_tech_stack_path_idx" ON "services_blocks_tech_stack" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_tech_stack_locales_locale_parent_id_unique" ON "services_blocks_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_cta_ctas_order_idx" ON "services_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_ctas_parent_id_idx" ON "services_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_cta_ctas_locales_locale_parent_id_unique" ON "services_blocks_cta_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_cta_locales_locale_parent_id_unique" ON "services_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_rich_text_locales_locale_parent_id_unique" ON "services_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_media_block_order_idx" ON "services_blocks_media_block" USING btree ("_order");
  CREATE INDEX "services_blocks_media_block_parent_id_idx" ON "services_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_media_block_path_idx" ON "services_blocks_media_block" USING btree ("_path");
  CREATE INDEX "services_blocks_media_block_media_idx" ON "services_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "services_blocks_media_block_locales_locale_parent_id_unique" ON "services_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_contact_order_idx" ON "services_blocks_contact" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_parent_id_idx" ON "services_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_path_idx" ON "services_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_contact_locales_locale_parent_id_unique" ON "services_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_booking_order_idx" ON "services_blocks_booking" USING btree ("_order");
  CREATE INDEX "services_blocks_booking_parent_id_idx" ON "services_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_booking_path_idx" ON "services_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_booking_locales_locale_parent_id_unique" ON "services_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_available_locales_order_idx" ON "services_available_locales" USING btree ("order");
  CREATE INDEX "services_available_locales_parent_idx" ON "services_available_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_icon_idx" ON "services" USING btree ("icon_id");
  CREATE INDEX "services_parent_idx" ON "services" USING btree ("parent_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_meta_meta_image_idx" ON "services_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_jobs_id_idx" ON "services_rels" USING btree ("jobs_id");
  CREATE INDEX "_services_v_blocks_hero_ctas_order_idx" ON "_services_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_ctas_parent_id_idx" ON "_services_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_ctas_locales_locale_parent_id_unique" ON "_services_v_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_stats_order_idx" ON "_services_v_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_stats_parent_id_idx" ON "_services_v_blocks_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_stats_locales_locale_parent_id_uniqu" ON "_services_v_blocks_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_media_idx" ON "_services_v_blocks_hero" USING btree ("media_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_locales_locale_parent_id_unique" ON "_services_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_logo_cloud_logos_order_idx" ON "_services_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_logo_cloud_logos_parent_id_idx" ON "_services_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_logo_cloud_logos_image_idx" ON "_services_v_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_logo_cloud_order_idx" ON "_services_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_logo_cloud_parent_id_idx" ON "_services_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_logo_cloud_path_idx" ON "_services_v_blocks_logo_cloud" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_logo_cloud_locales_locale_parent_id_uniqu" ON "_services_v_blocks_logo_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_card_grid_cards_order_idx" ON "_services_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_card_grid_cards_parent_id_idx" ON "_services_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_card_grid_cards_icon_idx" ON "_services_v_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_services_v_blocks_card_grid_cards_locales_locale_parent_id_" ON "_services_v_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_card_grid_ctas_order_idx" ON "_services_v_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_card_grid_ctas_parent_id_idx" ON "_services_v_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_card_grid_ctas_locales_locale_parent_id_u" ON "_services_v_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_card_grid_order_idx" ON "_services_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_card_grid_parent_id_idx" ON "_services_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_card_grid_path_idx" ON "_services_v_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_card_grid_locales_locale_parent_id_unique" ON "_services_v_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_services_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_stats_locales_locale_parent_id_unique" ON "_services_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_process_steps_order_idx" ON "_services_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_steps_parent_id_idx" ON "_services_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_process_steps_locales_locale_parent_id_un" ON "_services_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_process_order_idx" ON "_services_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_parent_id_idx" ON "_services_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_path_idx" ON "_services_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_process_locales_locale_parent_id_unique" ON "_services_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_items_order_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_items_parent_id_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_items_avatar_idx" ON "_services_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "_services_v_blocks_testimonials_items_locales_locale_parent_" ON "_services_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_testimonials_locales_locale_parent_id_uni" ON "_services_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_faq_items_order_idx" ON "_services_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_items_parent_id_idx" ON "_services_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_services_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_faq_order_idx" ON "_services_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_parent_id_idx" ON "_services_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_path_idx" ON "_services_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_faq_locales_locale_parent_id_unique" ON "_services_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_posts_teaser_ctas_order_idx" ON "_services_v_blocks_posts_teaser_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_posts_teaser_ctas_parent_id_idx" ON "_services_v_blocks_posts_teaser_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_posts_teaser_ctas_locales_locale_parent_i" ON "_services_v_blocks_posts_teaser_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_posts_teaser_order_idx" ON "_services_v_blocks_posts_teaser" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_posts_teaser_parent_id_idx" ON "_services_v_blocks_posts_teaser" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_posts_teaser_path_idx" ON "_services_v_blocks_posts_teaser" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_posts_teaser_category_idx" ON "_services_v_blocks_posts_teaser" USING btree ("category_id");
  CREATE UNIQUE INDEX "_services_v_blocks_posts_teaser_locales_locale_parent_id_uni" ON "_services_v_blocks_posts_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_tech_stack_groups_items_order_idx" ON "_services_v_blocks_tech_stack_groups_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_tech_stack_groups_items_parent_id_idx" ON "_services_v_blocks_tech_stack_groups_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_tech_stack_groups_items_logo_idx" ON "_services_v_blocks_tech_stack_groups_items" USING btree ("logo_id");
  CREATE INDEX "_services_v_blocks_tech_stack_groups_order_idx" ON "_services_v_blocks_tech_stack_groups" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_tech_stack_groups_parent_id_idx" ON "_services_v_blocks_tech_stack_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_tech_stack_groups_locales_locale_parent_i" ON "_services_v_blocks_tech_stack_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_tech_stack_order_idx" ON "_services_v_blocks_tech_stack" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_tech_stack_parent_id_idx" ON "_services_v_blocks_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_tech_stack_path_idx" ON "_services_v_blocks_tech_stack" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_tech_stack_locales_locale_parent_id_uniqu" ON "_services_v_blocks_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_cta_ctas_order_idx" ON "_services_v_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_ctas_parent_id_idx" ON "_services_v_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_cta_ctas_locales_locale_parent_id_unique" ON "_services_v_blocks_cta_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_cta_locales_locale_parent_id_unique" ON "_services_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_order_idx" ON "_services_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_parent_id_idx" ON "_services_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_path_idx" ON "_services_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_services_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_media_block_order_idx" ON "_services_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_media_block_parent_id_idx" ON "_services_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_media_block_path_idx" ON "_services_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_block_media_idx" ON "_services_v_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "_services_v_blocks_media_block_locales_locale_parent_id_uniq" ON "_services_v_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_contact_order_idx" ON "_services_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_parent_id_idx" ON "_services_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_path_idx" ON "_services_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_contact_locales_locale_parent_id_unique" ON "_services_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_booking_order_idx" ON "_services_v_blocks_booking" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_booking_parent_id_idx" ON "_services_v_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_booking_path_idx" ON "_services_v_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_booking_locales_locale_parent_id_unique" ON "_services_v_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_available_locales_order_idx" ON "_services_v_version_available_locales" USING btree ("order");
  CREATE INDEX "_services_v_version_available_locales_parent_idx" ON "_services_v_version_available_locales" USING btree ("parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_icon_idx" ON "_services_v" USING btree ("version_icon_id");
  CREATE INDEX "_services_v_version_version_parent_idx" ON "_services_v" USING btree ("version_parent_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id");
  CREATE INDEX "_services_v_rels_posts_id_idx" ON "_services_v_rels" USING btree ("posts_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_jobs_id_idx" ON "_services_v_rels" USING btree ("jobs_id");
  CREATE INDEX "jobs_available_locales_order_idx" ON "jobs_available_locales" USING btree ("order");
  CREATE INDEX "jobs_available_locales_parent_idx" ON "jobs_available_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "jobs" USING btree ("slug");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "jobs__status_idx" ON "jobs" USING btree ("_status");
  CREATE INDEX "jobs_meta_meta_image_idx" ON "jobs_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "jobs_locales_locale_parent_id_unique" ON "jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_jobs_v_version_available_locales_order_idx" ON "_jobs_v_version_available_locales" USING btree ("order");
  CREATE INDEX "_jobs_v_version_available_locales_parent_idx" ON "_jobs_v_version_available_locales" USING btree ("parent_id");
  CREATE INDEX "_jobs_v_parent_idx" ON "_jobs_v" USING btree ("parent_id");
  CREATE INDEX "_jobs_v_version_version_slug_idx" ON "_jobs_v" USING btree ("version_slug");
  CREATE INDEX "_jobs_v_version_version_updated_at_idx" ON "_jobs_v" USING btree ("version_updated_at");
  CREATE INDEX "_jobs_v_version_version_created_at_idx" ON "_jobs_v" USING btree ("version_created_at");
  CREATE INDEX "_jobs_v_version_version__status_idx" ON "_jobs_v" USING btree ("version__status");
  CREATE INDEX "_jobs_v_created_at_idx" ON "_jobs_v" USING btree ("created_at");
  CREATE INDEX "_jobs_v_updated_at_idx" ON "_jobs_v" USING btree ("updated_at");
  CREATE INDEX "_jobs_v_snapshot_idx" ON "_jobs_v" USING btree ("snapshot");
  CREATE INDEX "_jobs_v_published_locale_idx" ON "_jobs_v" USING btree ("published_locale");
  CREATE INDEX "_jobs_v_latest_idx" ON "_jobs_v" USING btree ("latest");
  CREATE INDEX "_jobs_v_version_meta_version_meta_image_idx" ON "_jobs_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_jobs_v_locales_locale_parent_id_unique" ON "_jobs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_content_sizes_content_filename_idx" ON "media" USING btree ("sizes_content_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "applicant_files_updated_at_idx" ON "applicant_files" USING btree ("updated_at");
  CREATE INDEX "applicant_files_created_at_idx" ON "applicant_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "applicant_files_filename_idx" ON "applicant_files" USING btree ("filename");
  CREATE INDEX "job_applications_job_idx" ON "job_applications" USING btree ("job_id");
  CREATE INDEX "job_applications_cv_idx" ON "job_applications" USING btree ("cv_id");
  CREATE UNIQUE INDEX "job_applications_dedupe_key_idx" ON "job_applications" USING btree ("dedupe_key");
  CREATE INDEX "job_applications_updated_at_idx" ON "job_applications" USING btree ("updated_at");
  CREATE INDEX "job_applications_created_at_idx" ON "job_applications" USING btree ("created_at");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_applicant_files_id_idx" ON "payload_locked_documents_rels" USING btree ("applicant_files_id");
  CREATE INDEX "payload_locked_documents_rels_job_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("job_applications_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_items_children_order_idx" ON "header_items_children" USING btree ("_order");
  CREATE INDEX "header_items_children_parent_id_idx" ON "header_items_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_items_children_locales_locale_parent_id_unique" ON "header_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_items_order_idx" ON "header_items" USING btree ("_order");
  CREATE INDEX "header_items_parent_id_idx" ON "header_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_items_locales_locale_parent_id_unique" ON "header_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_ctas_order_idx" ON "header_ctas" USING btree ("_order");
  CREATE INDEX "header_ctas_parent_id_idx" ON "header_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_ctas_locales_locale_parent_id_unique" ON "header_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "header_rels_jobs_id_idx" ON "header_rels" USING btree ("jobs_id");
  CREATE INDEX "_header_v_version_items_children_order_idx" ON "_header_v_version_items_children" USING btree ("_order");
  CREATE INDEX "_header_v_version_items_children_parent_id_idx" ON "_header_v_version_items_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_header_v_version_items_children_locales_locale_parent_id_un" ON "_header_v_version_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_v_version_items_order_idx" ON "_header_v_version_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_items_parent_id_idx" ON "_header_v_version_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_header_v_version_items_locales_locale_parent_id_unique" ON "_header_v_version_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_v_version_ctas_order_idx" ON "_header_v_version_ctas" USING btree ("_order");
  CREATE INDEX "_header_v_version_ctas_parent_id_idx" ON "_header_v_version_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_header_v_version_ctas_locales_locale_parent_id_unique" ON "_header_v_version_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_header_v_locales_locale_parent_id_unique" ON "_header_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_v_rels_order_idx" ON "_header_v_rels" USING btree ("order");
  CREATE INDEX "_header_v_rels_parent_idx" ON "_header_v_rels" USING btree ("parent_id");
  CREATE INDEX "_header_v_rels_path_idx" ON "_header_v_rels" USING btree ("path");
  CREATE INDEX "_header_v_rels_pages_id_idx" ON "_header_v_rels" USING btree ("pages_id");
  CREATE INDEX "_header_v_rels_posts_id_idx" ON "_header_v_rels" USING btree ("posts_id");
  CREATE INDEX "_header_v_rels_services_id_idx" ON "_header_v_rels" USING btree ("services_id");
  CREATE INDEX "_header_v_rels_jobs_id_idx" ON "_header_v_rels" USING btree ("jobs_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_legal_links_locales_locale_parent_id_unique" ON "footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "footer_rels_jobs_id_idx" ON "footer_rels" USING btree ("jobs_id");
  CREATE INDEX "_footer_v_version_columns_links_order_idx" ON "_footer_v_version_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_links_parent_id_idx" ON "_footer_v_version_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_v_version_columns_links_locales_locale_parent_id_uni" ON "_footer_v_version_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_columns_order_idx" ON "_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_parent_id_idx" ON "_footer_v_version_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_v_version_columns_locales_locale_parent_id_unique" ON "_footer_v_version_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_legal_links_order_idx" ON "_footer_v_version_legal_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_legal_links_parent_id_idx" ON "_footer_v_version_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_v_version_legal_links_locales_locale_parent_id_uniqu" ON "_footer_v_version_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_footer_v_locales_locale_parent_id_unique" ON "_footer_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_rels_order_idx" ON "_footer_v_rels" USING btree ("order");
  CREATE INDEX "_footer_v_rels_parent_idx" ON "_footer_v_rels" USING btree ("parent_id");
  CREATE INDEX "_footer_v_rels_path_idx" ON "_footer_v_rels" USING btree ("path");
  CREATE INDEX "_footer_v_rels_pages_id_idx" ON "_footer_v_rels" USING btree ("pages_id");
  CREATE INDEX "_footer_v_rels_posts_id_idx" ON "_footer_v_rels" USING btree ("posts_id");
  CREATE INDEX "_footer_v_rels_services_id_idx" ON "_footer_v_rels" USING btree ("services_id");
  CREATE INDEX "_footer_v_rels_jobs_id_idx" ON "_footer_v_rels" USING btree ("jobs_id");
  CREATE INDEX "site_settings_social_profiles_order_idx" ON "site_settings_social_profiles" USING btree ("_order");
  CREATE INDEX "site_settings_social_profiles_parent_id_idx" ON "site_settings_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "site_settings_offices_order_idx" ON "site_settings_offices" USING btree ("_order");
  CREATE INDEX "site_settings_offices_parent_id_idx" ON "site_settings_offices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_offices_locales_locale_parent_id_unique" ON "site_settings_offices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");
  CREATE INDEX "site_settings_logo_dark_idx" ON "site_settings" USING btree ("logo_dark_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_texts_order_parent" ON "site_settings_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_settings_v_version_social_profiles_order_idx" ON "_site_settings_v_version_social_profiles" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_profiles_parent_id_idx" ON "_site_settings_v_version_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_offices_order_idx" ON "_site_settings_v_version_offices" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_offices_parent_id_idx" ON "_site_settings_v_version_offices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_offices_locales_locale_parent_id_un" ON "_site_settings_v_version_offices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_version_logo_light_idx" ON "_site_settings_v" USING btree ("version_logo_light_id");
  CREATE INDEX "_site_settings_v_version_version_logo_dark_idx" ON "_site_settings_v" USING btree ("version_logo_dark_id");
  CREATE INDEX "_site_settings_v_version_version_default_og_image_idx" ON "_site_settings_v" USING btree ("version_default_og_image_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_texts_order_parent" ON "_site_settings_v_texts" USING btree ("order","parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_hero_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "pages_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_card_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process" CASCADE;
  DROP TABLE "pages_blocks_process_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_posts_teaser_ctas" CASCADE;
  DROP TABLE "pages_blocks_posts_teaser_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_posts_teaser" CASCADE;
  DROP TABLE "pages_blocks_posts_teaser_locales" CASCADE;
  DROP TABLE "pages_blocks_tech_stack_groups_items" CASCADE;
  DROP TABLE "pages_blocks_tech_stack_groups" CASCADE;
  DROP TABLE "pages_blocks_tech_stack_groups_locales" CASCADE;
  DROP TABLE "pages_blocks_tech_stack" CASCADE;
  DROP TABLE "pages_blocks_tech_stack_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_ctas" CASCADE;
  DROP TABLE "pages_blocks_cta_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_media_block_locales" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_booking" CASCADE;
  DROP TABLE "pages_blocks_booking_locales" CASCADE;
  DROP TABLE "pages_available_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process" CASCADE;
  DROP TABLE "_pages_v_blocks_process_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_teaser_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_teaser_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_teaser_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_tech_stack_groups_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tech_stack_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_tech_stack_groups_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_tech_stack" CASCADE;
  DROP TABLE "_pages_v_blocks_tech_stack_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_booking" CASCADE;
  DROP TABLE "_pages_v_blocks_booking_locales" CASCADE;
  DROP TABLE "_pages_v_version_available_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_blocks_hero_ctas" CASCADE;
  DROP TABLE "posts_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "posts_blocks_hero_stats" CASCADE;
  DROP TABLE "posts_blocks_hero_stats_locales" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_hero_locales" CASCADE;
  DROP TABLE "posts_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "posts_blocks_logo_cloud" CASCADE;
  DROP TABLE "posts_blocks_logo_cloud_locales" CASCADE;
  DROP TABLE "posts_blocks_card_grid_cards" CASCADE;
  DROP TABLE "posts_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "posts_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "posts_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "posts_blocks_card_grid" CASCADE;
  DROP TABLE "posts_blocks_card_grid_locales" CASCADE;
  DROP TABLE "posts_blocks_stats_items" CASCADE;
  DROP TABLE "posts_blocks_stats_items_locales" CASCADE;
  DROP TABLE "posts_blocks_stats" CASCADE;
  DROP TABLE "posts_blocks_stats_locales" CASCADE;
  DROP TABLE "posts_blocks_process_steps" CASCADE;
  DROP TABLE "posts_blocks_process_steps_locales" CASCADE;
  DROP TABLE "posts_blocks_process" CASCADE;
  DROP TABLE "posts_blocks_process_locales" CASCADE;
  DROP TABLE "posts_blocks_testimonials_items" CASCADE;
  DROP TABLE "posts_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "posts_blocks_testimonials" CASCADE;
  DROP TABLE "posts_blocks_testimonials_locales" CASCADE;
  DROP TABLE "posts_blocks_faq_items" CASCADE;
  DROP TABLE "posts_blocks_faq_items_locales" CASCADE;
  DROP TABLE "posts_blocks_faq" CASCADE;
  DROP TABLE "posts_blocks_faq_locales" CASCADE;
  DROP TABLE "posts_blocks_posts_teaser_ctas" CASCADE;
  DROP TABLE "posts_blocks_posts_teaser_ctas_locales" CASCADE;
  DROP TABLE "posts_blocks_posts_teaser" CASCADE;
  DROP TABLE "posts_blocks_posts_teaser_locales" CASCADE;
  DROP TABLE "posts_blocks_tech_stack_groups_items" CASCADE;
  DROP TABLE "posts_blocks_tech_stack_groups" CASCADE;
  DROP TABLE "posts_blocks_tech_stack_groups_locales" CASCADE;
  DROP TABLE "posts_blocks_tech_stack" CASCADE;
  DROP TABLE "posts_blocks_tech_stack_locales" CASCADE;
  DROP TABLE "posts_blocks_cta_ctas" CASCADE;
  DROP TABLE "posts_blocks_cta_ctas_locales" CASCADE;
  DROP TABLE "posts_blocks_cta" CASCADE;
  DROP TABLE "posts_blocks_cta_locales" CASCADE;
  DROP TABLE "posts_blocks_rich_text" CASCADE;
  DROP TABLE "posts_blocks_rich_text_locales" CASCADE;
  DROP TABLE "posts_blocks_media_block" CASCADE;
  DROP TABLE "posts_blocks_media_block_locales" CASCADE;
  DROP TABLE "posts_blocks_contact" CASCADE;
  DROP TABLE "posts_blocks_contact_locales" CASCADE;
  DROP TABLE "posts_blocks_booking" CASCADE;
  DROP TABLE "posts_blocks_booking_locales" CASCADE;
  DROP TABLE "posts_available_locales" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_texts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_stats_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hero" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_cloud_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "_posts_v_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_card_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_card_grid_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_items" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_process_steps" CASCADE;
  DROP TABLE "_posts_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_process" CASCADE;
  DROP TABLE "_posts_v_blocks_process_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_posts_teaser_ctas" CASCADE;
  DROP TABLE "_posts_v_blocks_posts_teaser_ctas_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_posts_teaser" CASCADE;
  DROP TABLE "_posts_v_blocks_posts_teaser_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_tech_stack_groups_items" CASCADE;
  DROP TABLE "_posts_v_blocks_tech_stack_groups" CASCADE;
  DROP TABLE "_posts_v_blocks_tech_stack_groups_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_tech_stack" CASCADE;
  DROP TABLE "_posts_v_blocks_tech_stack_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_ctas" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_ctas_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_cta" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_media_block" CASCADE;
  DROP TABLE "_posts_v_blocks_media_block_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_contact" CASCADE;
  DROP TABLE "_posts_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_booking" CASCADE;
  DROP TABLE "_posts_v_blocks_booking_locales" CASCADE;
  DROP TABLE "_posts_v_version_available_locales" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_texts" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "services_blocks_hero_ctas" CASCADE;
  DROP TABLE "services_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_hero_stats" CASCADE;
  DROP TABLE "services_blocks_hero_stats_locales" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_hero_locales" CASCADE;
  DROP TABLE "services_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "services_blocks_logo_cloud" CASCADE;
  DROP TABLE "services_blocks_logo_cloud_locales" CASCADE;
  DROP TABLE "services_blocks_card_grid_cards" CASCADE;
  DROP TABLE "services_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "services_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "services_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_card_grid" CASCADE;
  DROP TABLE "services_blocks_card_grid_locales" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats_items_locales" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_stats_locales" CASCADE;
  DROP TABLE "services_blocks_process_steps" CASCADE;
  DROP TABLE "services_blocks_process_steps_locales" CASCADE;
  DROP TABLE "services_blocks_process" CASCADE;
  DROP TABLE "services_blocks_process_locales" CASCADE;
  DROP TABLE "services_blocks_testimonials_items" CASCADE;
  DROP TABLE "services_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_testimonials_locales" CASCADE;
  DROP TABLE "services_blocks_faq_items" CASCADE;
  DROP TABLE "services_blocks_faq_items_locales" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_faq_locales" CASCADE;
  DROP TABLE "services_blocks_posts_teaser_ctas" CASCADE;
  DROP TABLE "services_blocks_posts_teaser_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_posts_teaser" CASCADE;
  DROP TABLE "services_blocks_posts_teaser_locales" CASCADE;
  DROP TABLE "services_blocks_tech_stack_groups_items" CASCADE;
  DROP TABLE "services_blocks_tech_stack_groups" CASCADE;
  DROP TABLE "services_blocks_tech_stack_groups_locales" CASCADE;
  DROP TABLE "services_blocks_tech_stack" CASCADE;
  DROP TABLE "services_blocks_tech_stack_locales" CASCADE;
  DROP TABLE "services_blocks_cta_ctas" CASCADE;
  DROP TABLE "services_blocks_cta_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_cta_locales" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_rich_text_locales" CASCADE;
  DROP TABLE "services_blocks_media_block" CASCADE;
  DROP TABLE "services_blocks_media_block_locales" CASCADE;
  DROP TABLE "services_blocks_contact" CASCADE;
  DROP TABLE "services_blocks_contact_locales" CASCADE;
  DROP TABLE "services_blocks_booking" CASCADE;
  DROP TABLE "services_blocks_booking_locales" CASCADE;
  DROP TABLE "services_available_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero_stats" CASCADE;
  DROP TABLE "_services_v_blocks_hero_stats_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_services_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_services_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_services_v_blocks_logo_cloud_locales" CASCADE;
  DROP TABLE "_services_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_services_v_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "_services_v_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_card_grid" CASCADE;
  DROP TABLE "_services_v_blocks_card_grid_locales" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_services_v_blocks_process" CASCADE;
  DROP TABLE "_services_v_blocks_process_locales" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_services_v_blocks_faq_items" CASCADE;
  DROP TABLE "_services_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_faq" CASCADE;
  DROP TABLE "_services_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_services_v_blocks_posts_teaser_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_posts_teaser_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_posts_teaser" CASCADE;
  DROP TABLE "_services_v_blocks_posts_teaser_locales" CASCADE;
  DROP TABLE "_services_v_blocks_tech_stack_groups_items" CASCADE;
  DROP TABLE "_services_v_blocks_tech_stack_groups" CASCADE;
  DROP TABLE "_services_v_blocks_tech_stack_groups_locales" CASCADE;
  DROP TABLE "_services_v_blocks_tech_stack" CASCADE;
  DROP TABLE "_services_v_blocks_tech_stack_locales" CASCADE;
  DROP TABLE "_services_v_blocks_cta_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_cta_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_services_v_blocks_media_block" CASCADE;
  DROP TABLE "_services_v_blocks_media_block_locales" CASCADE;
  DROP TABLE "_services_v_blocks_contact" CASCADE;
  DROP TABLE "_services_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_services_v_blocks_booking" CASCADE;
  DROP TABLE "_services_v_blocks_booking_locales" CASCADE;
  DROP TABLE "_services_v_version_available_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "jobs_available_locales" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_locales" CASCADE;
  DROP TABLE "_jobs_v_version_available_locales" CASCADE;
  DROP TABLE "_jobs_v" CASCADE;
  DROP TABLE "_jobs_v_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "applicant_files" CASCADE;
  DROP TABLE "job_applications" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_items_children" CASCADE;
  DROP TABLE "header_items_children_locales" CASCADE;
  DROP TABLE "header_items" CASCADE;
  DROP TABLE "header_items_locales" CASCADE;
  DROP TABLE "header_ctas" CASCADE;
  DROP TABLE "header_ctas_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "_header_v_version_items_children" CASCADE;
  DROP TABLE "_header_v_version_items_children_locales" CASCADE;
  DROP TABLE "_header_v_version_items" CASCADE;
  DROP TABLE "_header_v_version_items_locales" CASCADE;
  DROP TABLE "_header_v_version_ctas" CASCADE;
  DROP TABLE "_header_v_version_ctas_locales" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_header_v_locales" CASCADE;
  DROP TABLE "_header_v_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_legal_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "_footer_v_version_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_columns_links_locales" CASCADE;
  DROP TABLE "_footer_v_version_columns" CASCADE;
  DROP TABLE "_footer_v_version_columns_locales" CASCADE;
  DROP TABLE "_footer_v_version_legal_links" CASCADE;
  DROP TABLE "_footer_v_version_legal_links_locales" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_locales" CASCADE;
  DROP TABLE "_footer_v_rels" CASCADE;
  DROP TABLE "site_settings_social_profiles" CASCADE;
  DROP TABLE "site_settings_offices" CASCADE;
  DROP TABLE "site_settings_offices_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "site_settings_texts" CASCADE;
  DROP TABLE "_site_settings_v_version_social_profiles" CASCADE;
  DROP TABLE "_site_settings_v_version_offices" CASCADE;
  DROP TABLE "_site_settings_v_version_offices_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TABLE "_site_settings_v_texts" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_link_route";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_route";
  DROP TYPE "public"."enum_pages_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_card_grid_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_ctas_link_route";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_posts_teaser_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_posts_teaser_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_posts_teaser_ctas_link_route";
  DROP TYPE "public"."enum_pages_blocks_cta_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_ctas_link_route";
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_media_block_width";
  DROP TYPE "public"."enum_pages_available_locales";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_ctas_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_posts_teaser_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_posts_teaser_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_posts_teaser_ctas_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_cta_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_ctas_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_width";
  DROP TYPE "public"."enum__pages_v_version_available_locales";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_link_route";
  DROP TYPE "public"."enum_posts_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum_posts_blocks_card_grid_cards_link_route";
  DROP TYPE "public"."enum_posts_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum_posts_blocks_card_grid_ctas_link_type";
  DROP TYPE "public"."enum_posts_blocks_card_grid_ctas_link_route";
  DROP TYPE "public"."enum_posts_blocks_card_grid_columns";
  DROP TYPE "public"."enum_posts_blocks_posts_teaser_ctas_variant";
  DROP TYPE "public"."enum_posts_blocks_posts_teaser_ctas_link_type";
  DROP TYPE "public"."enum_posts_blocks_posts_teaser_ctas_link_route";
  DROP TYPE "public"."enum_posts_blocks_cta_ctas_variant";
  DROP TYPE "public"."enum_posts_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_ctas_link_route";
  DROP TYPE "public"."enum_posts_blocks_cta_tone";
  DROP TYPE "public"."enum_posts_blocks_rich_text_width";
  DROP TYPE "public"."enum_posts_blocks_media_block_width";
  DROP TYPE "public"."enum_posts_available_locales";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum__posts_v_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_hero_ctas_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_card_grid_cards_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum__posts_v_blocks_card_grid_ctas_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_card_grid_ctas_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__posts_v_blocks_posts_teaser_ctas_variant";
  DROP TYPE "public"."enum__posts_v_blocks_posts_teaser_ctas_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_posts_teaser_ctas_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_cta_ctas_variant";
  DROP TYPE "public"."enum__posts_v_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_ctas_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_cta_tone";
  DROP TYPE "public"."enum__posts_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__posts_v_blocks_media_block_width";
  DROP TYPE "public"."enum__posts_v_version_available_locales";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_services_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum_services_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum_services_blocks_hero_ctas_link_route";
  DROP TYPE "public"."enum_services_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum_services_blocks_card_grid_cards_link_route";
  DROP TYPE "public"."enum_services_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum_services_blocks_card_grid_ctas_link_type";
  DROP TYPE "public"."enum_services_blocks_card_grid_ctas_link_route";
  DROP TYPE "public"."enum_services_blocks_card_grid_columns";
  DROP TYPE "public"."enum_services_blocks_posts_teaser_ctas_variant";
  DROP TYPE "public"."enum_services_blocks_posts_teaser_ctas_link_type";
  DROP TYPE "public"."enum_services_blocks_posts_teaser_ctas_link_route";
  DROP TYPE "public"."enum_services_blocks_cta_ctas_variant";
  DROP TYPE "public"."enum_services_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum_services_blocks_cta_ctas_link_route";
  DROP TYPE "public"."enum_services_blocks_cta_tone";
  DROP TYPE "public"."enum_services_blocks_rich_text_width";
  DROP TYPE "public"."enum_services_blocks_media_block_width";
  DROP TYPE "public"."enum_services_available_locales";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum__services_v_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum__services_v_blocks_hero_ctas_link_route";
  DROP TYPE "public"."enum__services_v_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum__services_v_blocks_card_grid_cards_link_route";
  DROP TYPE "public"."enum__services_v_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum__services_v_blocks_card_grid_ctas_link_type";
  DROP TYPE "public"."enum__services_v_blocks_card_grid_ctas_link_route";
  DROP TYPE "public"."enum__services_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__services_v_blocks_posts_teaser_ctas_variant";
  DROP TYPE "public"."enum__services_v_blocks_posts_teaser_ctas_link_type";
  DROP TYPE "public"."enum__services_v_blocks_posts_teaser_ctas_link_route";
  DROP TYPE "public"."enum__services_v_blocks_cta_ctas_variant";
  DROP TYPE "public"."enum__services_v_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum__services_v_blocks_cta_ctas_link_route";
  DROP TYPE "public"."enum__services_v_blocks_cta_tone";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__services_v_blocks_media_block_width";
  DROP TYPE "public"."enum__services_v_version_available_locales";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_jobs_available_locales";
  DROP TYPE "public"."enum_jobs_work_model";
  DROP TYPE "public"."enum_jobs_employment_type";
  DROP TYPE "public"."enum_jobs_role_status";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum__jobs_v_version_available_locales";
  DROP TYPE "public"."enum__jobs_v_version_work_model";
  DROP TYPE "public"."enum__jobs_v_version_employment_type";
  DROP TYPE "public"."enum__jobs_v_version_role_status";
  DROP TYPE "public"."enum__jobs_v_version_status";
  DROP TYPE "public"."enum__jobs_v_published_locale";
  DROP TYPE "public"."enum_job_applications_status";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_header_items_children_link_type";
  DROP TYPE "public"."enum_header_items_children_link_route";
  DROP TYPE "public"."enum_header_items_link_type";
  DROP TYPE "public"."enum_header_items_link_route";
  DROP TYPE "public"."enum_header_ctas_variant";
  DROP TYPE "public"."enum_header_ctas_link_type";
  DROP TYPE "public"."enum_header_ctas_link_route";
  DROP TYPE "public"."enum_header_announcement_link_type";
  DROP TYPE "public"."enum_header_announcement_link_route";
  DROP TYPE "public"."enum__header_v_version_items_children_link_type";
  DROP TYPE "public"."enum__header_v_version_items_children_link_route";
  DROP TYPE "public"."enum__header_v_version_items_link_type";
  DROP TYPE "public"."enum__header_v_version_items_link_route";
  DROP TYPE "public"."enum__header_v_version_ctas_variant";
  DROP TYPE "public"."enum__header_v_version_ctas_link_type";
  DROP TYPE "public"."enum__header_v_version_ctas_link_route";
  DROP TYPE "public"."enum__header_v_version_announcement_link_type";
  DROP TYPE "public"."enum__header_v_version_announcement_link_route";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_route";
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_route";
  DROP TYPE "public"."enum__footer_v_version_columns_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_columns_links_link_route";
  DROP TYPE "public"."enum__footer_v_version_legal_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_legal_links_link_route";
  DROP TYPE "public"."enum_site_settings_social_profiles_platform";
  DROP TYPE "public"."enum_site_settings_consent_mode";
  DROP TYPE "public"."enum__site_settings_v_version_social_profiles_platform";
  DROP TYPE "public"."enum__site_settings_v_version_consent_mode";`)
}
