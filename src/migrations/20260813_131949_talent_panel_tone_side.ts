import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_talent_showcase_panel_tone" AS ENUM('grey', 'mint');
  CREATE TYPE "public"."enum_pages_blocks_talent_showcase_side" AS ENUM('copyLeft', 'copyRight');
  CREATE TYPE "public"."enum__pages_v_blocks_talent_showcase_panel_tone" AS ENUM('grey', 'mint');
  CREATE TYPE "public"."enum__pages_v_blocks_talent_showcase_side" AS ENUM('copyLeft', 'copyRight');
  CREATE TYPE "public"."enum_posts_blocks_talent_showcase_panel_tone" AS ENUM('grey', 'mint');
  CREATE TYPE "public"."enum_posts_blocks_talent_showcase_side" AS ENUM('copyLeft', 'copyRight');
  CREATE TYPE "public"."enum__posts_v_blocks_talent_showcase_panel_tone" AS ENUM('grey', 'mint');
  CREATE TYPE "public"."enum__posts_v_blocks_talent_showcase_side" AS ENUM('copyLeft', 'copyRight');
  CREATE TYPE "public"."enum_services_blocks_talent_showcase_panel_tone" AS ENUM('grey', 'mint');
  CREATE TYPE "public"."enum_services_blocks_talent_showcase_side" AS ENUM('copyLeft', 'copyRight');
  CREATE TYPE "public"."enum__services_v_blocks_talent_showcase_panel_tone" AS ENUM('grey', 'mint');
  CREATE TYPE "public"."enum__services_v_blocks_talent_showcase_side" AS ENUM('copyLeft', 'copyRight');
  ALTER TABLE "pages_blocks_talent_showcase" ADD COLUMN "panel_tone" "enum_pages_blocks_talent_showcase_panel_tone" DEFAULT 'grey';
  ALTER TABLE "pages_blocks_talent_showcase" ADD COLUMN "side" "enum_pages_blocks_talent_showcase_side" DEFAULT 'copyLeft';
  ALTER TABLE "_pages_v_blocks_talent_showcase" ADD COLUMN "panel_tone" "enum__pages_v_blocks_talent_showcase_panel_tone" DEFAULT 'grey';
  ALTER TABLE "_pages_v_blocks_talent_showcase" ADD COLUMN "side" "enum__pages_v_blocks_talent_showcase_side" DEFAULT 'copyLeft';
  ALTER TABLE "posts_blocks_talent_showcase" ADD COLUMN "panel_tone" "enum_posts_blocks_talent_showcase_panel_tone" DEFAULT 'grey';
  ALTER TABLE "posts_blocks_talent_showcase" ADD COLUMN "side" "enum_posts_blocks_talent_showcase_side" DEFAULT 'copyLeft';
  ALTER TABLE "_posts_v_blocks_talent_showcase" ADD COLUMN "panel_tone" "enum__posts_v_blocks_talent_showcase_panel_tone" DEFAULT 'grey';
  ALTER TABLE "_posts_v_blocks_talent_showcase" ADD COLUMN "side" "enum__posts_v_blocks_talent_showcase_side" DEFAULT 'copyLeft';
  ALTER TABLE "services_blocks_talent_showcase" ADD COLUMN "panel_tone" "enum_services_blocks_talent_showcase_panel_tone" DEFAULT 'grey';
  ALTER TABLE "services_blocks_talent_showcase" ADD COLUMN "side" "enum_services_blocks_talent_showcase_side" DEFAULT 'copyLeft';
  ALTER TABLE "_services_v_blocks_talent_showcase" ADD COLUMN "panel_tone" "enum__services_v_blocks_talent_showcase_panel_tone" DEFAULT 'grey';
  ALTER TABLE "_services_v_blocks_talent_showcase" ADD COLUMN "side" "enum__services_v_blocks_talent_showcase_side" DEFAULT 'copyLeft';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_talent_showcase" DROP COLUMN "panel_tone";
  ALTER TABLE "pages_blocks_talent_showcase" DROP COLUMN "side";
  ALTER TABLE "_pages_v_blocks_talent_showcase" DROP COLUMN "panel_tone";
  ALTER TABLE "_pages_v_blocks_talent_showcase" DROP COLUMN "side";
  ALTER TABLE "posts_blocks_talent_showcase" DROP COLUMN "panel_tone";
  ALTER TABLE "posts_blocks_talent_showcase" DROP COLUMN "side";
  ALTER TABLE "_posts_v_blocks_talent_showcase" DROP COLUMN "panel_tone";
  ALTER TABLE "_posts_v_blocks_talent_showcase" DROP COLUMN "side";
  ALTER TABLE "services_blocks_talent_showcase" DROP COLUMN "panel_tone";
  ALTER TABLE "services_blocks_talent_showcase" DROP COLUMN "side";
  ALTER TABLE "_services_v_blocks_talent_showcase" DROP COLUMN "panel_tone";
  ALTER TABLE "_services_v_blocks_talent_showcase" DROP COLUMN "side";
  DROP TYPE "public"."enum_pages_blocks_talent_showcase_panel_tone";
  DROP TYPE "public"."enum_pages_blocks_talent_showcase_side";
  DROP TYPE "public"."enum__pages_v_blocks_talent_showcase_panel_tone";
  DROP TYPE "public"."enum__pages_v_blocks_talent_showcase_side";
  DROP TYPE "public"."enum_posts_blocks_talent_showcase_panel_tone";
  DROP TYPE "public"."enum_posts_blocks_talent_showcase_side";
  DROP TYPE "public"."enum__posts_v_blocks_talent_showcase_panel_tone";
  DROP TYPE "public"."enum__posts_v_blocks_talent_showcase_side";
  DROP TYPE "public"."enum_services_blocks_talent_showcase_panel_tone";
  DROP TYPE "public"."enum_services_blocks_talent_showcase_side";
  DROP TYPE "public"."enum__services_v_blocks_talent_showcase_panel_tone";
  DROP TYPE "public"."enum__services_v_blocks_talent_showcase_side";`)
}
