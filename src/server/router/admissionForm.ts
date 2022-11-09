import { createProtectedRouter } from "./context";
import { Prisma } from "@prisma/client";

import { formSchema } from "@/components/admissionForm";
import { z } from "zod";

export const admissionFormRouter = createProtectedRouter()
  .query("hasActiveApplication", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user?.id || undefined;

      const exists = await ctx.prisma.application.findFirst({
        where: { userId },
      });

      return !!exists;
    },
  })
  .query("findById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.application.findUnique({
        include: {
          municipality: {
            select: { name: true, department: { select: { name: true } } },
          },
        },
        where: { id: input.id },
      });
    },
  })
  .mutation("submit", {
    input: formSchema,
    async resolve({ ctx, input }) {
      const application: Prisma.ApplicationCreateInput = {
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        dateOfBirth: input.dateOfBirth,
        email: input.email,
        dui: input.dui,
        address: input.address,
        tuition: input.tuition,
        yearOfStudy: input.yearOfStudy,
        hasJob: input.hasJob === "yes",
        salary: input.salary,
        placeOfWork: input.placeOfWork,
        workAddress: input.workAddress,
        workPhoneNumber: input.workPhoneNumber,
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

      await ctx.prisma.user.update({ where: { id: input.user }, data: { gender: input.gender } });

      return createApplication;
    },
  });
