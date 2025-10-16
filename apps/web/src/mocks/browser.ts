import { setupWorker } from "msw/browser";
import { projectHandlers, userHandlers } from "./server";

export const worker = setupWorker(...projectHandlers, ...userHandlers);
