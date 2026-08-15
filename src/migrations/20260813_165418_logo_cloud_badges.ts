import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_logo_cloud_variant" AS ENUM('statement', 'badges');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_variant" AS ENUM('statement', 'badges');
  CREATE TYPE "public"."enum_posts_blocks_logo_cloud_variant" AS ENUM('statement', 'badges');
  CREATE TYPE "public"."enum__posts_v_blocks_logo_cloud_variant" AS ENUM('statement', 'badges');
  CREATE TYPE "public"."enum_services_blocks_logo_cloud_variant" AS ENUM('statement', 'badges');
  CREATE TYPE "public"."enum__services_v_blocks_logo_cloud_variant" AS ENUM('statement', 'badges');
  ALTER TABLE "pages_blocks_logo_cloud" ADD COLUMN "variant" "enum_pages_blocks_logo_cloud_variant" DEFAULT 'statement';
  ALTER TABLE "pages_blocks_logo_cloud_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD COLUMN "variant" "enum__pages_v_blocks_logo_cloud_variant" DEFAULT 'statement';
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "posts_blocks_logo_cloud" ADD COLUMN "variant" "enum_posts_blocks_logo_cloud_variant" DEFAULT 'statement';
  ALTER TABLE "posts_blocks_logo_cloud_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_posts_v_blocks_logo_cloud" ADD COLUMN "variant" "enum__posts_v_blocks_logo_cloud_variant" DEFAULT 'statement';
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "services_blocks_logo_cloud" ADD COLUMN "variant" "enum_services_blocks_logo_cloud_variant" DEFAULT 'statement';
  ALTER TABLE "services_blocks_logo_cloud_locales" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_services_v_blocks_logo_cloud" ADD COLUMN "variant" "enum__services_v_blocks_logo_cloud_variant" DEFAULT 'statement';
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" ADD COLUMN "eyebrow" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_logo_cloud" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_logo_cloud_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_logo_cloud" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_logo_cloud_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "posts_blocks_logo_cloud" DROP COLUMN "variant";
  ALTER TABLE "posts_blocks_logo_cloud_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "_posts_v_blocks_logo_cloud" DROP COLUMN "variant";
  ALTER TABLE "_posts_v_blocks_logo_cloud_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "services_blocks_logo_cloud" DROP COLUMN "variant";
  ALTER TABLE "services_blocks_logo_cloud_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "_services_v_blocks_logo_cloud" DROP COLUMN "variant";
  ALTER TABLE "_services_v_blocks_logo_cloud_locales" DROP COLUMN "eyebrow";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_posts_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum__posts_v_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_services_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum__services_v_blocks_logo_cloud_variant";`)
}
