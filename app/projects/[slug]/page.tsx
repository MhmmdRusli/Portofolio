import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageShell from "@/app/components/PageShell";
import ProjectDetail from "@/app/components/ProjectDetail";
import { getProjectBySlug, getProjectSlugs } from "@/app/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <ProjectDetail project={project} />
    </PageShell>
  );
}
