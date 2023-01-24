export default function HorizontalRule({ className }: { className?: string }) {
  return (
    <hr
      className={`border-t-2	border-neutral-200 dark:border-neutral-800 ${className}`}
    />
  )
}
