import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata = {
  title: "Writing",
  description:
    "Technical articles and insights on software engineering, AI, and cloud architecture.",
};

export default function WritingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Writing</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Technical articles and insights on software engineering, AI, and
              cloud architecture.
            </p>

            <div className="glass rounded-xl p-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">
                I'm working on sharing insights from my experience building AI
                systems, architecting scalable platforms, and leading technical
                teams. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}


