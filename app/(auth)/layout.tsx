export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-border)_56%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-border)_56%,transparent)_1px,transparent_1px)] bg-size-[48px_48px] opacity-70 dark:opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(86,153,255,0.18),transparent_18%),radial-gradient(circle_at_52%_14%,rgba(255,183,77,0.18),transparent_16%),radial-gradient(circle_at_80%_78%,rgba(60,145,120,0.14),transparent_18%)]" />
      <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border/60" />
      <div className="relative">{children}</div>
    </div>
  );
}
