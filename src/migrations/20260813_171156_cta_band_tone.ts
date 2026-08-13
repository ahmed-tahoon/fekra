import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_cta_tone" ADD VALUE 'band';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_tone" ADD VALUE 'band';
  ALTER TYPE "public"."enum_posts_blocks_cta_tone" ADD VALUE 'band';
  ALTER TYPE "public"."enum__posts_v_blocks_cta_tone" ADD VALUE 'band';
  ALTER TYPE "public"."enum_services_blocks_cta_tone" ADD VALUE 'band';
  ALTER TYPE "public"."enum__services_v_blocks_cta_tone" ADD VALUE 'band';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle', 'feature');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum_pages_blocks_cta_tone";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_pages_blocks_cta_tone" USING "tone"::"public"."enum_pages_blocks_cta_tone";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle', 'feature');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_cta_tone";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__pages_v_blocks_cta_tone" USING "tone"::"public"."enum__pages_v_blocks_cta_tone";
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_posts_blocks_cta_tone";
  CREATE TYPE "public"."enum_posts_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle', 'feature');
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum_posts_blocks_cta_tone";
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_posts_blocks_cta_tone" USING "tone"::"public"."enum_posts_blocks_cta_tone";
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__posts_v_blocks_cta_tone";
  CREATE TYPE "public"."enum__posts_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle', 'feature');
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum__posts_v_blocks_cta_tone";
  ALTER TABLE "_posts_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__posts_v_blocks_cta_tone" USING "tone"::"public"."enum__posts_v_blocks_cta_tone";
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_services_blocks_cta_tone";
  CREATE TYPE "public"."enum_services_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle', 'feature');
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum_services_blocks_cta_tone";
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_services_blocks_cta_tone" USING "tone"::"public"."enum_services_blocks_cta_tone";
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__services_v_blocks_cta_tone";
  CREATE TYPE "public"."enum__services_v_blocks_cta_tone" AS ENUM('brand', 'ink', 'subtle', 'feature');
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DEFAULT 'brand'::"public"."enum__services_v_blocks_cta_tone";
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "tone" SET DATA TYPE "public"."enum__services_v_blocks_cta_tone" USING "tone"::"public"."enum__services_v_blocks_cta_tone";`)
}
