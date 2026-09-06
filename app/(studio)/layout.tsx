import { SiteFrame } from "@/components/site-frame";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteFrame>{children}</SiteFrame>;
}
