import Link from '~/components/ui/link'
import Title from '~/components/ui/title'

export default function Work() {
  return (
    <div id="case-studies" className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-3">
        <Title>Case Studies</Title>
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
      <div className="lg:col-span-1">
        <Link href="/work/case">Work</Link>
      </div>
    </div>
  )
}
