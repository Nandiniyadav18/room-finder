import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "../supabase"

export default function AuthComponent() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={[]}              // 🔥 THIS LINE FIXES IT
      onlyThirdPartyProviders={false}
      magicLink={false}
    />
  )
}









