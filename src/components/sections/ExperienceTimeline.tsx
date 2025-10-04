import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/data/experiences";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <div className="relative space-y-8">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

      {experiences.map((exp, index) => (
        <div key={exp.id} className="relative pl-0 md:pl-20">
          {/* Timeline dot */}
          <div className="absolute left-6 top-8 size-4 rounded-full border-4 border-background bg-primary hidden md:block" />

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  {exp.logo && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-background border">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-2">
                    {exp.startDate} - {exp.endDate}
                  </div>

                  <CardTitle className="text-2xl mb-1">
                    {exp.website ? (
                      <Link
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-2"
                      >
                        {exp.company}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : (
                      exp.company
                    )}
                  </CardTitle>

                  <CardDescription className="text-lg font-medium">
                    {exp.position}
                  </CardDescription>

                  {exp.location && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
