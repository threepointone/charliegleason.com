/*
 * If you're looking to learn more about how themeing is set up,
 * you should absolute read Matt Stobb's Complete Guide to Dark Mode
 * with Remix (https://mattstobbs.com/remix-dark-mode)
 */

import { Theme, useTheme } from '~/utils/theme-provider'
import Icon, { DarkMode } from '~/components/ui/icon'

export default function Toggle() {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    )
  }

  return (
    <button
      className="appearance-none transition-colors group absolute top-8 right-5 p-1 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 focus-visible:bg-yellow-500/20 rounded-full outline-yellow-500 outline-offset-2 focus-visible:outline focus-visible:outline-2"
      aria-label={`Toggle mode`}
      onClick={toggleTheme}
    >
      <span className="absolute duration-300 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-100 opacity-0 top-1/2 -translate-y-1/2 font-display text-xs whitespace-nowrap right-10 pointer-events-none">
        Toggle Mode
      </span>

      <Icon className="w-6 h-6 fill-current">
        <DarkMode enabled={theme === Theme.DARK} />
      </Icon>
    </button>
  )
}
