import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_industries_industries_tone" AS ENUM('pink', 'mint', 'lilac', 'teal', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_industries_industries_tone" AS ENUM('pink', 'mint', 'lilac', 'teal', 'blue');
  CREATE TYPE "public"."enum_posts_blocks_industries_industries_tone" AS ENUM('pink', 'mint', 'lilac', 'teal', 'blue');
  CREATE TYPE "public"."enum__posts_v_blocks_industries_industries_tone" AS ENUM('pink', 'mint', 'lilac', 'teal', 'blue');
  CREATE TYPE "public"."enum_services_blocks_industries_industries_tone" AS ENUM('pink', 'mint', 'lilac', 'teal', 'blue');
  CREATE TYPE "public"."enum__services_v_blocks_industries_industries_tone" AS ENUM('pink', 'mint', 'lilac', 'teal', 'blue');
  CREATE TABLE "pages_blocks_industries_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_industries_industries_tone" DEFAULT 'teal',
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_industries_industries_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_industries_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_industries_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__pages_v_blocks_industries_industries_tone" DEFAULT 'teal',
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_industries_industries_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_industries_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_blocks_industries_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_posts_blocks_industries_industries_tone" DEFAULT 'teal',
  	"icon_id" integer
  );
  
  CREATE TABLE "posts_blocks_industries_industries_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_industries_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_industries_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__posts_v_blocks_industries_industries_tone" DEFAULT 'teal',
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_industries_industries_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_industries_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_blocks_industries_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_services_blocks_industries_industries_tone" DEFAULT 'teal',
  	"icon_id" integer
  );
  
  CREATE TABLE "services_blocks_industries_industries_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_industries_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_industries_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__services_v_blocks_industries_industries_tone" DEFAULT 'teal',
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_industries_industries_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_industries_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_industries_industries" ADD CONSTRAINT "pages_blocks_industries_industries_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries_industries" ADD CONSTRAINT "pages_blocks_industries_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries_industries_locales" ADD CONSTRAINT "pages_blocks_industries_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industries_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries" ADD CONSTRAINT "pages_blocks_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industries_locales" ADD CONSTRAINT "pages_blocks_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industries_industries" ADD CONSTRAINT "_pages_v_blocks_industries_industries_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industries_industries" ADD CONSTRAINT "_pages_v_blocks_industries_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industries_industries_locales" ADD CONSTRAINT "_pages_v_blocks_industries_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_industries_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industries" ADD CONSTRAINT "_pages_v_blocks_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industries_locales" ADD CONSTRAINT "_pages_v_blocks_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_industries_industries" ADD CONSTRAINT "posts_blocks_industries_industries_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_industries_industries" ADD CONSTRAINT "posts_blocks_industries_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_industries_industries_locales" ADD CONSTRAINT "posts_blocks_industries_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_industries_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_industries" ADD CONSTRAINT "posts_blocks_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_industries_locales" ADD CONSTRAINT "posts_blocks_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industries_industries" ADD CONSTRAINT "_posts_v_blocks_industries_industries_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industries_industries" ADD CONSTRAINT "_posts_v_blocks_industries_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industries_industries_locales" ADD CONSTRAINT "_posts_v_blocks_industries_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_industries_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industries" ADD CONSTRAINT "_posts_v_blocks_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industries_locales" ADD CONSTRAINT "_posts_v_blocks_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_industries_industries" ADD CONSTRAINT "services_blocks_industries_industries_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_industries_industries" ADD CONSTRAINT "services_blocks_industries_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_industries_industries_locales" ADD CONSTRAINT "services_blocks_industries_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_industries_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_industries" ADD CONSTRAINT "services_blocks_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_industries_locales" ADD CONSTRAINT "services_blocks_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_industries_industries" ADD CONSTRAINT "_services_v_blocks_industries_industries_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_industries_industries" ADD CONSTRAINT "_services_v_blocks_industries_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_industries_industries_locales" ADD CONSTRAINT "_services_v_blocks_industries_industries_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_industries_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_industries" ADD CONSTRAINT "_services_v_blocks_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_industries_locales" ADD CONSTRAINT "_services_v_blocks_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_industries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_industries_industries_order_idx" ON "pages_blocks_industries_industries" USING btree ("_order");
  CREATE INDEX "pages_blocks_industries_industries_parent_id_idx" ON "pages_blocks_industries_industries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industries_industries_icon_idx" ON "pages_blocks_industries_industries" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_industries_industries_locales_locale_parent_id_" ON "pages_blocks_industries_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_industries_order_idx" ON "pages_blocks_industries" USING btree ("_order");
  CREATE INDEX "pages_blocks_industries_parent_id_idx" ON "pages_blocks_industries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industries_path_idx" ON "pages_blocks_industries" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_industries_locales_locale_parent_id_unique" ON "pages_blocks_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_industries_industries_order_idx" ON "_pages_v_blocks_industries_industries" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_industries_industries_parent_id_idx" ON "_pages_v_blocks_industries_industries" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_industries_industries_icon_idx" ON "_pages_v_blocks_industries_industries" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_industries_industries_locales_locale_parent_" ON "_pages_v_blocks_industries_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_industries_order_idx" ON "_pages_v_blocks_industries" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_industries_parent_id_idx" ON "_pages_v_blocks_industries" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_industries_path_idx" ON "_pages_v_blocks_industries" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_industries_locales_locale_parent_id_unique" ON "_pages_v_blocks_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_industries_industries_order_idx" ON "posts_blocks_industries_industries" USING btree ("_order");
  CREATE INDEX "posts_blocks_industries_industries_parent_id_idx" ON "posts_blocks_industries_industries" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_industries_industries_icon_idx" ON "posts_blocks_industries_industries" USING btree ("icon_id");
  CREATE UNIQUE INDEX "posts_blocks_industries_industries_locales_locale_parent_id_" ON "posts_blocks_industries_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_industries_order_idx" ON "posts_blocks_industries" USING btree ("_order");
  CREATE INDEX "posts_blocks_industries_parent_id_idx" ON "posts_blocks_industries" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_industries_path_idx" ON "posts_blocks_industries" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_industries_locales_locale_parent_id_unique" ON "posts_blocks_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_industries_industries_order_idx" ON "_posts_v_blocks_industries_industries" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_industries_industries_parent_id_idx" ON "_posts_v_blocks_industries_industries" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_industries_industries_icon_idx" ON "_posts_v_blocks_industries_industries" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_industries_industries_locales_locale_parent_" ON "_posts_v_blocks_industries_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_industries_order_idx" ON "_posts_v_blocks_industries" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_industries_parent_id_idx" ON "_posts_v_blocks_industries" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_industries_path_idx" ON "_posts_v_blocks_industries" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_industries_locales_locale_parent_id_unique" ON "_posts_v_blocks_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_industries_industries_order_idx" ON "services_blocks_industries_industries" USING btree ("_order");
  CREATE INDEX "services_blocks_industries_industries_parent_id_idx" ON "services_blocks_industries_industries" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_industries_industries_icon_idx" ON "services_blocks_industries_industries" USING btree ("icon_id");
  CREATE UNIQUE INDEX "services_blocks_industries_industries_locales_locale_parent_" ON "services_blocks_industries_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_industries_order_idx" ON "services_blocks_industries" USING btree ("_order");
  CREATE INDEX "services_blocks_industries_parent_id_idx" ON "services_blocks_industries" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_industries_path_idx" ON "services_blocks_industries" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_industries_locales_locale_parent_id_unique" ON "services_blocks_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_industries_industries_order_idx" ON "_services_v_blocks_industries_industries" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_industries_industries_parent_id_idx" ON "_services_v_blocks_industries_industries" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_industries_industries_icon_idx" ON "_services_v_blocks_industries_industries" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_services_v_blocks_industries_industries_locales_locale_pare" ON "_services_v_blocks_industries_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_industries_order_idx" ON "_services_v_blocks_industries" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_industries_parent_id_idx" ON "_services_v_blocks_industries" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_industries_path_idx" ON "_services_v_blocks_industries" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_industries_locales_locale_parent_id_uniqu" ON "_services_v_blocks_industries_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_industries_industries" CASCADE;
  DROP TABLE "pages_blocks_industries_industries_locales" CASCADE;
  DROP TABLE "pages_blocks_industries" CASCADE;
  DROP TABLE "pages_blocks_industries_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_industries_industries" CASCADE;
  DROP TABLE "_pages_v_blocks_industries_industries_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_industries" CASCADE;
  DROP TABLE "_pages_v_blocks_industries_locales" CASCADE;
  DROP TABLE "posts_blocks_industries_industries" CASCADE;
  DROP TABLE "posts_blocks_industries_industries_locales" CASCADE;
  DROP TABLE "posts_blocks_industries" CASCADE;
  DROP TABLE "posts_blocks_industries_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_industries_industries" CASCADE;
  DROP TABLE "_posts_v_blocks_industries_industries_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_industries" CASCADE;
  DROP TABLE "_posts_v_blocks_industries_locales" CASCADE;
  DROP TABLE "services_blocks_industries_industries" CASCADE;
  DROP TABLE "services_blocks_industries_industries_locales" CASCADE;
  DROP TABLE "services_blocks_industries" CASCADE;
  DROP TABLE "services_blocks_industries_locales" CASCADE;
  DROP TABLE "_services_v_blocks_industries_industries" CASCADE;
  DROP TABLE "_services_v_blocks_industries_industries_locales" CASCADE;
  DROP TABLE "_services_v_blocks_industries" CASCADE;
  DROP TABLE "_services_v_blocks_industries_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_industries_industries_tone";
  DROP TYPE "public"."enum__pages_v_blocks_industries_industries_tone";
  DROP TYPE "public"."enum_posts_blocks_industries_industries_tone";
  DROP TYPE "public"."enum__posts_v_blocks_industries_industries_tone";
  DROP TYPE "public"."enum_services_blocks_industries_industries_tone";
  DROP TYPE "public"."enum__services_v_blocks_industries_industries_tone";`)
}
