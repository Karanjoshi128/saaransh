import Link from "next/link";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
      <div className="rounded-xl border border-border shadow p-10 flex flex-col items-center bg-card">
        <span className="text-4xl mb-4">❌</span>
        <h1 className="text-2xl font-semibold mb-2">Payment Cancelled</h1>
        <p className="text-muted-foreground text-base mb-6 text-center">
          Your payment was not completed. No credits have been added.
        </p>
        <Link
          href="/pricing"
          className="mt-2 px-5 py-2 bg-primary text-white rounded-md font-medium transition hover:bg-primary/90"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
