import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { zhAuthJson } from './zh.auth.json'

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  if (!user)
    return (
      <Auth
        appearance={{ theme: ThemeSupa }}
        magicLink={true}
        redirectTo="/"
        supabaseClient={supabaseClient}
        providers={['github']}
        socialLayout="horizontal"
        localization={zhAuthJson}
      />
    )

  router.push('/')

  return null
}

export default LoginPage
