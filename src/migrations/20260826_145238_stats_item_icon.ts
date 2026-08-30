import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_stats_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "posts_blocks_stats_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_posts_v_blocks_stats_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "services_blocks_stats_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_services_v_blocks_stats_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_items" ADD CONSTRAINT "posts_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_items" ADD CONSTRAINT "_posts_v_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_stats_items_icon_idx" ON "pages_blocks_stats_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_stats_items_icon_idx" ON "_pages_v_blocks_stats_items" USING btree ("icon_id");
  CREATE INDEX "posts_blocks_stats_items_icon_idx" ON "posts_blocks_stats_items" USING btree ("icon_id");
  CREATE INDEX "_posts_v_blocks_stats_items_icon_idx" ON "_posts_v_blocks_stats_items" USING btree ("icon_id");
  CREATE INDEX "services_blocks_stats_items_icon_idx" ON "services_blocks_stats_items" USING btree ("icon_id");
  CREATE INDEX "_services_v_blocks_stats_items_icon_idx" ON "_services_v_blocks_stats_items" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_stats_items" DROP CONSTRAINT "pages_blocks_stats_items_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_stats_items" DROP CONSTRAINT "_pages_v_blocks_stats_items_icon_id_media_id_fk";
  
  ALTER TABLE "posts_blocks_stats_items" DROP CONSTRAINT "posts_blocks_stats_items_icon_id_media_id_fk";
  
  ALTER TABLE "_posts_v_blocks_stats_items" DROP CONSTRAINT "_posts_v_blocks_stats_items_icon_id_media_id_fk";
  
  ALTER TABLE "services_blocks_stats_items" DROP CONSTRAINT "services_blocks_stats_items_icon_id_media_id_fk";
  
  ALTER TABLE "_services_v_blocks_stats_items" DROP CONSTRAINT "_services_v_blocks_stats_items_icon_id_media_id_fk";
  
  DROP INDEX "pages_blocks_stats_items_icon_idx";
  DROP INDEX "_pages_v_blocks_stats_items_icon_idx";
  DROP INDEX "posts_blocks_stats_items_icon_idx";
  DROP INDEX "_posts_v_blocks_stats_items_icon_idx";
  DROP INDEX "services_blocks_stats_items_icon_idx";
  DROP INDEX "_services_v_blocks_stats_items_icon_idx";
  ALTER TABLE "pages_blocks_stats_items" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_stats_items" DROP COLUMN "icon_id";
  ALTER TABLE "posts_blocks_stats_items" DROP COLUMN "icon_id";
  ALTER TABLE "_posts_v_blocks_stats_items" DROP COLUMN "icon_id";
  ALTER TABLE "services_blocks_stats_items" DROP COLUMN "icon_id";
  ALTER TABLE "_services_v_blocks_stats_items" DROP COLUMN "icon_id";`)
}
