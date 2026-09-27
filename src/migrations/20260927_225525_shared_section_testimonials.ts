import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_shared_section_section" ADD VALUE 'testimonials' BEFORE 'fika';
  ALTER TYPE "public"."enum__pages_v_blocks_shared_section_section" ADD VALUE 'testimonials' BEFORE 'fika';
  ALTER TYPE "public"."enum_posts_blocks_shared_section_section" ADD VALUE 'testimonials' BEFORE 'fika';
  ALTER TYPE "public"."enum__posts_v_blocks_shared_section_section" ADD VALUE 'testimonials' BEFORE 'fika';
  ALTER TYPE "public"."enum_services_blocks_shared_section_section" ADD VALUE 'testimonials' BEFORE 'fika';
  ALTER TYPE "public"."enum__services_v_blocks_shared_section_section" ADD VALUE 'testimonials' BEFORE 'fika';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_shared_section_section";
  CREATE TYPE "public"."enum_pages_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  ALTER TABLE "pages_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE "public"."enum_pages_blocks_shared_section_section" USING "section"::"public"."enum_pages_blocks_shared_section_section";
  ALTER TABLE "_pages_v_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_shared_section_section";
  CREATE TYPE "public"."enum__pages_v_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  ALTER TABLE "_pages_v_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE "public"."enum__pages_v_blocks_shared_section_section" USING "section"::"public"."enum__pages_v_blocks_shared_section_section";
  ALTER TABLE "posts_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE text;
  DROP TYPE "public"."enum_posts_blocks_shared_section_section";
  CREATE TYPE "public"."enum_posts_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  ALTER TABLE "posts_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE "public"."enum_posts_blocks_shared_section_section" USING "section"::"public"."enum_posts_blocks_shared_section_section";
  ALTER TABLE "_posts_v_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_blocks_shared_section_section";
  CREATE TYPE "public"."enum__posts_v_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  ALTER TABLE "_posts_v_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE "public"."enum__posts_v_blocks_shared_section_section" USING "section"::"public"."enum__posts_v_blocks_shared_section_section";
  ALTER TABLE "services_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE text;
  DROP TYPE "public"."enum_services_blocks_shared_section_section";
  CREATE TYPE "public"."enum_services_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  ALTER TABLE "services_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE "public"."enum_services_blocks_shared_section_section" USING "section"::"public"."enum_services_blocks_shared_section_section";
  ALTER TABLE "_services_v_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE text;
  DROP TYPE "public"."enum__services_v_blocks_shared_section_section";
  CREATE TYPE "public"."enum__services_v_blocks_shared_section_section" AS ENUM('techStack', 'process', 'industries', 'fika', 'certifications', 'faq', 'posts', 'contact', 'ctaBand');
  ALTER TABLE "_services_v_blocks_shared_section" ALTER COLUMN "section" SET DATA TYPE "public"."enum__services_v_blocks_shared_section_section" USING "section"::"public"."enum__services_v_blocks_shared_section_section";`)
}
