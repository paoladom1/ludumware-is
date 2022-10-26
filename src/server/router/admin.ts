import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";
import { createAdminProtectedRouter } from "./context";

export const adminRouter = createAdminProtectedRouter()
  .query("getAllApplications", {
    resolve({ ctx }) {
      return ctx.prisma.application.findMany({
        select: {
          id: true,
          email: true,
          status: true,
          firstName: true,
          lastName: true,
          levelOfStudy: true,
          createdAt: true,
        },
      });
    },
  })
  .mutation("acceptApplication", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.application.update({
        where: { id: input.id },
        data: {
          status: ApplicationStatus.ACCEPTED,
          record: { create: {} },
          user: { update: { role: "SCHOLAR" } },
        },
      });
    },
  })
  .mutation("declineApplication", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.application.update({
        where: { id: input.id },
        data: { status: ApplicationStatus.DENIED },
      });
    },
  });
