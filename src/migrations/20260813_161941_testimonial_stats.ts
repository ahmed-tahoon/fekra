import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"star" boolean
  );
  
  CREATE TABLE "pages_blocks_testimonials_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"star" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"star" boolean
  );
  
  CREATE TABLE "posts_blocks_testimonials_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"star" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"star" boolean
  );
  
  CREATE TABLE "services_blocks_testimonials_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"star" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_testimonials_stats" ADD CONSTRAINT "pages_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_stats_locales" ADD CONSTRAINT "pages_blocks_testimonials_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_stats" ADD CONSTRAINT "_pages_v_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_stats_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_stats" ADD CONSTRAINT "posts_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_stats_locales" ADD CONSTRAINT "posts_blocks_testimonials_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_stats" ADD CONSTRAINT "_posts_v_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_stats_locales" ADD CONSTRAINT "_posts_v_blocks_testimonials_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_stats" ADD CONSTRAINT "services_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_stats_locales" ADD CONSTRAINT "services_blocks_testimonials_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_stats" ADD CONSTRAINT "_services_v_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_stats_locales" ADD CONSTRAINT "_services_v_blocks_testimonials_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials_stats"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_testimonials_stats_order_idx" ON "pages_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_stats_parent_id_idx" ON "pages_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_stats_locales_locale_parent_id_uni" ON "pages_blocks_testimonials_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_stats_order_idx" ON "_pages_v_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_stats_parent_id_idx" ON "_pages_v_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_stats_locales_locale_parent_id_" ON "_pages_v_blocks_testimonials_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_testimonials_stats_order_idx" ON "posts_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_stats_parent_id_idx" ON "posts_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_testimonials_stats_locales_locale_parent_id_uni" ON "posts_blocks_testimonials_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_stats_order_idx" ON "_posts_v_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_stats_parent_id_idx" ON "_posts_v_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_testimonials_stats_locales_locale_parent_id_" ON "_posts_v_blocks_testimonials_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_testimonials_stats_order_idx" ON "services_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_stats_parent_id_idx" ON "services_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_testimonials_stats_locales_locale_parent_id_" ON "services_blocks_testimonials_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_stats_order_idx" ON "_services_v_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_stats_parent_id_idx" ON "_services_v_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_testimonials_stats_locales_locale_parent_" ON "_services_v_blocks_testimonials_stats_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_testimonials_stats" CASCADE;
  DROP TABLE "pages_blocks_testimonials_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_stats_locales" CASCADE;
  DROP TABLE "posts_blocks_testimonials_stats" CASCADE;
  DROP TABLE "posts_blocks_testimonials_stats_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_stats_locales" CASCADE;
  DROP TABLE "services_blocks_testimonials_stats" CASCADE;
  DROP TABLE "services_blocks_testimonials_stats_locales" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_stats" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_stats_locales" CASCADE;`)
}
