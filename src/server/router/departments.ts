import { createRouter } from "./context";

export const departmentsRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return await ctx.prisma.department.findMany({
      select: { id: true, name: true },
    });
  },
});
