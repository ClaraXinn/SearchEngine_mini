import { auth } from "../auth";

export default async function SessionWrapper({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log("WRAPPER SESSION:", session?.id);
  return children;
}
