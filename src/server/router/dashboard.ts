import { ApplicationStatus } from "@prisma/client";
import { createAdminProtectedRouter } from "./context";

export const dashboardRouter = createAdminProtectedRouter()
  .query("scholarsByGender", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.groupBy({
        by: ["gender"],
        where: {
          role: {
            equals: "SCHOLAR",
          },
        },
        _count: {
          gender: true,
        },
      });
    },
  })
  .query("applicationsCount", {
    async resolve({ ctx }) {
      const totalApplications = await ctx.prisma.application.count();
      const acceptedApplications = await ctx.prisma.application.count({
        where: { status: ApplicationStatus.ACCEPTED },
      });
      return { totalApplications, acceptedApplications };
    },
  })
  .query("scholarsByLevelOfStudy", {
    async resolve({ ctx }) {
      return await ctx.prisma.application.groupBy({
        by: ["levelOfStudy"],
        where: {
          status: {
            equals: "ACCEPTED",
          },
        },
        _count: {
          levelOfStudy: true,
        },
      });
    },
  });
