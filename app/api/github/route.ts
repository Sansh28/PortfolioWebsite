import { NextResponse } from "next/server";

import { portfolioData } from "@/lib/data";

type GitHubRepositoryApiResponse = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

const cacheHeaders = {
  "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400"
};

export async function GET() {
  const githubUsername =
    process.env.GITHUB_USERNAME || portfolioData.github.username;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubUsername || !githubToken) {
    return NextResponse.json(
      {
        error:
          "GitHub integration is not configured. Set GITHUB_USERNAME and GITHUB_TOKEN."
      },
      {
        status: 503,
        headers: cacheHeaders
      }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=stars&per_page=100&type=public`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${githubToken}`
        },
        next: {
          revalidate: 3600
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch repositories from GitHub." },
        {
          status: 503,
          headers: cacheHeaders
        }
      );
    }

    const repositories =
      (await response.json()) as GitHubRepositoryApiResponse[];
    const filteredRepositories = repositories
      .filter((repository) => !repository.fork && !repository.archived)
      .map((repository) => ({
        name: repository.name,
        description: repository.description,
        html_url: repository.html_url,
        stargazers_count: repository.stargazers_count,
        forks_count: repository.forks_count,
        language: repository.language,
        topics: Array.isArray(repository.topics) ? repository.topics : [],
        updated_at: repository.updated_at
      }));

    return NextResponse.json(filteredRepositories, {
      status: 200,
      headers: cacheHeaders
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub service is currently unavailable." },
      {
        status: 503,
        headers: cacheHeaders
      }
    );
  }
}
