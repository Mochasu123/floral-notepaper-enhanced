import { getVersion } from "@tauri-apps/api/app";

const LATEST_RELEASE_URL = "https://api.github.com/repos/Achilng/floral-notepaper/releases/latest";
const RELEASES_URL = "https://github.com/Achilng/floral-notepaper/releases";

interface GitHubRelease {
  tag_name?: string;
  html_url?: string;
  name?: string;
  body?: string;
  published_at?: string;
}

export interface UpdateCheckResult {
  currentVersion: string;
  latestVersion: string | null;
  updateAvailable: boolean;
  releaseUrl: string;
  releaseName: string;
  releaseNotes: string;
  publishedAt: string | null;
}

function normalizeVersion(value: string): number[] {
  return value
    .replace(/^v/i, "")
    .split(/[.-]/)
    .map((part) => Number.parseInt(part, 10))
    .map((part) => (Number.isFinite(part) ? part : 0));
}

export function isVersionNewer(latest: string, current: string): boolean {
  const left = normalizeVersion(latest);
  const right = normalizeVersion(current);
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    const latestPart = left[index] ?? 0;
    const currentPart = right[index] ?? 0;
    if (latestPart > currentPart) return true;
    if (latestPart < currentPart) return false;
  }

  return false;
}

export async function getCurrentAppVersion(): Promise<string> {
  try {
    return await getVersion();
  } catch {
    return import.meta.env.VITE_APP_VERSION || "0.0.0";
  }
}

export async function checkLatestRelease(): Promise<UpdateCheckResult> {
  const currentVersion = await getCurrentAppVersion();
  const response = await fetch(LATEST_RELEASE_URL, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`GitHub release check failed: ${response.status}`);
  }

  const release = (await response.json()) as GitHubRelease;
  const latestVersion = release.tag_name ?? null;

  return {
    currentVersion,
    latestVersion,
    updateAvailable: latestVersion ? isVersionNewer(latestVersion, currentVersion) : false,
    releaseUrl: release.html_url || RELEASES_URL,
    releaseName: release.name || latestVersion || "",
    releaseNotes: release.body || "",
    publishedAt: release.published_at || null,
  };
}
