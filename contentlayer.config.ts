import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format, parseISO } from "date-fns";

export const CaseStudy = defineDocumentType(() => ({
  name: "CaseStudy",
  filePathPattern: `case-studies/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    role: { type: "list", of: { type: "string" }, required: true },
    timeline: { type: "string", required: true },
    stack: { type: "list", of: { type: "string" }, required: true },
    summary: { type: "string", required: true },
    outcomes: { type: "list", of: { type: "string" }, required: true },
    context: { type: "string", required: true },
    decisions: { type: "list", of: { type: "string" }, required: true },
    artifacts: {
      type: "list",
      of: { type: "json" },
    },
    links: { type: "json" },
    whatIdDoNext: { type: "list", of: { type: "string" }, required: true },
    featured: { type: "boolean", default: false },
    order: { type: "number", default: 0 },
    category: {
      type: "enum",
      options: ["AI", "Systems", "Mobile", "Data", "MusicTech"],
      required: true,
    },
    image: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("case-studies/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/work/${doc._raw.flattenedPath.replace("case-studies/", "")}`,
    },
  },
}));

export const Writing = defineDocumentType(() => ({
  name: "Writing",
  filePathPattern: `writing/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    draft: { type: "boolean", default: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("writing/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/writing/${doc._raw.flattenedPath.replace("writing/", "")}`,
    },
    formattedDate: {
      type: "string",
      resolve: (doc) => format(parseISO(doc.date), "LLL d, yyyy"),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [CaseStudy, Writing],
  disableImportAliasWarning: true,
});
