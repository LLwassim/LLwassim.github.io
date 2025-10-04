import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps extends Project {
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  date,
  image,
  tags,
  links,
  featured,
}: ProjectCardProps) {
  return (
    <Card className={featured ? "md:flex md:flex-row" : ""}>
      <div className={featured ? "md:w-1/2" : "w-full"}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </div>

      <div className={featured ? "md:w-1/2" : "w-full"}>
        <CardHeader>
          <div className="text-sm text-muted-foreground mb-2">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          {links.demo && (
            <Button asChild>
              <Link href={links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Website
              </Link>
            </Button>
          )}
          {links.github && (
            <Button asChild variant="outline">
              <Link
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Repository
              </Link>
            </Button>
          )}
          {links.frontend && (
            <Button asChild variant="outline">
              <Link
                href={links.frontend}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Frontend
              </Link>
            </Button>
          )}
          {links.backend && (
            <Button asChild variant="outline">
              <Link
                href={links.backend}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Backend
              </Link>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
