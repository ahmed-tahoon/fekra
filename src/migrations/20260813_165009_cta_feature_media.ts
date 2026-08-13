import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_cta_tone" ADD VALUE 'feature';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_tone" ADD VALUE 'feature';
  ALTER TYPE "public"."enum_posts_blocks_cta_tone" ADD VALUE 'feature';
  ALTER TYPE "public"."enum__posts_v_blocks_cta_tone" ADD VALUE 'feature';
  ALTER TYPE "public"."enum_services_blocks_cta_tone" ADD VALUE 'feature';
  ALTER TYPE "public"."enum__services_v_blocks_cta_tone" ADD VALUE 'feature';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_cta_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "posts_blocks_cta" ADD COLUMN "media_id" integer;
  ALTER TABLE "posts_blocks_cta_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_posts_v_blocks_cta" ADD COLUMN "media_id" integer;
  ALTER TABLE "_posts_v_blocks_cta_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "services_blocks_cta" ADD COLUMN "media_id" integer;
  ALTER TABLE "services_blocks_cta_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_services_v_blocks_cta" ADD COLUMN "media_id" integer;
  ALTER TABLE "_services_v_blocks_cta_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_cta_media_idx" ON "pages_blocks_cta" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_cta_media_idx" ON "_pages_v_blocks_cta" USING btree ("media_id");
  CREATE INDEX "posts_blocks_cta_media_idx" ON "posts_blocks_cta" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_cta_media_idx" ON "_posts_v_blocks_cta" USING btree ("media_id");
  CREATE INDEX "services_blocks_cta_media_idx" ON "services_blocks_cta" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_cta_media_idx" ON "_services_v_blocks_cta" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" DROP CONSTRAINT "pages_blocks_cta_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta" DROP CONSTRAINT "_pages_v_blocks_cta_media_id_media_id_fk";
  
  ALTER TABLE "posts_blocks_cta" DROP CONSTRAINT "posts_blocks_cta_media_id_media_id_fk";
  
  ALTER TABLE "_posts_v_blocks_cta" DROP CONSTRAINT "_posts_v_blocks_cta_media_id_media_id_fk";
  
  ALTER TABLE "services_blocks_cta" DROP CONSTRAINT "services_blocks_cta_media_id_media_id_fk";
  
  ALTER TABLE "_services_v_blocks_cta" DROP CONSTRAINT "_services_v_blocks_cta_media_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum_pages_blocks_cta_tone";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_pages_blocks_cta_tone" USING "tone"::"public"."enum_pages_blocks_cta_tone";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_cta_tone";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__pages_v_blocks_cta_tone" USING "tone"::"public"."enum__pages_v_blocks_cta_tone";
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_posts_blocks_cta_tone";
  CREATE TYPE "public"."enum_posts_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum_posts_blocks_cta_tone";
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_posts_blocks_cta_tone" USING "tone"::"public"."enum_posts_blocks_cta_tone";
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__posts_v_blocks_cta_tone";
  CREATE TYPE "public"."enum__posts_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum__posts_v_blocks_cta_tone";
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__posts_v_blocks_cta_tone" USING "tone"::"public"."enum__posts_v_blocks_cta_tone";
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_services_blocks_cta_tone";
  CREATE TYPE "public"."enum_services_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum_services_blocks_cta_tone";
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_services_blocks_cta_tone" USING "tone"::"public"."enum_services_blocks_cta_tone";
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__services_v_blocks_cta_tone";
  CREATE TYPE "public"."enum__services_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle');
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum__services_v_blocks_cta_tone";
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__services_v_blocks_cta_tone" USING "tone"::"public"."enum__services_v_blocks_cta_tone";
  DROP INDEX "pages_blocks_cta_media_idx";
  DROP INDEX "_pages_v_blocks_cta_media_idx";
  DROP INDEX "posts_blocks_cta_media_idx";
  DROP INDEX "_posts_v_blocks_cta_media_idx";
  DROP INDEX "services_blocks_cta_media_idx";
  DROP INDEX "_services_v_blocks_cta_media_idx";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "media_id";
  ALTER TABLE "pages_blocks_cta_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_cta_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "posts_blocks_cta" DROP COLUMN "media_id";
  ALTER TABLE "posts_blocks_cta_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "_posts_v_blocks_cta" DROP COLUMN "media_id";
  ALTER TABLE "_posts_v_blocks_cta_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "services_blocks_cta" DROP COLUMN "media_id";
  ALTER TABLE "services_blocks_cta_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "_services_v_blocks_cta" DROP COLUMN "media_id";
  ALTER TABLE "_services_v_blocks_cta_locales" DROP COLUMN "eyebrow";`)
}
