import { Bell, Wrench, FileText } from "lucide-react";

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: "bell" | "wrench" | "file";
  bgColor: string;
  iconBgColor: string;
  cardTitle: string;
  cardSubtitle: string;
  cardBadge: string;
  cardBadgeColor: string;
};

const FEATURES: Feature[] = [
  {
    id: 1,
    title: "Rent, on time.",
    description:
      "Send payment reminders to tenants automatically. They get notified, you get paid.",
    icon: "bell",
    bgColor: "bg-card-tan",
    iconBgColor: "bg-brown-mid",
    cardTitle: "Oct rent due in 3 days",
    cardSubtitle: "Maria Popescu",
    cardBadge: "Sent",
    cardBadgeColor: "bg-green-dark",
  },
  {
    id: 2,
    title: "Issues, handled.",
    description:
      "Tenants log problems, you assign them. Track every fix from open to closed.",
    icon: "wrench",
    bgColor: "bg-card-sage",
    iconBgColor: "bg-green-dark",
    cardTitle: "F2 Boiler Error",
    cardSubtitle: "ap. 31",
    cardBadge: "In Progress",
    cardBadgeColor: "bg-brown-mid",
  },
  {
    id: 3,
    title: "Leases, signed.",
    description:
      "Store lease agreements, send them for signature, and access them anywhere.",
    icon: "file",
    bgColor: "bg-card-peach",
    iconBgColor: "bg-brown-mid",
    cardTitle: "Oxygen Residence",
    cardSubtitle: "ap. 12 · Dec 2026",
    cardBadge: "Signed",
    cardBadgeColor: "bg-green-dark",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-cream-bg py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-brown-dark mb-4">
            Everything ownership needs.
          </h2>
          <p className="text-base text-slate">
            No spreadsheets. No group chats. No lost paperwork.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className={`${f.bgColor} rounded-3xl p-7 shadow-lg flex flex-col`}
            >
              <div
                className={`${f.iconBgColor} w-12 h-12 rounded-full flex items-center justify-center mb-6 shrink-0`}
              >
                {f.icon === "bell" && <Bell className="w-5 h-5 text-white" />}
                {f.icon === "wrench" && (
                  <Wrench className="w-5 h-5 text-white" />
                )}
                {f.icon === "file" && (
                  <FileText className="w-5 h-5 text-white" />
                )}
              </div>
              <h3 className="text-xl font-extrabold text-brown-dark mb-4">
                {f.title}
              </h3>
              <p className="text-sm text-slate mb-8 leading-relaxed flex-1">
                {f.description}
              </p>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-brown-dark mb-1">
                      {f.cardTitle}
                    </p>
                    <p className="text-xs text-slate">{f.cardSubtitle}</p>
                  </div>
                  <span
                    className={`${f.cardBadgeColor} text-white px-2 py-1 rounded-full text-xs font-semibold shrink-0`}
                  >
                    {f.cardBadge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
