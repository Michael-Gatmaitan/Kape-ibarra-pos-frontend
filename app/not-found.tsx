import Link from 'next/link'
import { Button } from '../components/ui/button'

const NotFound404 = () => {

  // const emoticons = [
  //   '^_^', '(°o°)', '(^_^)/', '(^O^)／', '(^o^)／', '(^^)/', '(≧∇≦)/', '(/◕ヮ◕)/', '(^o^)丿', '∩(·ω·)∩', '(·ω·)', '^ω^'
  // ]

  // const randomEmoticon = emoticons[Math.floor(Math.random() * emoticons.length - 1)];

  return (
    <div className="flex items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">404</h1>
          <p className="text-gray-500">Looks like there&#39;s no coffee here</p>
        </div>

        <Button variant="outline" asChild>
          <Link href="#" prefetch={false}>
            Return to website
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound404
