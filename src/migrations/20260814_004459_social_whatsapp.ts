import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_site_settings_social_profiles_platform" ADD VALUE 'whatsapp' BEFORE 'x';
  ALTER TYPE "public"."enum__site_settings_v_version_social_profiles_platform" ADD VALUE 'whatsapp' BEFORE 'x';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_social_profiles" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_site_settings_social_profiles_platform";
  CREATE TYPE "public"."enum_site_settings_social_profiles_platform" AS ENUM('linkedin', 'x', 'facebook', 'instagram', 'youtube', 'github');
  ALTER TABLE "site_settings_social_profiles" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_site_settings_social_profiles_platform" USING "platform"::"public"."enum_site_settings_social_profiles_platform";
  ALTER TABLE "_site_settings_v_version_social_profiles" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum__site_settings_v_version_social_profiles_platform";
  CREATE TYPE "public"."enum__site_settings_v_version_social_profiles_platform" AS ENUM('linkedin', 'x', 'facebook', 'instagram', 'youtube', 'github');
  ALTER TABLE "_site_settings_v_version_social_profiles" ALTER COLUMN "platform" SET DATA TYPE "public"."enum__site_settings_v_version_social_profiles_platform" USING "platform"::"public"."enum__site_settings_v_version_social_profiles_platform";`)
}
