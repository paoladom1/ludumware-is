import { createAdminProtectedRouter } from "./context";

export const dashboardRouter = createAdminProtectedRouter().query(
  "scholarsByGender",
  {
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
  }
);
