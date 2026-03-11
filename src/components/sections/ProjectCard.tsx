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
    <Card
      className={`group glass hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 ${
        featured ? "md:flex md:flex-row" : ""
      }`}
    >
      <div className={featured ? "md:w-1/2" : "w-full"}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
            {tags.map((tag, i) => (
              <Badge
                key={tag}
                variant="secondary"
                className="transition-all hover:scale-105 hover:bg-primary/20"
                style={{ animationDelay: `${i * 50}ms` }}
              >
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
