import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'green';
  ALTER TABLE "_pages_v_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'green';
  ALTER TABLE "posts_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'green';
  ALTER TABLE "_posts_v_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'green';
  ALTER TABLE "services_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'green';
  ALTER TABLE "_services_v_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'green';
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT 'media';
  ALTER TABLE "applicant_files" ADD COLUMN "prefix" varchar DEFAULT 'applications';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'brand';
  ALTER TABLE "_pages_v_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'brand';
  ALTER TABLE "posts_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'brand';
  ALTER TABLE "_posts_v_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'brand';
  ALTER TABLE "services_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'brand';
  ALTER TABLE "_services_v_blocks_hero_mosaic" ALTER COLUMN "tone" SET DEFAULT 'brand';
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "applicant_files" DROP COLUMN "prefix";`)
}
