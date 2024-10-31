export function getAvatarUrl(username: string): string {
  return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${username}`;
}
