// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { admissionFormRouter } from "./admissionForm";
import { departmentsRouter } from "./departments";
import { municipalityRouter } from "./municipalities";
import { adminRouter } from "./admin";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("admin.", adminRouter)
  .merge("departments.", departmentsRouter)
  .merge("municipalities.", municipalityRouter)
  .merge("admissionForm.", admissionFormRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
