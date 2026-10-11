import {
  Target,
  Users,
  MessageCircle,
  ShieldCheck,
  ArrowRightCircle,
  Route,
  FlaskConical,
  ClipboardCheck,
  Database,
  Link,
  ChartLine,
  Eye,
  Compass,
} from "lucide-react";
export const progressIcons = {
  target: Target,
  users: Users,
  message: MessageCircle,
  proof: ShieldCheck,
  action: ArrowRightCircle,
  route: Route,
  test: FlaskConical,
  learning: ClipboardCheck,
  source: Database,
  connection: Link,
  reporting: ChartLine,
  understanding: Eye,
  choice: Compass,
};
export type ProgressIconName = keyof typeof progressIcons;
export const progressIconNames: Record<number, ProgressIconName[]> = {
  1: ["understanding", "target", "message", "action"],
  2: ["users", "target", "users", "route"],
  3: ["understanding", "message", "choice", "proof"],
  4: ["action", "connection", "route", "proof"],
  5: ["proof", "test", "route", "learning"],
  6: ["target", "source", "connection", "reporting", "learning"],
};
export function progressIconName(
  section: number,
  index: number,
): ProgressIconName {
  return progressIconNames[section]?.[index] ?? "target";
}
