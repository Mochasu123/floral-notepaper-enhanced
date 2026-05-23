import { getVersion } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/core";

const RELEASES_URL = "https://github.com/Achilng/floral-notepaper/releases";

interface LatestReleaseResponse {
  latestVersion?: string | null;
  releaseUrl?: string;
  releaseName?: string;
  releaseNotes?: string;
  publishedAt?: string | null;
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
  const release = await invoke<LatestReleaseResponse>("about_check_latest_release");
  const latestVersion = release.latestVersion ?? null;

  return {
    currentVersion,
    latestVersion,
    updateAvailable: latestVersion ? isVersionNewer(latestVersion, currentVersion) : false,
    releaseUrl: release.releaseUrl || RELEASES_URL,
    releaseName: release.releaseName || latestVersion || "",
    releaseNotes: release.releaseNotes || "",
    publishedAt: release.publishedAt || null,
  };
}
