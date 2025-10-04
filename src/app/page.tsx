import { HeroSection } from "@/components/sections/hero-section";
import { WorkGrid } from "@/components/sections/work-grid";
import { SocialProof } from "@/components/sections/social-proof";
import { PersonalNote } from "@/components/sections/personal-note";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <WorkGrid />
        <SocialProof />
        <PersonalNote />
      </main>
      <SiteFooter />
    </>
  );
}
