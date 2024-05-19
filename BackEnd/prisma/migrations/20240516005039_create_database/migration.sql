-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "gustavo_score" INTEGER NOT NULL,
    "bruna_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);
