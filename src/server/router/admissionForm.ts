import { createRouter } from "./context";
import { z } from "zod";

import { formSchema } from "../../pages/components/admissionForm";

export const admissionFormRouter = createRouter().mutation("submit", {
  input: formSchema,
  async resolve({ ctx, input }) {
    return await ctx.prisma.record.create({ data: input });
  },
});
