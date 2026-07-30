import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface px-6 text-center">
      <div>
        <p className="text-sm font-semibold text-primary">۴۰۴</p>
        <h1 className="mt-2 text-3xl font-bold text-primary-dark md:text-4xl">
          صفحه مورد نظر پیدا نشد
        </h1>
        <p className="mt-3 text-primary-dark/60">
          ممکن است آدرس اشتباه باشد یا صفحه جابه‌جا شده باشد.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-brand-gradient px-8 py-3 font-medium text-white shadow-glow"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
