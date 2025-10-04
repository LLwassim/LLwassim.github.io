import { notFound } from "next/navigation";
import { allCaseStudies } from "contentlayer/generated";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ArrowLeft, ExternalLink, Github, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import mdxComponents from "@/components/mdx-components";

export async function generateStaticParams() {
  return allCaseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = allCaseStudies.find((study) => study.slug === params.slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      images: [caseStudy.image],
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = allCaseStudies.find((study) => study.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  const MDXContent = useMDXComponent(caseStudy.body.code);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24">
        {/* Back button */}
        <div className="container py-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
        </div>

        {/* Hero Section */}
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Category & Featured badge */}
            <div className="flex items-center gap-2 mb-4 scroll-fade-in">
              <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                {caseStudy.category}
              </span>
              {caseStudy.featured && (
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 scroll-rise">
              {caseStudy.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 scroll-fade-in">
              <div>
                <span className="font-semibold">Role:</span>{" "}
                {caseStudy.role.join(", ")}
              </div>
              <div>
                <span className="font-semibold">Timeline:</span>{" "}
                {caseStudy.timeline}
              </div>
            </div>

            {/* Summary */}
            <p className="text-xl text-muted-foreground mb-8 scroll-fade-in">
              {caseStudy.summary}
            </p>

            {/* Hero Image */}
            {caseStudy.image && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-8 scroll-scale">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {caseStudy.outcomes.slice(0, 3).map((outcome, index) => (
                <div
                  key={index}
                  className="glass rounded-lg p-6 scroll-rise"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {outcome.split(" ")[0]}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {outcome.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mb-8 scroll-fade-in">
              <h3 className="font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {caseStudy.links &&
              (caseStudy.links.demo || caseStudy.links.repo) && (
                <div className="flex flex-wrap gap-4 mb-12 scroll-fade-in">
                  {caseStudy.links.demo && (
                    <a
                      href={caseStudy.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-lg transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Demo
                    </a>
                  )}
                  {caseStudy.links.repo && (
                    <a
                      href={caseStudy.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-lg transition-all"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <MDXContent
              components={{
                ...mdxComponents,
                h2: ({ children, ...props }: any) => (
                  <h2 className="flex items-center gap-3 group" {...props}>
                    <span className="w-1 h-8 bg-gradient-to-b from-[var(--gradient-1)] to-[var(--gradient-2)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {children}
                  </h2>
                ),
              }}
            />
          </article>
        </div>

        {/* What I'd Do Next */}
        <div className="container py-12">
          <div className="max-w-4xl mx-auto glass rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">What I'd Do Next</h2>
            <ul className="space-y-2">
              {caseStudy.whatIdDoNext.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="container py-12">
          <div className="max-w-4xl mx-auto flex justify-between">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Projects
            </Link>
            <Link
              href="/#work"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
