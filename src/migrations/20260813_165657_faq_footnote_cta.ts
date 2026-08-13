import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_faq_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_faq_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_pages_blocks_faq_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_posts_blocks_faq_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_faq_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_posts_blocks_faq_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__posts_v_blocks_faq_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_faq_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_faq_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum_services_blocks_faq_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_services_blocks_faq_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum_services_blocks_faq_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TYPE "public"."enum__services_v_blocks_faq_ctas_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__services_v_blocks_faq_ctas_link_type" AS ENUM('internal', 'route', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_faq_ctas_link_route" AS ENUM('/', '/blog', '/services', '/careers', '/contact', '/meeting');
  CREATE TABLE "pages_blocks_faq_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_faq_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_faq_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_pages_blocks_faq_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_faq_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_faq_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__pages_v_blocks_faq_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_blocks_faq_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_faq_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_posts_blocks_faq_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_posts_blocks_faq_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "posts_blocks_faq_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_faq_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_faq_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__posts_v_blocks_faq_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__posts_v_blocks_faq_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_faq_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum_services_blocks_faq_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum_services_blocks_faq_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar
  );
  
  CREATE TABLE "services_blocks_faq_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_faq_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_faq_ctas_variant" DEFAULT 'primary',
  	"link_type" "enum__services_v_blocks_faq_ctas_link_type" DEFAULT 'internal',
  	"link_route" "enum__services_v_blocks_faq_ctas_link_route",
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_analytics_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_ctas_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_faq_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "posts_blocks_faq_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "_posts_v_blocks_faq_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "services_blocks_faq_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "_services_v_blocks_faq_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "pages_blocks_faq_ctas" ADD CONSTRAINT "pages_blocks_faq_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_ctas_locales" ADD CONSTRAINT "pages_blocks_faq_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_ctas" ADD CONSTRAINT "_pages_v_blocks_faq_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_faq_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_ctas" ADD CONSTRAINT "posts_blocks_faq_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_ctas_locales" ADD CONSTRAINT "posts_blocks_faq_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_ctas" ADD CONSTRAINT "_posts_v_blocks_faq_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_ctas_locales" ADD CONSTRAINT "_posts_v_blocks_faq_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_ctas" ADD CONSTRAINT "services_blocks_faq_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_ctas_locales" ADD CONSTRAINT "services_blocks_faq_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_ctas" ADD CONSTRAINT "_services_v_blocks_faq_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_ctas_locales" ADD CONSTRAINT "_services_v_blocks_faq_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq_ctas"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_faq_ctas_order_idx" ON "pages_blocks_faq_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_ctas_parent_id_idx" ON "pages_blocks_faq_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_ctas_locales_locale_parent_id_unique" ON "pages_blocks_faq_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_ctas_order_idx" ON "_pages_v_blocks_faq_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_ctas_parent_id_idx" ON "_pages_v_blocks_faq_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_ctas_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_ctas_order_idx" ON "posts_blocks_faq_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_ctas_parent_id_idx" ON "posts_blocks_faq_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_faq_ctas_locales_locale_parent_id_unique" ON "posts_blocks_faq_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_ctas_order_idx" ON "_posts_v_blocks_faq_ctas" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_ctas_parent_id_idx" ON "_posts_v_blocks_faq_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_ctas_locales_locale_parent_id_unique" ON "_posts_v_blocks_faq_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_ctas_order_idx" ON "services_blocks_faq_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_ctas_parent_id_idx" ON "services_blocks_faq_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_faq_ctas_locales_locale_parent_id_unique" ON "services_blocks_faq_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_faq_ctas_order_idx" ON "_services_v_blocks_faq_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_ctas_parent_id_idx" ON "_services_v_blocks_faq_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_faq_ctas_locales_locale_parent_id_unique" ON "_services_v_blocks_faq_ctas_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_faq_ctas" CASCADE;
  DROP TABLE "pages_blocks_faq_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_ctas_locales" CASCADE;
  DROP TABLE "posts_blocks_faq_ctas" CASCADE;
  DROP TABLE "posts_blocks_faq_ctas_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_ctas" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_ctas_locales" CASCADE;
  DROP TABLE "services_blocks_faq_ctas" CASCADE;
  DROP TABLE "services_blocks_faq_ctas_locales" CASCADE;
  DROP TABLE "_services_v_blocks_faq_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_faq_ctas_locales" CASCADE;
  ALTER TABLE "pages_blocks_faq_locales" DROP COLUMN "footnote";
  ALTER TABLE "_pages_v_blocks_faq_locales" DROP COLUMN "footnote";
  ALTER TABLE "posts_blocks_faq_locales" DROP COLUMN "footnote";
  ALTER TABLE "_posts_v_blocks_faq_locales" DROP COLUMN "footnote";
  ALTER TABLE "services_blocks_faq_locales" DROP COLUMN "footnote";
  ALTER TABLE "_services_v_blocks_faq_locales" DROP COLUMN "footnote";
  DROP TYPE "public"."enum_pages_blocks_faq_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_faq_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_faq_ctas_link_route";
  DROP TYPE "public"."enum__pages_v_blocks_faq_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_faq_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_ctas_link_route";
  DROP TYPE "public"."enum_posts_blocks_faq_ctas_variant";
  DROP TYPE "public"."enum_posts_blocks_faq_ctas_link_type";
  DROP TYPE "public"."enum_posts_blocks_faq_ctas_link_route";
  DROP TYPE "public"."enum__posts_v_blocks_faq_ctas_variant";
  DROP TYPE "public"."enum__posts_v_blocks_faq_ctas_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_faq_ctas_link_route";
  DROP TYPE "public"."enum_services_blocks_faq_ctas_variant";
  DROP TYPE "public"."enum_services_blocks_faq_ctas_link_type";
  DROP TYPE "public"."enum_services_blocks_faq_ctas_link_route";
  DROP TYPE "public"."enum__services_v_blocks_faq_ctas_variant";
  DROP TYPE "public"."enum__services_v_blocks_faq_ctas_link_type";
  DROP TYPE "public"."enum__services_v_blocks_faq_ctas_link_route";`)
}
