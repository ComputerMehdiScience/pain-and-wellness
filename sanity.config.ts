import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
