import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_mosaic_kind" AS ENUM('image', 'stat');
  CREATE TYPE "public"."enum_pages_blocks_hero_mosaic_span" AS ENUM('normal', 'tall', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_hero_mosaic_tone" AS ENUM('brand', 'emerald', 'indigo', 'ink');
  CREATE TYPE "public"."enum_pages_blocks_talent_showcase_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_talent_showcase_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_talent_showcase_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_mosaic_kind" AS ENUM('image', 'stat');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_mosaic_span" AS ENUM('normal', 'tall', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_mosaic_tone" AS ENUM('brand', 'emerald', 'indigo', 'ink');
  CREATE TYPE "public"."enum__pages_v_blocks_talent_showcase_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_talent_showcase_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_talent_showcase_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_hero_mosaic_kind" AS ENUM('image', 'stat');
  CREATE TYPE "public"."enum_posts_blocks_hero_mosaic_span" AS ENUM('normal', 'tall', 'wide');
  CREATE TYPE "public"."enum_posts_blocks_hero_mosaic_tone" AS ENUM('brand', 'emerald', 'indigo', 'ink');
  CREATE TYPE "public"."enum_posts_blocks_talent_showcase_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_talent_showcase_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_talent_showcase_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_mosaic_kind" AS ENUM('image', 'stat');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_mosaic_span" AS ENUM('normal', 'tall', 'wide');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_mosaic_tone" AS ENUM('brand', 'emerald', 'indigo', 'ink');
  CREATE TYPE "public"."enum__posts_v_blocks_talent_showcase_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_talent_showcase_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_talent_showcase_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_hero_mosaic_kind" AS ENUM('image', 'stat');
  CREATE TYPE "public"."enum_services_blocks_hero_mosaic_span" AS ENUM('normal', 'tall', 'wide');
  CREATE TYPE "public"."enum_services_blocks_hero_mosaic_tone" AS ENUM('brand', 'emerald', 'indigo', 'ink');
  CREATE TYPE "public"."enum_services_blocks_talent_showcase_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_services_blocks_talent_showcase_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_talent_showcase_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_hero_mosaic_kind" AS ENUM('image', 'stat');
  CREATE TYPE "public"."enum__services_v_blocks_hero_mosaic_span" AS ENUM('normal', 'tall', 'wide');
  CREATE TYPE "public"."enum__services_v_blocks_hero_mosaic_tone" AS ENUM('brand', 'emerald', 'indigo', 'ink');
  CREATE TYPE "public"."enum__services_v_blocks_talent_showcase_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__services_v_blocks_talent_showcase_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_talent_showcase_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TABLE "pages_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_rotating_words_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_mosaic" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_hero_mosaic_kind" DEFAULT 'image',
  	"span" "enum_pages_blocks_hero_mosaic_span" DEFAULT 'normal',
  	"tone" "enum_pages_blocks_hero_mosaic_tone" DEFAULT 'brand',
  	"image_id" integer,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_mosaic_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"experience" varchar,
  	"match" numeric,
  	"evaluated" boolean DEFAULT true,
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_talent_showcase_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_talent_showcase_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_talent_showcase_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_talent_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_talent_showcase_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"panel_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_rotating_words_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_mosaic" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_hero_mosaic_kind" DEFAULT 'image',
  	"span" "enum__pages_v_blocks_hero_mosaic_span" DEFAULT 'normal',
  	"tone" "enum__pages_v_blocks_hero_mosaic_tone" DEFAULT 'brand',
  	"image_id" integer,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_mosaic_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"experience" varchar,
  	"match" numeric,
  	"evaluated" boolean DEFAULT true,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_talent_showcase_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_talent_showcase_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_talent_showcase_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_talent_showcase_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"panel_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero_rotating_words_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "posts_blocks_hero_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero_mosaic" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_posts_blocks_hero_mosaic_kind" DEFAULT 'image',
  	"span" "enum_posts_blocks_hero_mosaic_span" DEFAULT 'normal',
  	"tone" "enum_posts_blocks_hero_mosaic_tone" DEFAULT 'brand',
  	"image_id" integer,
  	"value" varchar
  );
  
  CREATE TABLE "posts_blocks_hero_mosaic_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"experience" varchar,
  	"match" numeric,
  	"evaluated" boolean DEFAULT true,
  	"avatar_id" integer
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_talent_showcase_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_posts_blocks_talent_showcase_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_talent_showcase_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_talent_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_talent_showcase_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"panel_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_rotating_words_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hero_mosaic" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__posts_v_blocks_hero_mosaic_kind" DEFAULT 'image',
  	"span" "enum__posts_v_blocks_hero_mosaic_span" DEFAULT 'normal',
  	"tone" "enum__posts_v_blocks_hero_mosaic_tone" DEFAULT 'brand',
  	"image_id" integer,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_mosaic_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"experience" varchar,
  	"match" numeric,
  	"evaluated" boolean DEFAULT true,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_talent_showcase_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__posts_v_blocks_talent_showcase_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_talent_showcase_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_talent_showcase_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"panel_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_rotating_words_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "services_blocks_hero_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_mosaic" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_services_blocks_hero_mosaic_kind" DEFAULT 'image',
  	"span" "enum_services_blocks_hero_mosaic_span" DEFAULT 'normal',
  	"tone" "enum_services_blocks_hero_mosaic_tone" DEFAULT 'brand',
  	"image_id" integer,
  	"value" varchar
  );
  
  CREATE TABLE "services_blocks_hero_mosaic_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_talent_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_talent_showcase_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_talent_showcase_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_talent_showcase_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_talent_showcase_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"experience" varchar,
  	"match" numeric,
  	"evaluated" boolean DEFAULT true,
  	"avatar_id" integer
  );
  
  CREATE TABLE "services_blocks_talent_showcase_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_talent_showcase_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_talent_showcase_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_services_blocks_talent_showcase_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_talent_showcase_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_talent_showcase_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_talent_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_talent_showcase_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"panel_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_rotating_words_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero_mosaic" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__services_v_blocks_hero_mosaic_kind" DEFAULT 'image',
  	"span" "enum__services_v_blocks_hero_mosaic_span" DEFAULT 'normal',
  	"tone" "enum__services_v_blocks_hero_mosaic_tone" DEFAULT 'brand',
  	"image_id" integer,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_mosaic_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"experience" varchar,
  	"match" numeric,
  	"evaluated" boolean DEFAULT true,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_talent_showcase_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__services_v_blocks_talent_showcase_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_talent_showcase_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_talent_showcase_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"panel_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "posts_blocks_hero" DROP CONSTRAINT "posts_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "_posts_v_blocks_hero" DROP CONSTRAINT "_posts_v_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "services_blocks_hero" DROP CONSTRAINT "services_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "_services_v_blocks_hero" DROP CONSTRAINT "_services_v_blocks_hero_media_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_media_idx";
  DROP INDEX "_pages_v_blocks_hero_media_idx";
  DROP INDEX "posts_blocks_hero_media_idx";
  DROP INDEX "_posts_v_blocks_hero_media_idx";
  DROP INDEX "services_blocks_hero_media_idx";
  DROP INDEX "_services_v_blocks_hero_media_idx";
  ALTER TABLE "pages_blocks_logo_cloud_locales" ADD COLUMN "statement_before" varchar;
  ALTER TABLE "pages_blocks_logo_cloud_locales" ADD COLUMN "statement_highlight" varchar;
  ALTER TABLE "pages_blocks_logo_cloud_locales" ADD COLUMN "statement_after" varchar;
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" ADD COLUMN "statement_before" varchar;
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" ADD COLUMN "statement_highlight" varchar;
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" ADD COLUMN "statement_after" varchar;
  ALTER TABLE "posts_blocks_logo_cloud_locales" ADD COLUMN "statement_before" varchar;
  ALTER TABLE "posts_blocks_logo_cloud_locales" ADD COLUMN "statement_highlight" varchar;
  ALTER TABLE "posts_blocks_logo_cloud_locales" ADD COLUMN "statement_after" varchar;
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" ADD COLUMN "statement_before" varchar;
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" ADD COLUMN "statement_highlight" varchar;
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" ADD COLUMN "statement_after" varchar;
  ALTER TABLE "services_blocks_logo_cloud_locales" ADD COLUMN "statement_before" varchar;
  ALTER TABLE "services_blocks_logo_cloud_locales" ADD COLUMN "statement_highlight" varchar;
  ALTER TABLE "services_blocks_logo_cloud_locales" ADD COLUMN "statement_after" varchar;
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" ADD COLUMN "statement_before" varchar;
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" ADD COLUMN "statement_highlight" varchar;
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" ADD COLUMN "statement_after" varchar;
  ALTER TABLE "pages_blocks_hero_rotating_words" ADD CONSTRAINT "pages_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_rotating_words_locales" ADD CONSTRAINT "pages_blocks_hero_rotating_words_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_rotating_words"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_bullets" ADD CONSTRAINT "pages_blocks_hero_bullets_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_bullets" ADD CONSTRAINT "pages_blocks_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_bullets_locales" ADD CONSTRAINT "pages_blocks_hero_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_mosaic" ADD CONSTRAINT "pages_blocks_hero_mosaic_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_mosaic" ADD CONSTRAINT "pages_blocks_hero_mosaic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_mosaic_locales" ADD CONSTRAINT "pages_blocks_hero_mosaic_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_mosaic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_bullets" ADD CONSTRAINT "pages_blocks_talent_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_bullets_locales" ADD CONSTRAINT "pages_blocks_talent_showcase_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_roles" ADD CONSTRAINT "pages_blocks_talent_showcase_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_roles_locales" ADD CONSTRAINT "pages_blocks_talent_showcase_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_people" ADD CONSTRAINT "pages_blocks_talent_showcase_people_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_people" ADD CONSTRAINT "pages_blocks_talent_showcase_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_people_locales" ADD CONSTRAINT "pages_blocks_talent_showcase_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_ctas" ADD CONSTRAINT "pages_blocks_talent_showcase_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_ctas_locales" ADD CONSTRAINT "pages_blocks_talent_showcase_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase" ADD CONSTRAINT "pages_blocks_talent_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_talent_showcase_locales" ADD CONSTRAINT "pages_blocks_talent_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_rotating_words" ADD CONSTRAINT "_pages_v_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_rotating_words_locales" ADD CONSTRAINT "_pages_v_blocks_hero_rotating_words_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_rotating_words"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_bullets" ADD CONSTRAINT "_pages_v_blocks_hero_bullets_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_bullets" ADD CONSTRAINT "_pages_v_blocks_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_hero_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_mosaic" ADD CONSTRAINT "_pages_v_blocks_hero_mosaic_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_mosaic" ADD CONSTRAINT "_pages_v_blocks_hero_mosaic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_mosaic_locales" ADD CONSTRAINT "_pages_v_blocks_hero_mosaic_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_mosaic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_bullets" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_roles" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_roles_locales" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_people" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_people_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_people" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_people_locales" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_ctas" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_talent_showcase_locales" ADD CONSTRAINT "_pages_v_blocks_talent_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_rotating_words" ADD CONSTRAINT "posts_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_rotating_words_locales" ADD CONSTRAINT "posts_blocks_hero_rotating_words_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero_rotating_words"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_bullets" ADD CONSTRAINT "posts_blocks_hero_bullets_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_bullets" ADD CONSTRAINT "posts_blocks_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_bullets_locales" ADD CONSTRAINT "posts_blocks_hero_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_mosaic" ADD CONSTRAINT "posts_blocks_hero_mosaic_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_mosaic" ADD CONSTRAINT "posts_blocks_hero_mosaic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_mosaic_locales" ADD CONSTRAINT "posts_blocks_hero_mosaic_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero_mosaic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_bullets" ADD CONSTRAINT "posts_blocks_talent_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_bullets_locales" ADD CONSTRAINT "posts_blocks_talent_showcase_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_roles" ADD CONSTRAINT "posts_blocks_talent_showcase_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_roles_locales" ADD CONSTRAINT "posts_blocks_talent_showcase_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_people" ADD CONSTRAINT "posts_blocks_talent_showcase_people_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_people" ADD CONSTRAINT "posts_blocks_talent_showcase_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_people_locales" ADD CONSTRAINT "posts_blocks_talent_showcase_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_ctas" ADD CONSTRAINT "posts_blocks_talent_showcase_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_ctas_locales" ADD CONSTRAINT "posts_blocks_talent_showcase_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase" ADD CONSTRAINT "posts_blocks_talent_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_talent_showcase_locales" ADD CONSTRAINT "posts_blocks_talent_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_rotating_words" ADD CONSTRAINT "_posts_v_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_rotating_words_locales" ADD CONSTRAINT "_posts_v_blocks_hero_rotating_words_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero_rotating_words"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_bullets" ADD CONSTRAINT "_posts_v_blocks_hero_bullets_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_bullets" ADD CONSTRAINT "_posts_v_blocks_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_bullets_locales" ADD CONSTRAINT "_posts_v_blocks_hero_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_mosaic" ADD CONSTRAINT "_posts_v_blocks_hero_mosaic_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_mosaic" ADD CONSTRAINT "_posts_v_blocks_hero_mosaic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_mosaic_locales" ADD CONSTRAINT "_posts_v_blocks_hero_mosaic_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero_mosaic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_bullets" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_bullets_locales" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_roles" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_roles_locales" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_people" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_people_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_people" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_people_locales" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_ctas" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_ctas_locales" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_talent_showcase_locales" ADD CONSTRAINT "_posts_v_blocks_talent_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_rotating_words" ADD CONSTRAINT "services_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_rotating_words_locales" ADD CONSTRAINT "services_blocks_hero_rotating_words_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_rotating_words"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_bullets" ADD CONSTRAINT "services_blocks_hero_bullets_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_bullets" ADD CONSTRAINT "services_blocks_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_bullets_locales" ADD CONSTRAINT "services_blocks_hero_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_mosaic" ADD CONSTRAINT "services_blocks_hero_mosaic_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_mosaic" ADD CONSTRAINT "services_blocks_hero_mosaic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_mosaic_locales" ADD CONSTRAINT "services_blocks_hero_mosaic_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_mosaic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_bullets" ADD CONSTRAINT "services_blocks_talent_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_bullets_locales" ADD CONSTRAINT "services_blocks_talent_showcase_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_roles" ADD CONSTRAINT "services_blocks_talent_showcase_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_roles_locales" ADD CONSTRAINT "services_blocks_talent_showcase_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_people" ADD CONSTRAINT "services_blocks_talent_showcase_people_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_people" ADD CONSTRAINT "services_blocks_talent_showcase_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_people_locales" ADD CONSTRAINT "services_blocks_talent_showcase_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_ctas" ADD CONSTRAINT "services_blocks_talent_showcase_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_ctas_locales" ADD CONSTRAINT "services_blocks_talent_showcase_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase" ADD CONSTRAINT "services_blocks_talent_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_talent_showcase_locales" ADD CONSTRAINT "services_blocks_talent_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_rotating_words" ADD CONSTRAINT "_services_v_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_rotating_words_locales" ADD CONSTRAINT "_services_v_blocks_hero_rotating_words_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero_rotating_words"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_bullets" ADD CONSTRAINT "_services_v_blocks_hero_bullets_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_bullets" ADD CONSTRAINT "_services_v_blocks_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_bullets_locales" ADD CONSTRAINT "_services_v_blocks_hero_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_mosaic" ADD CONSTRAINT "_services_v_blocks_hero_mosaic_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_mosaic" ADD CONSTRAINT "_services_v_blocks_hero_mosaic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_mosaic_locales" ADD CONSTRAINT "_services_v_blocks_hero_mosaic_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero_mosaic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_bullets" ADD CONSTRAINT "_services_v_blocks_talent_showcase_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_bullets_locales" ADD CONSTRAINT "_services_v_blocks_talent_showcase_bullets_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_roles" ADD CONSTRAINT "_services_v_blocks_talent_showcase_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_roles_locales" ADD CONSTRAINT "_services_v_blocks_talent_showcase_roles_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_people" ADD CONSTRAINT "_services_v_blocks_talent_showcase_people_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_people" ADD CONSTRAINT "_services_v_blocks_talent_showcase_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_people_locales" ADD CONSTRAINT "_services_v_blocks_talent_showcase_people_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_ctas" ADD CONSTRAINT "_services_v_blocks_talent_showcase_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_ctas_locales" ADD CONSTRAINT "_services_v_blocks_talent_showcase_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase" ADD CONSTRAINT "_services_v_blocks_talent_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_talent_showcase_locales" ADD CONSTRAINT "_services_v_blocks_talent_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_talent_showcase"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_rotating_words_order_idx" ON "pages_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_rotating_words_parent_id_idx" ON "pages_blocks_hero_rotating_words" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_rotating_words_locales_locale_parent_id_un" ON "pages_blocks_hero_rotating_words_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_bullets_order_idx" ON "pages_blocks_hero_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_bullets_parent_id_idx" ON "pages_blocks_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_bullets_icon_idx" ON "pages_blocks_hero_bullets" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_bullets_locales_locale_parent_id_unique" ON "pages_blocks_hero_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_mosaic_order_idx" ON "pages_blocks_hero_mosaic" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_mosaic_parent_id_idx" ON "pages_blocks_hero_mosaic" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_mosaic_image_idx" ON "pages_blocks_hero_mosaic" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_mosaic_locales_locale_parent_id_unique" ON "pages_blocks_hero_mosaic_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_talent_showcase_bullets_order_idx" ON "pages_blocks_talent_showcase_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_talent_showcase_bullets_parent_id_idx" ON "pages_blocks_talent_showcase_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_talent_showcase_bullets_locales_locale_parent_i" ON "pages_blocks_talent_showcase_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_talent_showcase_roles_order_idx" ON "pages_blocks_talent_showcase_roles" USING btree ("_order");
  CREATE INDEX "pages_blocks_talent_showcase_roles_parent_id_idx" ON "pages_blocks_talent_showcase_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_talent_showcase_roles_locales_locale_parent_id_" ON "pages_blocks_talent_showcase_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_talent_showcase_people_order_idx" ON "pages_blocks_talent_showcase_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_talent_showcase_people_parent_id_idx" ON "pages_blocks_talent_showcase_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_talent_showcase_people_avatar_idx" ON "pages_blocks_talent_showcase_people" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "pages_blocks_talent_showcase_people_locales_locale_parent_id" ON "pages_blocks_talent_showcase_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_talent_showcase_ctas_order_idx" ON "pages_blocks_talent_showcase_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_talent_showcase_ctas_parent_id_idx" ON "pages_blocks_talent_showcase_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_talent_showcase_ctas_locales_locale_parent_id_u" ON "pages_blocks_talent_showcase_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_talent_showcase_order_idx" ON "pages_blocks_talent_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_talent_showcase_parent_id_idx" ON "pages_blocks_talent_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_talent_showcase_path_idx" ON "pages_blocks_talent_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_talent_showcase_locales_locale_parent_id_unique" ON "pages_blocks_talent_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_rotating_words_order_idx" ON "_pages_v_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_rotating_words_parent_id_idx" ON "_pages_v_blocks_hero_rotating_words" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_rotating_words_locales_locale_parent_id" ON "_pages_v_blocks_hero_rotating_words_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_bullets_order_idx" ON "_pages_v_blocks_hero_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_bullets_parent_id_idx" ON "_pages_v_blocks_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_bullets_icon_idx" ON "_pages_v_blocks_hero_bullets" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_bullets_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_mosaic_order_idx" ON "_pages_v_blocks_hero_mosaic" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_mosaic_parent_id_idx" ON "_pages_v_blocks_hero_mosaic" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_mosaic_image_idx" ON "_pages_v_blocks_hero_mosaic" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_mosaic_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_mosaic_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_talent_showcase_bullets_order_idx" ON "_pages_v_blocks_talent_showcase_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_talent_showcase_bullets_parent_id_idx" ON "_pages_v_blocks_talent_showcase_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_talent_showcase_bullets_locales_locale_paren" ON "_pages_v_blocks_talent_showcase_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_talent_showcase_roles_order_idx" ON "_pages_v_blocks_talent_showcase_roles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_talent_showcase_roles_parent_id_idx" ON "_pages_v_blocks_talent_showcase_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_talent_showcase_roles_locales_locale_parent_" ON "_pages_v_blocks_talent_showcase_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_talent_showcase_people_order_idx" ON "_pages_v_blocks_talent_showcase_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_talent_showcase_people_parent_id_idx" ON "_pages_v_blocks_talent_showcase_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_talent_showcase_people_avatar_idx" ON "_pages_v_blocks_talent_showcase_people" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_talent_showcase_people_locales_locale_parent" ON "_pages_v_blocks_talent_showcase_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_talent_showcase_ctas_order_idx" ON "_pages_v_blocks_talent_showcase_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_talent_showcase_ctas_parent_id_idx" ON "_pages_v_blocks_talent_showcase_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_talent_showcase_ctas_locales_locale_parent_i" ON "_pages_v_blocks_talent_showcase_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_talent_showcase_order_idx" ON "_pages_v_blocks_talent_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_talent_showcase_parent_id_idx" ON "_pages_v_blocks_talent_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_talent_showcase_path_idx" ON "_pages_v_blocks_talent_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_talent_showcase_locales_locale_parent_id_uni" ON "_pages_v_blocks_talent_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hero_rotating_words_order_idx" ON "posts_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_rotating_words_parent_id_idx" ON "posts_blocks_hero_rotating_words" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_hero_rotating_words_locales_locale_parent_id_un" ON "posts_blocks_hero_rotating_words_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hero_bullets_order_idx" ON "posts_blocks_hero_bullets" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_bullets_parent_id_idx" ON "posts_blocks_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_bullets_icon_idx" ON "posts_blocks_hero_bullets" USING btree ("icon_id");
  CREATE UNIQUE INDEX "posts_blocks_hero_bullets_locales_locale_parent_id_unique" ON "posts_blocks_hero_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hero_mosaic_order_idx" ON "posts_blocks_hero_mosaic" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_mosaic_parent_id_idx" ON "posts_blocks_hero_mosaic" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_mosaic_image_idx" ON "posts_blocks_hero_mosaic" USING btree ("image_id");
  CREATE UNIQUE INDEX "posts_blocks_hero_mosaic_locales_locale_parent_id_unique" ON "posts_blocks_hero_mosaic_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_talent_showcase_bullets_order_idx" ON "posts_blocks_talent_showcase_bullets" USING btree ("_order");
  CREATE INDEX "posts_blocks_talent_showcase_bullets_parent_id_idx" ON "posts_blocks_talent_showcase_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_talent_showcase_bullets_locales_locale_parent_i" ON "posts_blocks_talent_showcase_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_talent_showcase_roles_order_idx" ON "posts_blocks_talent_showcase_roles" USING btree ("_order");
  CREATE INDEX "posts_blocks_talent_showcase_roles_parent_id_idx" ON "posts_blocks_talent_showcase_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_talent_showcase_roles_locales_locale_parent_id_" ON "posts_blocks_talent_showcase_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_talent_showcase_people_order_idx" ON "posts_blocks_talent_showcase_people" USING btree ("_order");
  CREATE INDEX "posts_blocks_talent_showcase_people_parent_id_idx" ON "posts_blocks_talent_showcase_people" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_talent_showcase_people_avatar_idx" ON "posts_blocks_talent_showcase_people" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "posts_blocks_talent_showcase_people_locales_locale_parent_id" ON "posts_blocks_talent_showcase_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_talent_showcase_ctas_order_idx" ON "posts_blocks_talent_showcase_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_talent_showcase_ctas_parent_id_idx" ON "posts_blocks_talent_showcase_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_talent_showcase_ctas_locales_locale_parent_id_u" ON "posts_blocks_talent_showcase_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_talent_showcase_order_idx" ON "posts_blocks_talent_showcase" USING btree ("_order");
  CREATE INDEX "posts_blocks_talent_showcase_parent_id_idx" ON "posts_blocks_talent_showcase" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_talent_showcase_path_idx" ON "posts_blocks_talent_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_talent_showcase_locales_locale_parent_id_unique" ON "posts_blocks_talent_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_rotating_words_order_idx" ON "_posts_v_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_rotating_words_parent_id_idx" ON "_posts_v_blocks_hero_rotating_words" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_rotating_words_locales_locale_parent_id" ON "_posts_v_blocks_hero_rotating_words_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_bullets_order_idx" ON "_posts_v_blocks_hero_bullets" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_bullets_parent_id_idx" ON "_posts_v_blocks_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_bullets_icon_idx" ON "_posts_v_blocks_hero_bullets" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_bullets_locales_locale_parent_id_unique" ON "_posts_v_blocks_hero_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_mosaic_order_idx" ON "_posts_v_blocks_hero_mosaic" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_mosaic_parent_id_idx" ON "_posts_v_blocks_hero_mosaic" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_mosaic_image_idx" ON "_posts_v_blocks_hero_mosaic" USING btree ("image_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_mosaic_locales_locale_parent_id_unique" ON "_posts_v_blocks_hero_mosaic_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_talent_showcase_bullets_order_idx" ON "_posts_v_blocks_talent_showcase_bullets" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_talent_showcase_bullets_parent_id_idx" ON "_posts_v_blocks_talent_showcase_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_talent_showcase_bullets_locales_locale_paren" ON "_posts_v_blocks_talent_showcase_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_talent_showcase_roles_order_idx" ON "_posts_v_blocks_talent_showcase_roles" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_talent_showcase_roles_parent_id_idx" ON "_posts_v_blocks_talent_showcase_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_talent_showcase_roles_locales_locale_parent_" ON "_posts_v_blocks_talent_showcase_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_talent_showcase_people_order_idx" ON "_posts_v_blocks_talent_showcase_people" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_talent_showcase_people_parent_id_idx" ON "_posts_v_blocks_talent_showcase_people" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_talent_showcase_people_avatar_idx" ON "_posts_v_blocks_talent_showcase_people" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_talent_showcase_people_locales_locale_parent" ON "_posts_v_blocks_talent_showcase_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_talent_showcase_ctas_order_idx" ON "_posts_v_blocks_talent_showcase_ctas" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_talent_showcase_ctas_parent_id_idx" ON "_posts_v_blocks_talent_showcase_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_talent_showcase_ctas_locales_locale_parent_i" ON "_posts_v_blocks_talent_showcase_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_talent_showcase_order_idx" ON "_posts_v_blocks_talent_showcase" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_talent_showcase_parent_id_idx" ON "_posts_v_blocks_talent_showcase" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_talent_showcase_path_idx" ON "_posts_v_blocks_talent_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_talent_showcase_locales_locale_parent_id_uni" ON "_posts_v_blocks_talent_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_rotating_words_order_idx" ON "services_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_rotating_words_parent_id_idx" ON "services_blocks_hero_rotating_words" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hero_rotating_words_locales_locale_parent_id" ON "services_blocks_hero_rotating_words_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_bullets_order_idx" ON "services_blocks_hero_bullets" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_bullets_parent_id_idx" ON "services_blocks_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_bullets_icon_idx" ON "services_blocks_hero_bullets" USING btree ("icon_id");
  CREATE UNIQUE INDEX "services_blocks_hero_bullets_locales_locale_parent_id_unique" ON "services_blocks_hero_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_mosaic_order_idx" ON "services_blocks_hero_mosaic" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_mosaic_parent_id_idx" ON "services_blocks_hero_mosaic" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_mosaic_image_idx" ON "services_blocks_hero_mosaic" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_blocks_hero_mosaic_locales_locale_parent_id_unique" ON "services_blocks_hero_mosaic_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_talent_showcase_bullets_order_idx" ON "services_blocks_talent_showcase_bullets" USING btree ("_order");
  CREATE INDEX "services_blocks_talent_showcase_bullets_parent_id_idx" ON "services_blocks_talent_showcase_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_talent_showcase_bullets_locales_locale_paren" ON "services_blocks_talent_showcase_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_talent_showcase_roles_order_idx" ON "services_blocks_talent_showcase_roles" USING btree ("_order");
  CREATE INDEX "services_blocks_talent_showcase_roles_parent_id_idx" ON "services_blocks_talent_showcase_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_talent_showcase_roles_locales_locale_parent_" ON "services_blocks_talent_showcase_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_talent_showcase_people_order_idx" ON "services_blocks_talent_showcase_people" USING btree ("_order");
  CREATE INDEX "services_blocks_talent_showcase_people_parent_id_idx" ON "services_blocks_talent_showcase_people" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_talent_showcase_people_avatar_idx" ON "services_blocks_talent_showcase_people" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "services_blocks_talent_showcase_people_locales_locale_parent" ON "services_blocks_talent_showcase_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_talent_showcase_ctas_order_idx" ON "services_blocks_talent_showcase_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_talent_showcase_ctas_parent_id_idx" ON "services_blocks_talent_showcase_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_talent_showcase_ctas_locales_locale_parent_i" ON "services_blocks_talent_showcase_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_talent_showcase_order_idx" ON "services_blocks_talent_showcase" USING btree ("_order");
  CREATE INDEX "services_blocks_talent_showcase_parent_id_idx" ON "services_blocks_talent_showcase" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_talent_showcase_path_idx" ON "services_blocks_talent_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_talent_showcase_locales_locale_parent_id_uni" ON "services_blocks_talent_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_rotating_words_order_idx" ON "_services_v_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_rotating_words_parent_id_idx" ON "_services_v_blocks_hero_rotating_words" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_rotating_words_locales_locale_parent" ON "_services_v_blocks_hero_rotating_words_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_bullets_order_idx" ON "_services_v_blocks_hero_bullets" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_bullets_parent_id_idx" ON "_services_v_blocks_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_bullets_icon_idx" ON "_services_v_blocks_hero_bullets" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_bullets_locales_locale_parent_id_uni" ON "_services_v_blocks_hero_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_mosaic_order_idx" ON "_services_v_blocks_hero_mosaic" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_mosaic_parent_id_idx" ON "_services_v_blocks_hero_mosaic" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_mosaic_image_idx" ON "_services_v_blocks_hero_mosaic" USING btree ("image_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_mosaic_locales_locale_parent_id_uniq" ON "_services_v_blocks_hero_mosaic_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_talent_showcase_bullets_order_idx" ON "_services_v_blocks_talent_showcase_bullets" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_talent_showcase_bullets_parent_id_idx" ON "_services_v_blocks_talent_showcase_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_talent_showcase_bullets_locales_locale_pa" ON "_services_v_blocks_talent_showcase_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_talent_showcase_roles_order_idx" ON "_services_v_blocks_talent_showcase_roles" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_talent_showcase_roles_parent_id_idx" ON "_services_v_blocks_talent_showcase_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_talent_showcase_roles_locales_locale_pare" ON "_services_v_blocks_talent_showcase_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_talent_showcase_people_order_idx" ON "_services_v_blocks_talent_showcase_people" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_talent_showcase_people_parent_id_idx" ON "_services_v_blocks_talent_showcase_people" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_talent_showcase_people_avatar_idx" ON "_services_v_blocks_talent_showcase_people" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "_services_v_blocks_talent_showcase_people_locales_locale_par" ON "_services_v_blocks_talent_showcase_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_talent_showcase_ctas_order_idx" ON "_services_v_blocks_talent_showcase_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_talent_showcase_ctas_parent_id_idx" ON "_services_v_blocks_talent_showcase_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_talent_showcase_ctas_locales_locale_paren" ON "_services_v_blocks_talent_showcase_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_talent_showcase_order_idx" ON "_services_v_blocks_talent_showcase" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_talent_showcase_parent_id_idx" ON "_services_v_blocks_talent_showcase" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_talent_showcase_path_idx" ON "_services_v_blocks_talent_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_talent_showcase_locales_locale_parent_id_" ON "_services_v_blocks_talent_showcase_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "media_id";
  ALTER TABLE "posts_blocks_hero" DROP COLUMN "media_id";
  ALTER TABLE "_posts_v_blocks_hero" DROP COLUMN "media_id";
  ALTER TABLE "services_blocks_hero" DROP COLUMN "media_id";
  ALTER TABLE "_services_v_blocks_hero" DROP COLUMN "media_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_rotating_words_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_mosaic" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_mosaic_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_roles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_people_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_ctas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talent_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_rotating_words_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_mosaic" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_mosaic_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_roles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_people_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_ctas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talent_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_rotating_words_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_mosaic" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_mosaic_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_roles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_people_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_ctas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_talent_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_rotating_words_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_mosaic" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_mosaic_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_roles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_people_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_ctas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_talent_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero_rotating_words_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero_mosaic" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero_mosaic_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_roles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_people_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_ctas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_talent_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero_rotating_words_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero_mosaic" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero_mosaic_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_roles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_people_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_ctas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_talent_showcase_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_rotating_words" CASCADE;
  DROP TABLE "pages_blocks_hero_rotating_words_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_bullets" CASCADE;
  DROP TABLE "pages_blocks_hero_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_mosaic" CASCADE;
  DROP TABLE "pages_blocks_hero_mosaic_locales" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_bullets" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_roles" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_roles_locales" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_people" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_people_locales" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_ctas" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase" CASCADE;
  DROP TABLE "pages_blocks_talent_showcase_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_rotating_words" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_rotating_words_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_mosaic" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_mosaic_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_roles" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_roles_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_people" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_people_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_talent_showcase_locales" CASCADE;
  DROP TABLE "posts_blocks_hero_rotating_words" CASCADE;
  DROP TABLE "posts_blocks_hero_rotating_words_locales" CASCADE;
  DROP TABLE "posts_blocks_hero_bullets" CASCADE;
  DROP TABLE "posts_blocks_hero_bullets_locales" CASCADE;
  DROP TABLE "posts_blocks_hero_mosaic" CASCADE;
  DROP TABLE "posts_blocks_hero_mosaic_locales" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_bullets" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_bullets_locales" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_roles" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_roles_locales" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_people" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_people_locales" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_ctas" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_ctas_locales" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase" CASCADE;
  DROP TABLE "posts_blocks_talent_showcase_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_rotating_words" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_rotating_words_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_bullets" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_bullets_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_mosaic" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_mosaic_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_bullets" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_bullets_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_roles" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_roles_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_people" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_people_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_ctas" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_ctas_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase" CASCADE;
  DROP TABLE "_posts_v_blocks_talent_showcase_locales" CASCADE;
  DROP TABLE "services_blocks_hero_rotating_words" CASCADE;
  DROP TABLE "services_blocks_hero_rotating_words_locales" CASCADE;
  DROP TABLE "services_blocks_hero_bullets" CASCADE;
  DROP TABLE "services_blocks_hero_bullets_locales" CASCADE;
  DROP TABLE "services_blocks_hero_mosaic" CASCADE;
  DROP TABLE "services_blocks_hero_mosaic_locales" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_bullets" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_bullets_locales" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_roles" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_roles_locales" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_people" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_people_locales" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_ctas" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_talent_showcase" CASCADE;
  DROP TABLE "services_blocks_talent_showcase_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero_rotating_words" CASCADE;
  DROP TABLE "_services_v_blocks_hero_rotating_words_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero_bullets" CASCADE;
  DROP TABLE "_services_v_blocks_hero_bullets_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero_mosaic" CASCADE;
  DROP TABLE "_services_v_blocks_hero_mosaic_locales" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_bullets" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_bullets_locales" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_roles" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_roles_locales" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_people" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_people_locales" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase" CASCADE;
  DROP TABLE "_services_v_blocks_talent_showcase_locales" CASCADE;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "posts_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "_posts_v_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "services_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "_services_v_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "posts_blocks_hero_media_idx" ON "posts_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_hero_media_idx" ON "_posts_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "services_blocks_hero_media_idx" ON "services_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_hero_media_idx" ON "_services_v_blocks_hero" USING btree ("media_id");
  ALTER TABLE "pages_blocks_logo_cloud_locales" DROP COLUMN "statement_before";
  ALTER TABLE "pages_blocks_logo_cloud_locales" DROP COLUMN "statement_highlight";
  ALTER TABLE "pages_blocks_logo_cloud_locales" DROP COLUMN "statement_after";
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" DROP COLUMN "statement_before";
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" DROP COLUMN "statement_highlight";
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" DROP COLUMN "statement_after";
  ALTER TABLE "posts_blocks_logo_cloud_locales" DROP COLUMN "statement_before";
  ALTER TABLE "posts_blocks_logo_cloud_locales" DROP COLUMN "statement_highlight";
  ALTER TABLE "posts_blocks_logo_cloud_locales" DROP COLUMN "statement_after";
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" DROP COLUMN "statement_before";
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" DROP COLUMN "statement_highlight";
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" DROP COLUMN "statement_after";
  ALTER TABLE "services_blocks_logo_cloud_locales" DROP COLUMN "statement_before";
  ALTER TABLE "services_blocks_logo_cloud_locales" DROP COLUMN "statement_highlight";
  ALTER TABLE "services_blocks_logo_cloud_locales" DROP COLUMN "statement_after";
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" DROP COLUMN "statement_before";
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" DROP COLUMN "statement_highlight";
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" DROP COLUMN "statement_after";
  DROP TYPE "public"."enum_pages_blocks_hero_mosaic_kind";
  DROP TYPE "public"."enum_pages_blocks_hero_mosaic_span";
  DROP TYPE "public"."enum_pages_blocks_hero_mosaic_tone";
  DROP TYPE "public"."enum_pages_blocks_talent_showcase_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_talent_showcase_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_talent_showcase_ctas_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_hero_mosaic_kind";
  DROP TYPE "public"."enum__pages_v_blocks_hero_mosaic_span";
  DROP TYPE "public"."enum__pages_v_blocks_hero_mosaic_tone";
  DROP TYPE "public"."enum__pages_v_blocks_talent_showcase_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_talent_showcase_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_talent_showcase_ctas_link_route";
  DROP TYPE "public"."enum_posts_blocks_hero_mosaic_kind";
  DROP TYPE "public"."enum_posts_blocks_hero_mosaic_span";
  DROP TYPE "public"."enum_posts_blocks_hero_mosaic_tone";
  DROP TYPE "public"."enum_posts_blocks_talent_showcase_ctas_variant";
  DROP TYPE "public"."enum_posts_blocks_talent_showcase_ctas_link_type";
  DROP TYPE "public"."enum_posts_blocks_talent_showcase_ctas_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_hero_mosaic_kind";
  DROP TYPE "public"."enum__posts_v_blocks_hero_mosaic_span";
  DROP TYPE "public"."enum__posts_v_blocks_hero_mosaic_tone";
  DROP TYPE "public"."enum__posts_v_blocks_talent_showcase_ctas_variant";
  DROP TYPE "public"."enum__posts_v_blocks_talent_showcase_ctas_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_talent_showcase_ctas_link_route";
  DROP TYPE "public"."enum_services_blocks_hero_mosaic_kind";
  DROP TYPE "public"."enum_services_blocks_hero_mosaic_span";
  DROP TYPE "public"."enum_services_blocks_hero_mosaic_tone";
  DROP TYPE "public"."enum_services_blocks_talent_showcase_ctas_variant";
  DROP TYPE "public"."enum_services_blocks_talent_showcase_ctas_link_type";
  DROP TYPE "public"."enum_services_blocks_talent_showcase_ctas_link_route";
  DROP TYPE "public"."enum__services_v_blocks_hero_mosaic_kind";
  DROP TYPE "public"."enum__services_v_blocks_hero_mosaic_span";
  DROP TYPE "public"."enum__services_v_blocks_hero_mosaic_tone";
  DROP TYPE "public"."enum__services_v_blocks_talent_showcase_ctas_variant";
  DROP TYPE "public"."enum__services_v_blocks_talent_showcase_ctas_link_type";
  DROP TYPE "public"."enum__services_v_blocks_talent_showcase_ctas_link_route";`)
}
