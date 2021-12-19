-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expected" INTEGER NOT NULL,
    "achieved" INTEGER,
    "goalId" INTEGER,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamGoal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "TeamGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamProcess" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expected" INTEGER NOT NULL,
    "achieved" INTEGER,
    "teamGoalId" INTEGER,

    CONSTRAINT "TeamProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnTeam" (
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "UserOnTeam_pkey" PRIMARY KEY ("userId","teamId")
);

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamGoal" ADD CONSTRAINT "TeamGoal_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamProcess" ADD CONSTRAINT "TeamProcess_teamGoalId_fkey" FOREIGN KEY ("teamGoalId") REFERENCES "TeamGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTeam" ADD CONSTRAINT "UserOnTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTeam" ADD CONSTRAINT "UserOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
