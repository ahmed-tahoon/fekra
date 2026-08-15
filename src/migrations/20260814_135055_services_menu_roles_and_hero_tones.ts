import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_service_hero_hero_tone" ADD VALUE 'amber';
  ALTER TYPE "public"."enum_pages_blocks_service_hero_hero_tone" ADD VALUE 'sky';
  ALTER TYPE "public"."enum_pages_blocks_service_hero_hero_tone" ADD VALUE 'coral';
  ALTER TYPE "public"."enum_pages_blocks_service_hero_hero_tone" ADD VALUE 'teal';
  ALTER TYPE "public"."enum_pages_blocks_service_hero_hero_tone" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_service_hero_hero_tone" ADD VALUE 'lilac';
  ALTER TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" ADD VALUE 'amber';
  ALTER TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" ADD VALUE 'sky';
  ALTER TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" ADD VALUE 'coral';
  ALTER TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" ADD VALUE 'teal';
  ALTER TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" ADD VALUE 'lilac';
  ALTER TYPE "public"."enum_posts_blocks_service_hero_hero_tone" ADD VALUE 'amber';
  ALTER TYPE "public"."enum_posts_blocks_service_hero_hero_tone" ADD VALUE 'sky';
  ALTER TYPE "public"."enum_posts_blocks_service_hero_hero_tone" ADD VALUE 'coral';
  ALTER TYPE "public"."enum_posts_blocks_service_hero_hero_tone" ADD VALUE 'teal';
  ALTER TYPE "public"."enum_posts_blocks_service_hero_hero_tone" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_posts_blocks_service_hero_hero_tone" ADD VALUE 'lilac';
  ALTER TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" ADD VALUE 'amber';
  ALTER TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" ADD VALUE 'sky';
  ALTER TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" ADD VALUE 'coral';
  ALTER TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" ADD VALUE 'teal';
  ALTER TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" ADD VALUE 'lilac';
  ALTER TYPE "public"."enum_services_blocks_service_hero_hero_tone" ADD VALUE 'amber';
  ALTER TYPE "public"."enum_services_blocks_service_hero_hero_tone" ADD VALUE 'sky';
  ALTER TYPE "public"."enum_services_blocks_service_hero_hero_tone" ADD VALUE 'coral';
  ALTER TYPE "public"."enum_services_blocks_service_hero_hero_tone" ADD VALUE 'teal';
  ALTER TYPE "public"."enum_services_blocks_service_hero_hero_tone" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_services_blocks_service_hero_hero_tone" ADD VALUE 'lilac';
  ALTER TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" ADD VALUE 'amber';
  ALTER TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" ADD VALUE 'sky';
  ALTER TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" ADD VALUE 'coral';
  ALTER TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" ADD VALUE 'teal';
  ALTER TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" ADD VALUE 'lilac';
  CREATE TABLE "services_menu_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_menu_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_services_v_version_menu_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_menu_roles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_service_hero_locales" ADD COLUMN "closer" varchar;
  ALTER TABLE "_pages_v_blocks_service_hero_locales" ADD COLUMN "closer" varchar;
  ALTER TABLE "posts_blocks_service_hero_locales" ADD COLUMN "closer" varchar;
  ALTER TABLE "_posts_v_blocks_service_hero_locales" ADD COLUMN "closer" varchar;
  ALTER TABLE "services_blocks_service_hero_locales" ADD COLUMN "closer" varchar;
  ALTER TABLE "_services_v_blocks_service_hero_locales" ADD COLUMN "closer" varchar;
  ALTER TABLE "services_menu_roles" ADD CONSTRAINT "services_menu_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_menu_roles_locales" ADD CONSTRAINT "services_menu_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_menu_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_menu_roles" ADD CONSTRAINT "_services_v_version_menu_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_menu_roles_locales" ADD CONSTRAINT "_services_v_version_menu_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_menu_roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_menu_roles_order_idx" ON "services_menu_roles" USING btree ("_order");
  CREATE INDEX "services_menu_roles_parent_id_idx" ON "services_menu_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_menu_roles_locales_locale_parent_id_unique" ON "services_menu_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_menu_roles_order_idx" ON "_services_v_version_menu_roles" USING btree ("_order");
  CREATE INDEX "_services_v_version_menu_roles_parent_id_idx" ON "_services_v_version_menu_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_menu_roles_locales_locale_parent_id_uniq" ON "_services_v_version_menu_roles_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_menu_roles" CASCADE;
  DROP TABLE "services_menu_roles_locales" CASCADE;
  DROP TABLE "_services_v_version_menu_roles" CASCADE;
  DROP TABLE "_services_v_version_menu_roles_locales" CASCADE;
  ALTER TABLE "pages_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::text;
  DROP TYPE "public"."enum_pages_blocks_service_hero_hero_tone";
  CREATE TYPE "public"."enum_pages_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  ALTER TABLE "pages_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::"public"."enum_pages_blocks_service_hero_hero_tone";
  ALTER TABLE "pages_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE "public"."enum_pages_blocks_service_hero_hero_tone" USING "hero_tone"::"public"."enum_pages_blocks_service_hero_hero_tone";
  ALTER TABLE "_pages_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::text;
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone";
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  ALTER TABLE "_pages_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::"public"."enum__pages_v_blocks_service_hero_hero_tone";
  ALTER TABLE "_pages_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE "public"."enum__pages_v_blocks_service_hero_hero_tone" USING "hero_tone"::"public"."enum__pages_v_blocks_service_hero_hero_tone";
  ALTER TABLE "posts_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE text;
  ALTER TABLE "posts_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::text;
  DROP TYPE "public"."enum_posts_blocks_service_hero_hero_tone";
  CREATE TYPE "public"."enum_posts_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  ALTER TABLE "posts_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::"public"."enum_posts_blocks_service_hero_hero_tone";
  ALTER TABLE "posts_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE "public"."enum_posts_blocks_service_hero_hero_tone" USING "hero_tone"::"public"."enum_posts_blocks_service_hero_hero_tone";
  ALTER TABLE "_posts_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE text;
  ALTER TABLE "_posts_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::text;
  DROP TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone";
  CREATE TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  ALTER TABLE "_posts_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::"public"."enum__posts_v_blocks_service_hero_hero_tone";
  ALTER TABLE "_posts_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE "public"."enum__posts_v_blocks_service_hero_hero_tone" USING "hero_tone"::"public"."enum__posts_v_blocks_service_hero_hero_tone";
  ALTER TABLE "services_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE text;
  ALTER TABLE "services_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::text;
  DROP TYPE "public"."enum_services_blocks_service_hero_hero_tone";
  CREATE TYPE "public"."enum_services_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  ALTER TABLE "services_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::"public"."enum_services_blocks_service_hero_hero_tone";
  ALTER TABLE "services_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE "public"."enum_services_blocks_service_hero_hero_tone" USING "hero_tone"::"public"."enum_services_blocks_service_hero_hero_tone";
  ALTER TABLE "_services_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::text;
  DROP TYPE "public"."enum__services_v_blocks_service_hero_hero_tone";
  CREATE TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" AS ENUM('mint', 'blue', 'blush');
  ALTER TABLE "_services_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DEFAULT 'mint'::"public"."enum__services_v_blocks_service_hero_hero_tone";
  ALTER TABLE "_services_v_blocks_service_hero" ALTER COLUMN "hero_tone" SET DATA TYPE "public"."enum__services_v_blocks_service_hero_hero_tone" USING "hero_tone"::"public"."enum__services_v_blocks_service_hero_hero_tone";
  ALTER TABLE "pages_blocks_service_hero_locales" DROP COLUMN "closer";
  ALTER TABLE "_pages_v_blocks_service_hero_locales" DROP COLUMN "closer";
  ALTER TABLE "posts_blocks_service_hero_locales" DROP COLUMN "closer";
  ALTER TABLE "_posts_v_blocks_service_hero_locales" DROP COLUMN "closer";
  ALTER TABLE "services_blocks_service_hero_locales" DROP COLUMN "closer";
  ALTER TABLE "_services_v_blocks_service_hero_locales" DROP COLUMN "closer";`)
}
