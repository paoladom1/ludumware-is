// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedExampleRouter } from "./protected-example-router";
import { admissionFormRouter } from "./admissionForm";
import { departmentsRouter } from "./departments";
import { municipalityRouter } from "./municipalities";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge("departments.", departmentsRouter)
  .merge("municipalities", municipalityRouter)
  .merge("admissionForm.", admissionFormRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
