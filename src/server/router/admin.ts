import { createProtectedRouter } from "./context";

// Example router with queries that can only be hit if the user requesting is signed in
export const adminRouter = createProtectedRouter().query("getAllApplications", {
  resolve({ ctx }) {
    return ctx.prisma.application.findMany();
  },
});
