"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Github, Chrome } from "lucide-react" // Import social icons
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { loginAction } from "@/actions/auth"
import { toast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { useSoundEffect } from "@/hooks/use-sound-effect"

export default function LoginForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const playClickSound = useSoundEffect("/audio/button-click.mp3")

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state.success) {
      toast({
        title: t("loginSuccessTitle"),
        description: t("loginSuccessDescription"),
        variant: "default",
      })
      login("testuser") // Simulate login in client-side context
      router.push("/") // Redirect to home or dashboard
    } else if (state.message) {
      toast({
        title: t("loginErrorTitle"),
        description: t("loginErrorDescription"),
        variant: "destructive",
      })
    }
  }, [state, t, router, login])

  useEffect(() => {
    if (searchParams.get("register") === "success") {
      toast({
        title: t("registerSuccessTitle"),
        description: t("registerSuccessDescription"),
        variant: "default",
      })
    }
  }, [searchParams, t])

  const handleSocialLogin = (provider: string) => {
    playClickSound()
    toast({
      title: t("socialLoginAttemptTitle"),
      description: t("socialLoginAttemptDescription", { provider }),
      variant: "default",
    })
    // In a real application, you would redirect to an OAuth provider
    // For example: window.location.href = `/api/auth/${provider}`;
    // Or use NextAuth.js signIn function: signIn(provider);
    login(`user_via_${provider}`) // Simulate login
    router.push("/")
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="username" className="text-metallic-gold">
          {t("username")}
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          required
          className="glassmorphism border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-electric-blue focus:border-electric-blue mt-1"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-metallic-gold">
          {t("password")}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="glassmorphism border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-electric-blue focus:border-electric-blue mt-1"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-electric-blue text-deep-space hover:bg-metallic-gold transition-all duration-300 px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-electric-blue/50 flex items-center justify-center"
        disabled={isPending}
        onClick={playClickSound}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t("loginButton")}
      </Button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-glass-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-deep-space px-2 text-muted-foreground">{t("orContinueWith")}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <Button
          variant="outline"
          className="w-full border-nebula-purple text-nebula-purple hover:bg-nebula-purple hover:text-white transition-colors duration-300 bg-transparent flex items-center justify-center"
          onClick={() => handleSocialLogin("google")}
        >
          <Chrome className="h-5 w-5 mr-2" /> {t("loginWithGoogle")}
        </Button>
        <Button
          variant="outline"
          className="w-full border-nebula-purple text-nebula-purple hover:bg-nebula-purple hover:text-white transition-colors duration-300 bg-transparent flex items-center justify-center"
          onClick={() => handleSocialLogin("github")}
        >
          <Github className="h-5 w-5 mr-2" /> {t("loginWithGithub")}
        </Button>
      </div>

      <p className="text-center text-muted-foreground text-sm mt-4">
        {t("noAccount")}{" "}
        <Link href="/register" className="text-electric-blue hover:underline" onClick={playClickSound}>
          {t("register")}
        </Link>
      </p>
    </form>
  )
}
