import Link from '~/components/ui/link'

export default function Work() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-3">Case Studies</div>
      <div className="lg:col-span-1">
        <Link href="/work/case">Work</Link>
      </div>
      <div className="lg:col-span-1">
        <Link href="/work/case">Work</Link>
      </div>
      <div className="lg:col-span-1">
        <Link href="/work/case">Work</Link>
      </div>
      <div className="lg:col-span-1">
        <Link href="/work/case">Work</Link>
      </div>
      <div className="lg:col-span-1">
        <Link href="/work/case">Work</Link>
      </div>
      <div className="lg:col-span-1">
        <Link href="/work/case">Work</Link>
      </div>
    </div>
  )
}
