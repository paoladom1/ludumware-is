import { z } from "zod";
import { createRouter } from "./context";

export const municipalityRouter = createRouter()
  .query("findByDepartment", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.municipality.findMany({
        select: { id: true, name: true },
        where: { departmentId: input.id },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.municipality.findMany({
        select: { id: true, name: true, departmentId: true },
      });
    },
  });
