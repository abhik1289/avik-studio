"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  LoaderCircle,
} from "lucide-react";


import { authClient, useSession } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";


function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M21.8 12.23c0-.72-.06-1.25-.2-1.8H12v3.37h5.64c-.11.84-.72 2.1-2.07 2.95l-.02.11 3 2.27.21.02c1.93-1.74 3.04-4.29 3.04-6.92Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.89 6.78-2.42l-3.23-2.4c-.87.59-2.03 1-3.55 1-2.7 0-4.99-1.74-5.8-4.15l-.1.01-3.12 2.36-.03.09A10.26 10.26 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.2 14.03A6.05 6.05 0 0 1 5.86 12c0-.7.13-1.37.33-2.03l-.01-.14-3.16-2.4-.1.05A9.83 9.83 0 0 0 1.9 12c0 1.59.39 3.09 1.08 4.43l3.22-2.4Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.82c1.92 0 3.22.81 3.96 1.49l2.9-2.76C17.07 2.96 14.76 2 12 2a10.26 10.26 0 0 0-9.05 5.51l3.27 2.49c.82-2.42 3.1-4.18 5.78-4.18Z"
        fill="#EA4335"
      />
    </svg>
  );
}



export function SignInPanel() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>( null);
  const {isPending,data} = useSession();
  const router = useRouter();


  // console.log(data,isPending)


  useEffect(() => {
    if(!isPending && data?.user){
      router.replace("/dashboard");
    }
  },[isPending,data])
    

  if(isPending){
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoaderCircle className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }




  async function handleGoogleSignIn() {
    try {
      setGoogleLoading(true);
      setGoogleError(null);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/sign-in?error=google_auth_failed",
      });
    } catch (error) {
      setGoogleError(
        error instanceof Error
          ? error.message
          : "Google sign-in could not be started. Please try again."
      );
      setGoogleLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">

        <section className=" w-full flex flex-col justify-between px-2 py-4 sm:px-6 xl:px-10 xl:py-10">
          {/* <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
                A
              </span>
              <span>Avik</span>
            </Link>
            <ModeToggle />
          </div> */}

          <div className=" flex w-full w-6/12 flex-1 justify-center py-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
                <BadgeCheck className="size-4 text-primary" />
                Secure workspace access
              </span>
              <div className="space-y-4">
                <h1 className="text-5xl  tracking-tight text-balance sm:text-6xl sekuya-regular montserrat">
                  Log in to your Avik account
                </h1>
                <p className="max-w-xl text-lg leading-8 text-muted-foreground nunito-special-regular ">
                  Continue with Google to access your finance workspace, review
                  approvals, and get back to the tools your team uses every day.
                </p>
              </div>
            </div>

            <div className="mt-12 w-6/12 rounded-[2.25rem] border border-border/70 bg-background/88 p-6 shadow-[0_40px_100px_-52px_rgba(15,23,42,0.45)] backdrop-blur xl:p-8">
              <div className="rounded-[1.75rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,249,252,0.92))] p-5 dark:bg-[linear-gradient(180deg,rgba(36,41,54,0.86),rgba(25,29,39,0.94))]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Preferred sign-in method
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Continue with Google
                    </h2>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/85 shadow-sm dark:bg-white/10">
                    <GoogleMark />
                  </div>
                </div>

                <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                  One secure action, no extra fields. Use the Google account
                  already connected to your workspace for the fastest entry.
                </p>

                <Button
                  onClick={handleGoogleSignIn}
                  type="button"
                  variant="outline"
                  disabled={googleLoading}
                  className="mt-6 h-14 w-full rounded-2xl border-border/70 bg-background text-base font-semibold shadow-none"
                >
                  {googleLoading ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <GoogleMark />
                  )}
                  {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
                </Button>
              </div>

              {googleError ? (
                <div className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {googleError === "google_auth_failed"
                    ? "Google sign-in was cancelled or failed. Please try again."
                    : googleError}
                </div>
              ) : null}

            </div>
          </div>
        </section>

    
    </main>
  );
}
