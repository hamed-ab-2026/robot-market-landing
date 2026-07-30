import { FiGrid, FiDollarSign, FiMapPin } from "react-icons/fi";
import Container from "@components/common/Container";

export const metadata = {
  title: "داشبورد",
  robots: { index: false, follow: false },
};

const STATS = [
  { icon: FiGrid, label: "تعداد دستگاه‌ها", value: "—" },
  { icon: FiDollarSign, label: "درآمد کل", value: "—" },
  { icon: FiMapPin, label: "مکان‌های فعال", value: "—" },
];

/**
 * UI-only placeholder for the future dashboard, per the brief:
 * "Dashboard button should only be placeholder." Wire this up to
 * `dashboardService.getSummary()` (see src/services/dashboard.service.js)
 * once the real dashboard API and auth flow exist.
 */
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-surface py-24">
      <Container>
        <h1 className="text-3xl font-bold text-primary-dark">داشبورد</h1>
        <p className="mt-2 text-primary-dark/60">
          این صفحه یک نمای اولیه است و به‌زودی به داده‌های واقعی متصل می‌شود.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-surface rounded-3xl p-6 shadow-glass"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white">
                <stat.icon size={18} aria-hidden="true" />
              </span>
              <p className="mt-4 text-2xl font-bold text-primary-dark">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-primary-dark/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
