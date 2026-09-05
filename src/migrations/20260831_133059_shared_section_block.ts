import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  CREATE TYPE "public"."enum__pages_v_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  CREATE TYPE "public"."enum_posts_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  CREATE TYPE "public"."enum__posts_v_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  CREATE TYPE "public"."enum_services_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  CREATE TYPE "public"."enum__services_v_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  CREATE TABLE "pages_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_pages_blocks_shared_section_section",
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section" "enum__pages_v_blocks_shared_section_section",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_posts_blocks_shared_section_section",
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section" "enum__posts_v_blocks_shared_section_section",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_services_blocks_shared_section_section",
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section" "enum__services_v_blocks_shared_section_section",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_shared_section" ADD CONSTRAINT "pages_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_shared_section" ADD CONSTRAINT "_pages_v_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_shared_section" ADD CONSTRAINT "posts_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_shared_section" ADD CONSTRAINT "_posts_v_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_shared_section" ADD CONSTRAINT "services_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_shared_section" ADD CONSTRAINT "_services_v_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_shared_section_order_idx" ON "pages_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_shared_section_parent_id_idx" ON "pages_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_shared_section_path_idx" ON "pages_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_shared_section_order_idx" ON "_pages_v_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_shared_section_parent_id_idx" ON "_pages_v_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_shared_section_path_idx" ON "_pages_v_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "posts_blocks_shared_section_order_idx" ON "posts_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "posts_blocks_shared_section_parent_id_idx" ON "posts_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_shared_section_path_idx" ON "posts_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_shared_section_order_idx" ON "_posts_v_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_shared_section_parent_id_idx" ON "_posts_v_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_shared_section_path_idx" ON "_posts_v_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "services_blocks_shared_section_order_idx" ON "services_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "services_blocks_shared_section_parent_id_idx" ON "services_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_shared_section_path_idx" ON "services_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_shared_section_order_idx" ON "_services_v_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_shared_section_parent_id_idx" ON "_services_v_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_shared_section_path_idx" ON "_services_v_blocks_shared_section" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_shared_section" CASCADE;
  DROP TABLE "_pages_v_blocks_shared_section" CASCADE;
  DROP TABLE "posts_blocks_shared_section" CASCADE;
  DROP TABLE "_posts_v_blocks_shared_section" CASCADE;
  DROP TABLE "services_blocks_shared_section" CASCADE;
  DROP TABLE "_services_v_blocks_shared_section" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_shared_section_section";
  DROP TYPE "public"."enum__pages_v_blocks_shared_section_section";
  DROP TYPE "public"."enum_posts_blocks_shared_section_section";
  DROP TYPE "public"."enum__posts_v_blocks_shared_section_section";
  DROP TYPE "public"."enum_services_blocks_shared_section_section";
  DROP TYPE "public"."enum__services_v_blocks_shared_section_section";`)
}
