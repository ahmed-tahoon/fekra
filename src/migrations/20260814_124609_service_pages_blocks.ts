import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  CREATE TYPE "public"."enum_pages_blocks_hiring_models_models_tone" AS ENUM('amber', 'lavender', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_hiring_models_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hiring_models_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hiring_models_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  CREATE TYPE "public"."enum__pages_v_blocks_hiring_models_models_tone" AS ENUM('amber', 'lavender', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_hiring_models_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_hiring_models_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_hiring_models_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  CREATE TYPE "public"."enum_posts_blocks_hiring_models_models_tone" AS ENUM('amber', 'lavender', 'blue');
  CREATE TYPE "public"."enum_posts_blocks_hiring_models_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_hiring_models_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_hiring_models_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  CREATE TYPE "public"."enum__posts_v_blocks_hiring_models_models_tone" AS ENUM('amber', 'lavender', 'blue');
  CREATE TYPE "public"."enum__posts_v_blocks_hiring_models_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_hiring_models_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_hiring_models_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  CREATE TYPE "public"."enum_services_blocks_hiring_models_models_tone" AS ENUM('amber', 'lavender', 'blue');
  CREATE TYPE "public"."enum_services_blocks_hiring_models_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_services_blocks_hiring_models_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_hiring_models_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  CREATE TYPE "public"."enum__services_v_blocks_hiring_models_models_tone" AS ENUM('amber', 'lavender', 'blue');
  CREATE TYPE "public"."enum__services_v_blocks_hiring_models_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__services_v_blocks_hiring_models_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_hiring_models_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TABLE "pages_blocks_service_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_service_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_tone" "enum_pages_blocks_service_hero_hero_tone" DEFAULT 'mint',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_hero_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hiring_models_models_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_hiring_models_models_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hiring_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_hiring_models_models_tone" DEFAULT 'amber'
  );
  
  CREATE TABLE "pages_blocks_hiring_models_models_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hiring_models_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hiring_models_benefits_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hiring_models_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hiring_models_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_hiring_models_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_hiring_models_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_hiring_models_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hiring_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hiring_models_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"benefits_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_tone" "enum__pages_v_blocks_service_hero_hero_tone" DEFAULT 'mint',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_models_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_models_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__pages_v_blocks_hiring_models_models_tone" DEFAULT 'amber',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_models_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_benefits_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hiring_models_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_hiring_models_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_hiring_models_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hiring_models_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"benefits_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_blocks_service_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "posts_blocks_service_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_tone" "enum_posts_blocks_service_hero_hero_tone" DEFAULT 'mint',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_service_hero_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hiring_models_models_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "posts_blocks_hiring_models_models_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hiring_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_posts_blocks_hiring_models_models_tone" DEFAULT 'amber'
  );
  
  CREATE TABLE "posts_blocks_hiring_models_models_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hiring_models_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hiring_models_benefits_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hiring_models_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_hiring_models_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_posts_blocks_hiring_models_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_hiring_models_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_hiring_models_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hiring_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_hiring_models_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"benefits_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_service_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_service_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_tone" "enum__posts_v_blocks_service_hero_hero_tone" DEFAULT 'mint',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_service_hero_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_models_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_models_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__posts_v_blocks_hiring_models_models_tone" DEFAULT 'amber',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_models_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_benefits_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_hiring_models_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__posts_v_blocks_hiring_models_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_hiring_models_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hiring_models_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"benefits_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_blocks_service_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "services_blocks_service_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_tone" "enum_services_blocks_service_hero_hero_tone" DEFAULT 'mint',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_service_hero_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hiring_models_models_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services_blocks_hiring_models_models_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hiring_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_services_blocks_hiring_models_models_tone" DEFAULT 'amber'
  );
  
  CREATE TABLE "services_blocks_hiring_models_models_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hiring_models_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_hiring_models_benefits_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hiring_models_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_hiring_models_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_services_blocks_hiring_models_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_hiring_models_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_hiring_models_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hiring_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_hiring_models_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"benefits_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_service_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_tone" "enum__services_v_blocks_service_hero_hero_tone" DEFAULT 'mint',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service_hero_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_models_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_models_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__services_v_blocks_hiring_models_models_tone" DEFAULT 'amber',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_models_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_benefits_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_hiring_models_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__services_v_blocks_hiring_models_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_hiring_models_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hiring_models_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"benefits_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_service_hero_highlights" ADD CONSTRAINT "pages_blocks_service_hero_highlights_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_highlights" ADD CONSTRAINT "pages_blocks_service_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_highlights_locales" ADD CONSTRAINT "pages_blocks_service_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero" ADD CONSTRAINT "pages_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_locales" ADD CONSTRAINT "pages_blocks_service_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_models_stats" ADD CONSTRAINT "pages_blocks_hiring_models_models_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_models_stats_locales" ADD CONSTRAINT "pages_blocks_hiring_models_models_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models_models_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_models" ADD CONSTRAINT "pages_blocks_hiring_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_models_locales" ADD CONSTRAINT "pages_blocks_hiring_models_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_benefits" ADD CONSTRAINT "pages_blocks_hiring_models_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_benefits_locales" ADD CONSTRAINT "pages_blocks_hiring_models_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_ctas" ADD CONSTRAINT "pages_blocks_hiring_models_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_ctas_locales" ADD CONSTRAINT "pages_blocks_hiring_models_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models" ADD CONSTRAINT "pages_blocks_hiring_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hiring_models_locales" ADD CONSTRAINT "pages_blocks_hiring_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_highlights" ADD CONSTRAINT "_pages_v_blocks_service_hero_highlights_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_highlights" ADD CONSTRAINT "_pages_v_blocks_service_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_service_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero" ADD CONSTRAINT "_pages_v_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_locales" ADD CONSTRAINT "_pages_v_blocks_service_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_models_stats" ADD CONSTRAINT "_pages_v_blocks_hiring_models_models_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_models_stats_locales" ADD CONSTRAINT "_pages_v_blocks_hiring_models_models_stats_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models_models_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_models" ADD CONSTRAINT "_pages_v_blocks_hiring_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_models_locales" ADD CONSTRAINT "_pages_v_blocks_hiring_models_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_benefits" ADD CONSTRAINT "_pages_v_blocks_hiring_models_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_benefits_locales" ADD CONSTRAINT "_pages_v_blocks_hiring_models_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_ctas" ADD CONSTRAINT "_pages_v_blocks_hiring_models_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_hiring_models_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models" ADD CONSTRAINT "_pages_v_blocks_hiring_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hiring_models_locales" ADD CONSTRAINT "_pages_v_blocks_hiring_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_service_hero_highlights" ADD CONSTRAINT "posts_blocks_service_hero_highlights_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_service_hero_highlights" ADD CONSTRAINT "posts_blocks_service_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_service_hero_highlights_locales" ADD CONSTRAINT "posts_blocks_service_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_service_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_service_hero" ADD CONSTRAINT "posts_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_service_hero_locales" ADD CONSTRAINT "posts_blocks_service_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_models_stats" ADD CONSTRAINT "posts_blocks_hiring_models_models_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_models_stats_locales" ADD CONSTRAINT "posts_blocks_hiring_models_models_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models_models_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_models" ADD CONSTRAINT "posts_blocks_hiring_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_models_locales" ADD CONSTRAINT "posts_blocks_hiring_models_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_benefits" ADD CONSTRAINT "posts_blocks_hiring_models_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_benefits_locales" ADD CONSTRAINT "posts_blocks_hiring_models_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_ctas" ADD CONSTRAINT "posts_blocks_hiring_models_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_ctas_locales" ADD CONSTRAINT "posts_blocks_hiring_models_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models" ADD CONSTRAINT "posts_blocks_hiring_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hiring_models_locales" ADD CONSTRAINT "posts_blocks_hiring_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_service_hero_highlights" ADD CONSTRAINT "_posts_v_blocks_service_hero_highlights_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_service_hero_highlights" ADD CONSTRAINT "_posts_v_blocks_service_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_service_hero_highlights_locales" ADD CONSTRAINT "_posts_v_blocks_service_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_service_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_service_hero" ADD CONSTRAINT "_posts_v_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_service_hero_locales" ADD CONSTRAINT "_posts_v_blocks_service_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_models_stats" ADD CONSTRAINT "_posts_v_blocks_hiring_models_models_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_models_stats_locales" ADD CONSTRAINT "_posts_v_blocks_hiring_models_models_stats_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models_models_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_models" ADD CONSTRAINT "_posts_v_blocks_hiring_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_models_locales" ADD CONSTRAINT "_posts_v_blocks_hiring_models_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_benefits" ADD CONSTRAINT "_posts_v_blocks_hiring_models_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_benefits_locales" ADD CONSTRAINT "_posts_v_blocks_hiring_models_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_ctas" ADD CONSTRAINT "_posts_v_blocks_hiring_models_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_ctas_locales" ADD CONSTRAINT "_posts_v_blocks_hiring_models_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models" ADD CONSTRAINT "_posts_v_blocks_hiring_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hiring_models_locales" ADD CONSTRAINT "_posts_v_blocks_hiring_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_hero_highlights" ADD CONSTRAINT "services_blocks_service_hero_highlights_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_service_hero_highlights" ADD CONSTRAINT "services_blocks_service_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_hero_highlights_locales" ADD CONSTRAINT "services_blocks_service_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_hero" ADD CONSTRAINT "services_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_hero_locales" ADD CONSTRAINT "services_blocks_service_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_models_stats" ADD CONSTRAINT "services_blocks_hiring_models_models_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_models_stats_locales" ADD CONSTRAINT "services_blocks_hiring_models_models_stats_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models_models_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_models" ADD CONSTRAINT "services_blocks_hiring_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_models_locales" ADD CONSTRAINT "services_blocks_hiring_models_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_benefits" ADD CONSTRAINT "services_blocks_hiring_models_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_benefits_locales" ADD CONSTRAINT "services_blocks_hiring_models_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_ctas" ADD CONSTRAINT "services_blocks_hiring_models_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_ctas_locales" ADD CONSTRAINT "services_blocks_hiring_models_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models" ADD CONSTRAINT "services_blocks_hiring_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hiring_models_locales" ADD CONSTRAINT "services_blocks_hiring_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_hero_highlights" ADD CONSTRAINT "_services_v_blocks_service_hero_highlights_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_hero_highlights" ADD CONSTRAINT "_services_v_blocks_service_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_hero_highlights_locales" ADD CONSTRAINT "_services_v_blocks_service_hero_highlights_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_service_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_hero" ADD CONSTRAINT "_services_v_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_hero_locales" ADD CONSTRAINT "_services_v_blocks_service_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_models_stats" ADD CONSTRAINT "_services_v_blocks_hiring_models_models_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_models_stats_locales" ADD CONSTRAINT "_services_v_blocks_hiring_models_models_stats_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models_models_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_models" ADD CONSTRAINT "_services_v_blocks_hiring_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_models_locales" ADD CONSTRAINT "_services_v_blocks_hiring_models_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_benefits" ADD CONSTRAINT "_services_v_blocks_hiring_models_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_benefits_locales" ADD CONSTRAINT "_services_v_blocks_hiring_models_benefits_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_ctas" ADD CONSTRAINT "_services_v_blocks_hiring_models_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_ctas_locales" ADD CONSTRAINT "_services_v_blocks_hiring_models_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models" ADD CONSTRAINT "_services_v_blocks_hiring_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hiring_models_locales" ADD CONSTRAINT "_services_v_blocks_hiring_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hiring_models"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_service_hero_highlights_order_idx" ON "pages_blocks_service_hero_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_highlights_parent_id_idx" ON "pages_blocks_service_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_highlights_icon_idx" ON "pages_blocks_service_hero_highlights" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_service_hero_highlights_locales_locale_parent_i" ON "pages_blocks_service_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_hero_order_idx" ON "pages_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_parent_id_idx" ON "pages_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_path_idx" ON "pages_blocks_service_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_service_hero_locales_locale_parent_id_unique" ON "pages_blocks_service_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hiring_models_models_stats_order_idx" ON "pages_blocks_hiring_models_models_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hiring_models_models_stats_parent_id_idx" ON "pages_blocks_hiring_models_models_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hiring_models_models_stats_locales_locale_paren" ON "pages_blocks_hiring_models_models_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hiring_models_models_order_idx" ON "pages_blocks_hiring_models_models" USING btree ("_order");
  CREATE INDEX "pages_blocks_hiring_models_models_parent_id_idx" ON "pages_blocks_hiring_models_models" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hiring_models_models_locales_locale_parent_id_u" ON "pages_blocks_hiring_models_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hiring_models_benefits_order_idx" ON "pages_blocks_hiring_models_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_hiring_models_benefits_parent_id_idx" ON "pages_blocks_hiring_models_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hiring_models_benefits_locales_locale_parent_id" ON "pages_blocks_hiring_models_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hiring_models_ctas_order_idx" ON "pages_blocks_hiring_models_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hiring_models_ctas_parent_id_idx" ON "pages_blocks_hiring_models_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hiring_models_ctas_locales_locale_parent_id_uni" ON "pages_blocks_hiring_models_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hiring_models_order_idx" ON "pages_blocks_hiring_models" USING btree ("_order");
  CREATE INDEX "pages_blocks_hiring_models_parent_id_idx" ON "pages_blocks_hiring_models" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hiring_models_path_idx" ON "pages_blocks_hiring_models" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_hiring_models_locales_locale_parent_id_unique" ON "pages_blocks_hiring_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_highlights_order_idx" ON "_pages_v_blocks_service_hero_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_highlights_parent_id_idx" ON "_pages_v_blocks_service_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_highlights_icon_idx" ON "_pages_v_blocks_service_hero_highlights" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_hero_highlights_locales_locale_paren" ON "_pages_v_blocks_service_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_order_idx" ON "_pages_v_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_parent_id_idx" ON "_pages_v_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_path_idx" ON "_pages_v_blocks_service_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_service_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hiring_models_models_stats_order_idx" ON "_pages_v_blocks_hiring_models_models_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hiring_models_models_stats_parent_id_idx" ON "_pages_v_blocks_hiring_models_models_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hiring_models_models_stats_locales_locale_pa" ON "_pages_v_blocks_hiring_models_models_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hiring_models_models_order_idx" ON "_pages_v_blocks_hiring_models_models" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hiring_models_models_parent_id_idx" ON "_pages_v_blocks_hiring_models_models" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hiring_models_models_locales_locale_parent_i" ON "_pages_v_blocks_hiring_models_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hiring_models_benefits_order_idx" ON "_pages_v_blocks_hiring_models_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hiring_models_benefits_parent_id_idx" ON "_pages_v_blocks_hiring_models_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hiring_models_benefits_locales_locale_parent" ON "_pages_v_blocks_hiring_models_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hiring_models_ctas_order_idx" ON "_pages_v_blocks_hiring_models_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hiring_models_ctas_parent_id_idx" ON "_pages_v_blocks_hiring_models_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hiring_models_ctas_locales_locale_parent_id_" ON "_pages_v_blocks_hiring_models_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hiring_models_order_idx" ON "_pages_v_blocks_hiring_models" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hiring_models_parent_id_idx" ON "_pages_v_blocks_hiring_models" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hiring_models_path_idx" ON "_pages_v_blocks_hiring_models" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_hiring_models_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_hiring_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_service_hero_highlights_order_idx" ON "posts_blocks_service_hero_highlights" USING btree ("_order");
  CREATE INDEX "posts_blocks_service_hero_highlights_parent_id_idx" ON "posts_blocks_service_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_service_hero_highlights_icon_idx" ON "posts_blocks_service_hero_highlights" USING btree ("icon_id");
  CREATE UNIQUE INDEX "posts_blocks_service_hero_highlights_locales_locale_parent_i" ON "posts_blocks_service_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_service_hero_order_idx" ON "posts_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_service_hero_parent_id_idx" ON "posts_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_service_hero_path_idx" ON "posts_blocks_service_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_service_hero_locales_locale_parent_id_unique" ON "posts_blocks_service_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hiring_models_models_stats_order_idx" ON "posts_blocks_hiring_models_models_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_hiring_models_models_stats_parent_id_idx" ON "posts_blocks_hiring_models_models_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_hiring_models_models_stats_locales_locale_paren" ON "posts_blocks_hiring_models_models_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hiring_models_models_order_idx" ON "posts_blocks_hiring_models_models" USING btree ("_order");
  CREATE INDEX "posts_blocks_hiring_models_models_parent_id_idx" ON "posts_blocks_hiring_models_models" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_hiring_models_models_locales_locale_parent_id_u" ON "posts_blocks_hiring_models_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hiring_models_benefits_order_idx" ON "posts_blocks_hiring_models_benefits" USING btree ("_order");
  CREATE INDEX "posts_blocks_hiring_models_benefits_parent_id_idx" ON "posts_blocks_hiring_models_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_hiring_models_benefits_locales_locale_parent_id" ON "posts_blocks_hiring_models_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hiring_models_ctas_order_idx" ON "posts_blocks_hiring_models_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_hiring_models_ctas_parent_id_idx" ON "posts_blocks_hiring_models_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_hiring_models_ctas_locales_locale_parent_id_uni" ON "posts_blocks_hiring_models_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hiring_models_order_idx" ON "posts_blocks_hiring_models" USING btree ("_order");
  CREATE INDEX "posts_blocks_hiring_models_parent_id_idx" ON "posts_blocks_hiring_models" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hiring_models_path_idx" ON "posts_blocks_hiring_models" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_hiring_models_locales_locale_parent_id_unique" ON "posts_blocks_hiring_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_service_hero_highlights_order_idx" ON "_posts_v_blocks_service_hero_highlights" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_service_hero_highlights_parent_id_idx" ON "_posts_v_blocks_service_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_service_hero_highlights_icon_idx" ON "_posts_v_blocks_service_hero_highlights" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_service_hero_highlights_locales_locale_paren" ON "_posts_v_blocks_service_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_service_hero_order_idx" ON "_posts_v_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_service_hero_parent_id_idx" ON "_posts_v_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_service_hero_path_idx" ON "_posts_v_blocks_service_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_service_hero_locales_locale_parent_id_unique" ON "_posts_v_blocks_service_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hiring_models_models_stats_order_idx" ON "_posts_v_blocks_hiring_models_models_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hiring_models_models_stats_parent_id_idx" ON "_posts_v_blocks_hiring_models_models_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hiring_models_models_stats_locales_locale_pa" ON "_posts_v_blocks_hiring_models_models_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hiring_models_models_order_idx" ON "_posts_v_blocks_hiring_models_models" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hiring_models_models_parent_id_idx" ON "_posts_v_blocks_hiring_models_models" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hiring_models_models_locales_locale_parent_i" ON "_posts_v_blocks_hiring_models_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hiring_models_benefits_order_idx" ON "_posts_v_blocks_hiring_models_benefits" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hiring_models_benefits_parent_id_idx" ON "_posts_v_blocks_hiring_models_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hiring_models_benefits_locales_locale_parent" ON "_posts_v_blocks_hiring_models_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hiring_models_ctas_order_idx" ON "_posts_v_blocks_hiring_models_ctas" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hiring_models_ctas_parent_id_idx" ON "_posts_v_blocks_hiring_models_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_hiring_models_ctas_locales_locale_parent_id_" ON "_posts_v_blocks_hiring_models_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hiring_models_order_idx" ON "_posts_v_blocks_hiring_models" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hiring_models_parent_id_idx" ON "_posts_v_blocks_hiring_models" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hiring_models_path_idx" ON "_posts_v_blocks_hiring_models" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_hiring_models_locales_locale_parent_id_uniqu" ON "_posts_v_blocks_hiring_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_service_hero_highlights_order_idx" ON "services_blocks_service_hero_highlights" USING btree ("_order");
  CREATE INDEX "services_blocks_service_hero_highlights_parent_id_idx" ON "services_blocks_service_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_hero_highlights_icon_idx" ON "services_blocks_service_hero_highlights" USING btree ("icon_id");
  CREATE UNIQUE INDEX "services_blocks_service_hero_highlights_locales_locale_paren" ON "services_blocks_service_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_service_hero_order_idx" ON "services_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_service_hero_parent_id_idx" ON "services_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_hero_path_idx" ON "services_blocks_service_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_service_hero_locales_locale_parent_id_unique" ON "services_blocks_service_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hiring_models_models_stats_order_idx" ON "services_blocks_hiring_models_models_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_hiring_models_models_stats_parent_id_idx" ON "services_blocks_hiring_models_models_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hiring_models_models_stats_locales_locale_pa" ON "services_blocks_hiring_models_models_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hiring_models_models_order_idx" ON "services_blocks_hiring_models_models" USING btree ("_order");
  CREATE INDEX "services_blocks_hiring_models_models_parent_id_idx" ON "services_blocks_hiring_models_models" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hiring_models_models_locales_locale_parent_i" ON "services_blocks_hiring_models_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hiring_models_benefits_order_idx" ON "services_blocks_hiring_models_benefits" USING btree ("_order");
  CREATE INDEX "services_blocks_hiring_models_benefits_parent_id_idx" ON "services_blocks_hiring_models_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hiring_models_benefits_locales_locale_parent" ON "services_blocks_hiring_models_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hiring_models_ctas_order_idx" ON "services_blocks_hiring_models_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_hiring_models_ctas_parent_id_idx" ON "services_blocks_hiring_models_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hiring_models_ctas_locales_locale_parent_id_" ON "services_blocks_hiring_models_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hiring_models_order_idx" ON "services_blocks_hiring_models" USING btree ("_order");
  CREATE INDEX "services_blocks_hiring_models_parent_id_idx" ON "services_blocks_hiring_models" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hiring_models_path_idx" ON "services_blocks_hiring_models" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_hiring_models_locales_locale_parent_id_uniqu" ON "services_blocks_hiring_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_service_hero_highlights_order_idx" ON "_services_v_blocks_service_hero_highlights" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_hero_highlights_parent_id_idx" ON "_services_v_blocks_service_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_hero_highlights_icon_idx" ON "_services_v_blocks_service_hero_highlights" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_services_v_blocks_service_hero_highlights_locales_locale_pa" ON "_services_v_blocks_service_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_service_hero_order_idx" ON "_services_v_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_hero_parent_id_idx" ON "_services_v_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_hero_path_idx" ON "_services_v_blocks_service_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_service_hero_locales_locale_parent_id_uni" ON "_services_v_blocks_service_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hiring_models_models_stats_order_idx" ON "_services_v_blocks_hiring_models_models_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hiring_models_models_stats_parent_id_idx" ON "_services_v_blocks_hiring_models_models_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hiring_models_models_stats_locales_locale" ON "_services_v_blocks_hiring_models_models_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hiring_models_models_order_idx" ON "_services_v_blocks_hiring_models_models" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hiring_models_models_parent_id_idx" ON "_services_v_blocks_hiring_models_models" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hiring_models_models_locales_locale_paren" ON "_services_v_blocks_hiring_models_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hiring_models_benefits_order_idx" ON "_services_v_blocks_hiring_models_benefits" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hiring_models_benefits_parent_id_idx" ON "_services_v_blocks_hiring_models_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hiring_models_benefits_locales_locale_par" ON "_services_v_blocks_hiring_models_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hiring_models_ctas_order_idx" ON "_services_v_blocks_hiring_models_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hiring_models_ctas_parent_id_idx" ON "_services_v_blocks_hiring_models_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hiring_models_ctas_locales_locale_parent_" ON "_services_v_blocks_hiring_models_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hiring_models_order_idx" ON "_services_v_blocks_hiring_models" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hiring_models_parent_id_idx" ON "_services_v_blocks_hiring_models" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hiring_models_path_idx" ON "_services_v_blocks_hiring_models" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_hiring_models_locales_locale_parent_id_un" ON "_services_v_blocks_hiring_models_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_service_hero_highlights" CASCADE;
  DROP TABLE "pages_blocks_service_hero_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_service_hero" CASCADE;
  DROP TABLE "pages_blocks_service_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_models_stats" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_models_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_models" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_models_locales" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_benefits" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_benefits_locales" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_ctas" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_hiring_models" CASCADE;
  DROP TABLE "pages_blocks_hiring_models_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_models_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_models_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_models" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_models_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_benefits_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models" CASCADE;
  DROP TABLE "_pages_v_blocks_hiring_models_locales" CASCADE;
  DROP TABLE "posts_blocks_service_hero_highlights" CASCADE;
  DROP TABLE "posts_blocks_service_hero_highlights_locales" CASCADE;
  DROP TABLE "posts_blocks_service_hero" CASCADE;
  DROP TABLE "posts_blocks_service_hero_locales" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_models_stats" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_models_stats_locales" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_models" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_models_locales" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_benefits" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_benefits_locales" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_ctas" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_ctas_locales" CASCADE;
  DROP TABLE "posts_blocks_hiring_models" CASCADE;
  DROP TABLE "posts_blocks_hiring_models_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_service_hero_highlights" CASCADE;
  DROP TABLE "_posts_v_blocks_service_hero_highlights_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_service_hero" CASCADE;
  DROP TABLE "_posts_v_blocks_service_hero_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_models_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_models_stats_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_models" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_models_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_benefits" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_benefits_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_ctas" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_ctas_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models" CASCADE;
  DROP TABLE "_posts_v_blocks_hiring_models_locales" CASCADE;
  DROP TABLE "services_blocks_service_hero_highlights" CASCADE;
  DROP TABLE "services_blocks_service_hero_highlights_locales" CASCADE;
  DROP TABLE "services_blocks_service_hero" CASCADE;
  DROP TABLE "services_blocks_service_hero_locales" CASCADE;
  DROP TABLE "services_blocks_hiring_models_models_stats" CASCADE;
  DROP TABLE "services_blocks_hiring_models_models_stats_locales" CASCADE;
  DROP TABLE "services_blocks_hiring_models_models" CASCADE;
  DROP TABLE "services_blocks_hiring_models_models_locales" CASCADE;
  DROP TABLE "services_blocks_hiring_models_benefits" CASCADE;
  DROP TABLE "services_blocks_hiring_models_benefits_locales" CASCADE;
  DROP TABLE "services_blocks_hiring_models_ctas" CASCADE;
  DROP TABLE "services_blocks_hiring_models_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_hiring_models" CASCADE;
  DROP TABLE "services_blocks_hiring_models_locales" CASCADE;
  DROP TABLE "_services_v_blocks_service_hero_highlights" CASCADE;
  DROP TABLE "_services_v_blocks_service_hero_highlights_locales" CASCADE;
  DROP TABLE "_services_v_blocks_service_hero" CASCADE;
  DROP TABLE "_services_v_blocks_service_hero_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_models_stats" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_models_stats_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_models" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_models_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_benefits" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_benefits_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models" CASCADE;
  DROP TABLE "_services_v_blocks_hiring_models_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_service_hero_hero_tone";
  DROP TYPE "public"."enum_pages_blocks_hiring_models_models_tone";
  DROP TYPE "public"."enum_pages_blocks_hiring_models_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_hiring_models_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_hiring_models_ctas_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone";
  DROP TYPE "public"."enum__pages_v_blocks_hiring_models_models_tone";
  DROP TYPE "public"."enum__pages_v_blocks_hiring_models_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hiring_models_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hiring_models_ctas_link_route";
  DROP TYPE "public"."enum_posts_blocks_service_hero_hero_tone";
  DROP TYPE "public"."enum_posts_blocks_hiring_models_models_tone";
  DROP TYPE "public"."enum_posts_blocks_hiring_models_ctas_variant";
  DROP TYPE "public"."enum_posts_blocks_hiring_models_ctas_link_type";
  DROP TYPE "public"."enum_posts_blocks_hiring_models_ctas_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone";
  DROP TYPE "public"."enum__posts_v_blocks_hiring_models_models_tone";
  DROP TYPE "public"."enum__posts_v_blocks_hiring_models_ctas_variant";
  DROP TYPE "public"."enum__posts_v_blocks_hiring_models_ctas_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_hiring_models_ctas_link_route";
  DROP TYPE "public"."enum_services_blocks_service_hero_hero_tone";
  DROP TYPE "public"."enum_services_blocks_hiring_models_models_tone";
  DROP TYPE "public"."enum_services_blocks_hiring_models_ctas_variant";
  DROP TYPE "public"."enum_services_blocks_hiring_models_ctas_link_type";
  DROP TYPE "public"."enum_services_blocks_hiring_models_ctas_link_route";
  DROP TYPE "public"."enum__services_v_blocks_service_hero_hero_tone";
  DROP TYPE "public"."enum__services_v_blocks_hiring_models_models_tone";
  DROP TYPE "public"."enum__services_v_blocks_hiring_models_ctas_variant";
  DROP TYPE "public"."enum__services_v_blocks_hiring_models_ctas_link_type";
  DROP TYPE "public"."enum__services_v_blocks_hiring_models_ctas_link_route";`)
}
