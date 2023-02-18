import Events from '~/components/ui/overview/events'
import Introduction from '~/components/ui/overview/introduction'

export default function Overview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div className="lg:col-span-2">
        <Introduction />
      </div>
      <div className="lg:col-span-3">
        <Events />
      </div>
    </div>
  )
}
