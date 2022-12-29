import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

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
        providers={['google', 'github']}
        socialLayout="horizontal"
        localization={{
          variables: {
            sign_in: {
              email_label: '你的电子邮件',
              password_label: '你的密码',
              button_label: '登录',
              link_text: '已经有账号了？现在登录',
            },
            forgotten_password: {
              link_text: '忘记密码？重置密码',
              email_label: '你的电子邮件',
              button_label: '发送重置密码邮件',
            },
            magic_link: {
              button_label: '发送登录邮件',
              link_text: '使用邮箱验证码登录',
              email_input_label: '你的电子邮件',
            },
            sign_up: {
              email_label: '你的电子邮件',
              password_label: '你的密码',
              button_label: '注册',
              link_text: '还没有账号？现在注册',
            },
          },
        }}
      />
    )

  router.push('/')

  return null
}

export default LoginPage
