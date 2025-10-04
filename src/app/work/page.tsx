import { allCaseStudies } from "contentlayer/generated";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WorkGrid } from "@/components/sections/work-grid";

export const metadata = {
  title: "Work",
  description:
    "Explore my portfolio of high-impact projects across AI, systems architecture, and full-stack development.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24">
        <div className="container py-12">
          <WorkGrid />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
