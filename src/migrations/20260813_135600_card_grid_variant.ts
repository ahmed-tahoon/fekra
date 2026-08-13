import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_grid_variant" AS ENUM('plain', 'business');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_variant" AS ENUM('plain', 'business');
  CREATE TYPE "public"."enum_posts_blocks_card_grid_variant" AS ENUM('plain', 'business');
  CREATE TYPE "public"."enum__posts_v_blocks_card_grid_variant" AS ENUM('plain', 'business');
  CREATE TYPE "public"."enum_services_blocks_card_grid_variant" AS ENUM('plain', 'business');
  CREATE TYPE "public"."enum__services_v_blocks_card_grid_variant" AS ENUM('plain', 'business');
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "variant" "enum_pages_blocks_card_grid_variant" DEFAULT 'plain';
  ALTER TABLE "_pages_v_blocks_card_grid" ADD COLUMN "variant" "enum__pages_v_blocks_card_grid_variant" DEFAULT 'plain';
  ALTER TABLE "posts_blocks_card_grid" ADD COLUMN "variant" "enum_posts_blocks_card_grid_variant" DEFAULT 'plain';
  ALTER TABLE "_posts_v_blocks_card_grid" ADD COLUMN "variant" "enum__posts_v_blocks_card_grid_variant" DEFAULT 'plain';
  ALTER TABLE "services_blocks_card_grid" ADD COLUMN "variant" "enum_services_blocks_card_grid_variant" DEFAULT 'plain';
  ALTER TABLE "_services_v_blocks_card_grid" ADD COLUMN "variant" "enum__services_v_blocks_card_grid_variant" DEFAULT 'plain';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_card_grid" DROP COLUMN "variant";
  ALTER TABLE "posts_blocks_card_grid" DROP COLUMN "variant";
  ALTER TABLE "_posts_v_blocks_card_grid" DROP COLUMN "variant";
  ALTER TABLE "services_blocks_card_grid" DROP COLUMN "variant";
  ALTER TABLE "_services_v_blocks_card_grid" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_card_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_variant";
  DROP TYPE "public"."enum_posts_blocks_card_grid_variant";
  DROP TYPE "public"."enum__posts_v_blocks_card_grid_variant";
  DROP TYPE "public"."enum_services_blocks_card_grid_variant";
  DROP TYPE "public"."enum__services_v_blocks_card_grid_variant";`)
}
