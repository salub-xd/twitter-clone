/*
  Warnings:

  - You are about to drop the column `followersIds` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followingIds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "followersIds",
DROP COLUMN "followingIds";
