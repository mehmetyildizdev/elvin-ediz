import type { LucideIcon } from 'lucide-react';

// Lightweight helper to remove Sanity stega metadata characters without importing Next.js packages into Vite Studio
function cleanStega(value: string): string {
  if (typeof value !== 'string') return value;
  return value
    .replace(/[\u200B-\u200D\uFEFF\uFE00-\uFE0F]/g, '')
    .replace(/[\u{E0000}-\u{E007F}]/gu, '')
    .trim();
}
import {
  // Immigration & Travel
  IdCard,
  Plane,
  Globe2,
  MapPin,
  Flag,
  Compass,
  Navigation,
  Luggage,
  Ticket,
  Anchor,
  Send,
  // Trust, Legal & Documents
  ShieldCheck,
  Shield,
  BadgeCheck,
  Scale,
  FileCheck,
  FileText,
  FileSignature,
  FileSpreadsheet,
  ScrollText,
  Lock,
  Stamp,
  CheckCircle2,
  Check,
  // Study & Education
  GraduationCap,
  School,
  BookOpen,
  Book,
  Library,
  Backpack,
  Lightbulb,
  Bookmark,
  Award,
  Medal,
  // Work & Business
  Briefcase,
  BriefcaseBusiness,
  Building,
  Building2,
  Landmark,
  Coins,
  TrendingUp,
  LineChart,
  Laptop,
  Network,
  Trophy,
  Target,
  Rocket,
  // Family & People
  UserCheck,
  Users,
  UserPlus,
  User,
  HeartHandshake,
  Heart,
  Baby,
  Smile,
  Home,
  Key,
  // Contact & Support
  Phone,
  PhoneCall,
  Mail,
  MessageSquare,
  MessagesSquare,
  HelpCircle,
  Clock,
  Calendar,
  Bell,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';

export interface IconDefinition {
  name: string;
  label: string;
  category: 'Travel' | 'Trust' | 'Education' | 'Business' | 'People' | 'Contact';
  icon: LucideIcon;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Icons' },
  { id: 'Travel', label: '✈️ Travel & Visas' },
  { id: 'Trust', label: '🛡️ Trust & Legal' },
  { id: 'Education', label: '🎓 Study & Education' },
  { id: 'Business', label: '💼 Work & Business' },
  { id: 'People', label: '🤝 Family & People' },
  { id: 'Contact', label: '📞 Contact & Status' },
] as const;

export const ICON_LIBRARY: IconDefinition[] = [
  // Travel & Visas
  { name: 'passport', label: 'Passport / ID Card', category: 'Travel', icon: IdCard },
  { name: 'plane', label: 'Flight / Travel Permit', category: 'Travel', icon: Plane },
  { name: 'globe', label: 'Global / Worldwide', category: 'Travel', icon: Globe2 },
  { name: 'map-pin', label: 'Location / Canada-Wide', category: 'Travel', icon: MapPin },
  { name: 'flag', label: 'Canadian Flag / Citizenship', category: 'Travel', icon: Flag },
  { name: 'compass', label: 'Pathway / Direction', category: 'Travel', icon: Compass },
  { name: 'navigation', label: 'Navigation / Roadmap', category: 'Travel', icon: Navigation },
  { name: 'luggage', label: 'Luggage / Relocation', category: 'Travel', icon: Luggage },
  { name: 'ticket', label: 'Visa Ticket / Entry', category: 'Travel', icon: Ticket },
  { name: 'anchor', label: 'Port of Entry / PR', category: 'Travel', icon: Anchor },
  { name: 'send', label: 'Submission / Lodgement', category: 'Travel', icon: Send },

  // Trust & Legal
  { name: 'shield', label: 'Shield (Regulated / RCIC)', category: 'Trust', icon: ShieldCheck },
  { name: 'shield-simple', label: 'Security & Protection', category: 'Trust', icon: Shield },
  { name: 'badge-check', label: 'CICC Verified Badge', category: 'Trust', icon: BadgeCheck },
  { name: 'scale', label: 'Legal Compliance / Law', category: 'Trust', icon: Scale },
  { name: 'file-check', label: 'Approved Application', category: 'Trust', icon: FileCheck },
  { name: 'file-text', label: 'Official Documents', category: 'Trust', icon: FileText },
  { name: 'file-signature', label: 'Signed Representation', category: 'Trust', icon: FileSignature },
  { name: 'file-sheet', label: 'Case Assessment Sheet', category: 'Trust', icon: FileSpreadsheet },
  { name: 'scroll', label: 'Immigration Certificate', category: 'Trust', icon: ScrollText },
  { name: 'stamp', label: 'IRCC Stamp of Approval', category: 'Trust', icon: Stamp },
  { name: 'lock', label: 'Data Privacy & Security', category: 'Trust', icon: Lock },
  { name: 'check', label: 'Check Circle (Completed)', category: 'Trust', icon: CheckCircle2 },
  { name: 'check-simple', label: 'Simple Checkmark', category: 'Trust', icon: Check },

  // Study & Education
  { name: 'graduation', label: 'Study Permit & Degree', category: 'Education', icon: GraduationCap },
  { name: 'school', label: 'Designated Learning Inst (DLI)', category: 'Education', icon: School },
  { name: 'book-open', label: 'Study Programs / Courses', category: 'Education', icon: BookOpen },
  { name: 'book', label: 'Language / IELTS / CELPIP', category: 'Education', icon: Book },
  { name: 'library', label: 'Academic Institution', category: 'Education', icon: Library },
  { name: 'backpack', label: 'Student Exchange', category: 'Education', icon: Backpack },
  { name: 'lightbulb', label: 'Strategic Pathway Advice', category: 'Education', icon: Lightbulb },
  { name: 'bookmark', label: 'Saved Program', category: 'Education', icon: Bookmark },
  { name: 'award', label: 'Excellence & Distinction', category: 'Education', icon: Award },
  { name: 'medal', label: 'High Success Rate', category: 'Education', icon: Medal },

  // Work & Business
  { name: 'briefcase', label: 'Work Permit / LMIA', category: 'Business', icon: Briefcase },
  { name: 'suitcase', label: 'Business Immigrant / Start-up', category: 'Business', icon: BriefcaseBusiness },
  { name: 'building', label: 'Canadian Employer', category: 'Business', icon: Building },
  { name: 'building-office', label: 'Corporate Sponsorship', category: 'Business', icon: Building2 },
  { name: 'landmark', label: 'Government / Official Body', category: 'Business', icon: Landmark },
  { name: 'coins', label: 'Proof of Funds / Investor', category: 'Business', icon: Coins },
  { name: 'trending-up', label: 'CRS Score Boost', category: 'Business', icon: TrendingUp },
  { name: 'chart', label: 'Express Entry Draw Analytics', category: 'Business', icon: LineChart },
  { name: 'laptop', label: 'Tech & Remote Worker Visa', category: 'Business', icon: Laptop },
  { name: 'network', label: 'Provincial Nominee Network', category: 'Business', icon: Network },
  { name: 'target', label: 'Target NOC Code', category: 'Business', icon: Target },
  { name: 'rocket', label: 'Fast-Track PR Stream', category: 'Business', icon: Rocket },
  { name: 'trophy', label: 'Top Tier Candidate', category: 'Business', icon: Trophy },

  // Family & People
  { name: 'user-check', label: 'RCIC Consultant / Advisor', category: 'People', icon: UserCheck },
  { name: 'users', label: 'Family Sponsorship / Parents', category: 'People', icon: Users },
  { name: 'user-plus', label: 'Dependent Child / Add Member', category: 'People', icon: UserPlus },
  { name: 'user', label: 'Single Applicant Profile', category: 'People', icon: User },
  { name: 'heart-handshake', label: 'Compassionate Assessment', category: 'People', icon: HeartHandshake },
  { name: 'heart', label: 'Spousal Sponsorship', category: 'People', icon: Heart },
  { name: 'baby', label: 'Super Visa / Grandparents', category: 'People', icon: Baby },
  { name: 'smile', label: 'Satisfied Immigrant Story', category: 'People', icon: Smile },
  { name: 'home', label: 'Settlement & Permanent Home', category: 'People', icon: Home },
  { name: 'key', label: 'Keys to Canada / PR Status', category: 'People', icon: Key },

  // Contact & Status
  { name: 'phone', label: 'Telephone Consultation', category: 'Contact', icon: Phone },
  { name: 'phone-call', label: 'Direct Line / RCIC Call', category: 'Contact', icon: PhoneCall },
  { name: 'mail', label: 'Official Correspondence / Email', category: 'Contact', icon: Mail },
  { name: 'message-square', label: 'Live Chat / WhatsApp Support', category: 'Contact', icon: MessageSquare },
  { name: 'messages', label: 'Multi-Channel Discussion', category: 'Contact', icon: MessagesSquare },
  { name: 'help-circle', label: 'Q&A / Eligibility Help', category: 'Contact', icon: HelpCircle },
  { name: 'clock', label: 'Processing Timeline', category: 'Contact', icon: Clock },
  { name: 'calendar', label: 'Appointment Booking', category: 'Contact', icon: Calendar },
  { name: 'bell', label: 'IRCC Portal Updates / Alerts', category: 'Contact', icon: Bell },
  { name: 'sparkles', label: 'Premium Full-Service Representation', category: 'Contact', icon: Sparkles },
  { name: 'star', label: '5-Star Client Review', category: 'Contact', icon: Star },
  { name: 'zap', label: 'Express Expedited Filing', category: 'Contact', icon: Zap },
];

export const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  ICON_LIBRARY.map((item) => [item.name, item.icon])
);

export function getIconComponent(name?: string): LucideIcon | null {
  if (!name) return null;
  const cleanName = typeof name === 'string' ? cleanStega(name) : name;
  if (!cleanName || cleanName === 'none') return null;
  return ICON_MAP[cleanName] || null;
}
