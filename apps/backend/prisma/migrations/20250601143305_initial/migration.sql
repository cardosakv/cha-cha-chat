-- CreateTable
CREATE TABLE "user" (
    "username" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "message" (
    "messageId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "content" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "attachmentId" INTEGER,

    CONSTRAINT "message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "attachment" (
    "attachmentId" SERIAL NOT NULL,
    "content" BYTEA NOT NULL,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("attachmentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "message_attachmentId_key" ON "message"("attachmentId");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("attachmentId") ON DELETE SET NULL ON UPDATE CASCADE;
