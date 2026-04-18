import { SignInPanel } from "@/components/auth/sign-in-panel";

type SignInPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;

  return <SignInPanel initialError={resolvedSearchParams?.error} />;
}
