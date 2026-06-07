import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  ServerCog,
  Wrench
} from "lucide-react";

import type { Skill, SkillIconKey } from "@/lib/data";

type SkillBadgeProps = {
  skill: Skill;
};

function getSkillIcon(icon: SkillIconKey) {
  switch (icon) {
    case "code":
      return Code2;
    case "server":
      return ServerCog;
    case "cloud":
      return Cloud;
    case "brain":
      return BrainCircuit;
    case "database":
      return Database;
    case "wrench":
      return Wrench;
    default:
      return Code2;
  }
}

function proficiencyLabel(proficiency: number) {
  if (proficiency >= 5) {
    return "Advanced";
  }

  if (proficiency >= 4) {
    return "Strong";
  }

  if (proficiency >= 3) {
    return "Working";
  }

  return "Foundational";
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const Icon = getSkillIcon(skill.icon);

  return (
    <div className="grid gap-3 border-b border-bg-border/70 py-4 text-sm text-text-primary md:grid-cols-[minmax(0,1fr)_140px_1fr] md:items-center md:gap-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
          <Icon size={16} />
        </span>
        <span className="font-medium">{skill.name}</span>
      </div>

      <div className="text-sm text-text-muted">
        {proficiencyLabel(skill.proficiency)}
      </div>

      <div className="flex items-center gap-1.5" aria-label={`${skill.proficiency} out of 5 proficiency`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={`${skill.name}-${index}`}
            className={`h-1.5 flex-1 ${
              index < skill.proficiency ? "bg-accent-cyan" : "bg-bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
