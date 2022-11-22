import { createProtectedRouter } from "./context";
import { Application, Prisma } from "@prisma/client";

import { FormSchema } from "@/components/admissionForm";
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
  .query("findByUser", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.application.findFirstOrThrow({
        include: {
          municipality: {
            select: {
              id: true,
              name: true,
              department: { select: { id: true, name: true } },
            },
          },
        },
        where: { userId: input.id },
      });
    },
  })
  .mutation("createApplication", {
    input: FormSchema,
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
        user: { connect: { id: ctx.session.user.id } },
      };

      const newApplication: Application = await ctx.prisma.application.create({
        data: application,
      });

      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { gender: input.gender },
      });

      return newApplication;
    },
  })
  .mutation("updateApplication", {
    input: z.object({
      id: z.string(),
      data: FormSchema,
    }),
    async resolve({ ctx, input }) {
      const applicationData: Prisma.ApplicationUpdateInput = {
        firstName: input.data.firstName,
        lastName: input.data.lastName,
        gender: input.data.gender,
        dateOfBirth: input.data.dateOfBirth,
        email: input.data.email,
        dui: input.data.dui,
        address: input.data.address,
        tuition: input.data.tuition,
        yearOfStudy: input.data.yearOfStudy,
        hasJob: input.data.hasJob === "yes",
        salary: input.data.salary,
        placeOfWork: input.data.placeOfWork,
        workAddress: input.data.workAddress,
        workPhoneNumber: input.data.workPhoneNumber,
        levelOfStudy: input.data.levelOfStudy,
        institutionName: input.data.institutionName,
        institutionAddress: input.data.institutionAddress,
        institutionPhoneNumber: input.data.institutionPhoneNumber,
        careerName: input.data.careerName,
        academicReferenceName: input.data.academicReferenceName,
        academicReferenceNumber: input.data.academicReferenceNumber,
        municipality: { connect: { id: input.data.municipality } },
        user: { connect: { id: ctx.session.user.id } },
      };

      const application = await ctx.prisma.application.update({
        where: { id: input.id },
        data: applicationData,
      });

      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { gender: input.data.gender },
      });

      return application;
    },
  });
