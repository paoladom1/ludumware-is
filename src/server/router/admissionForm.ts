import { createRouter } from "./context";
import { Prisma } from "@prisma/client";

import { formSchema } from "../../pages/components/admissionForm";

export const admissionFormRouter = createRouter().mutation("submit", {
  input: formSchema,
  async resolve({ ctx, input }) {
    const application: Prisma.ApplicationCreateInput = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      address: input.address,
      tuition: input.tuition,
      yearOfStudy: input.yearOfStudy,
      hasJob: input.hasJob === "yes",
      institutionName: input.institutionName,
      institutionAddress: input.institutionAddress,
      institutionPhoneNumber: input.institutionPhoneNumber,
      career: input.careerName,
      municipality: { connect: { id: input.municipality } },
    };

    const createApplication = await ctx.prisma.application.create({
      data: application,
    });

    return createApplication;
  },
});
