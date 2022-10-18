import { createRouter } from "./context";
import { Prisma } from "@prisma/client";

import { formSchema } from "../../pages/components/admissionForm";

export const admissionFormRouter = createRouter()
  .query("hasActiveApplication", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user?.id || undefined;

      const exists = await ctx.prisma.application.findFirst({
        where: { userId },
      });

      return !!exists;
    },
  })
  .mutation("submit", {
    input: formSchema,
    async resolve({ ctx, input }) {
      const application: Prisma.ApplicationCreateInput = {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        dui: input.dui,
        address: input.address,
        tuition: input.tuition,
        yearOfStudy: input.yearOfStudy,
        hasJob: input.hasJob === "yes",
        levelOfStudy: input.levelOfStudy,
        institutionName: input.institutionName,
        institutionAddress: input.institutionAddress,
        institutionPhoneNumber: input.institutionPhoneNumber,
        careerName: input.careerName,
        academicReferenceName: input.academicReferenceName,
        academicReferenceNumber: input.academicReferenceNumber,
        municipality: { connect: { id: input.municipality } },
        user: { connect: { id: input.user } },
      };

      const createApplication = await ctx.prisma.application.create({
        data: application,
      });

      return createApplication;
    },
  });
