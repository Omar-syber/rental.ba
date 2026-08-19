import { notFound } from "next/navigation";
import { getTeamBySlug, team } from "@/lib/data";
import AgentDetail from "@/components/AgentDetail";
import { localize } from "@/lib/i18n/localize";

export function generateStaticParams() {
  return team.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const agent = getTeamBySlug(slug);
  if (!agent) return {};
  return {
    title: `${agent.name} — Rental.ba`,
    description: localize(agent.bio, "en"),
  };
}

export default async function AgentPage({ params }) {
  const { slug } = await params;
  const agent = getTeamBySlug(slug);
  if (!agent) notFound();
  return <AgentDetail agent={agent} />;
}
