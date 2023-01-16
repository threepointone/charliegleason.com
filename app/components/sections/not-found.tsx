import Link from '~/components/ui/link'

export default function NotFound() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h1 className="text-xl">
        Hmmm, can't seem to find anything at that URL.
      </h1>

      <p>
        Oh well. On the plus side, at least you can take a look at some
        projects, or head <Link href="/">back to the index</Link>.
      </p>
    </div>
  )
}
