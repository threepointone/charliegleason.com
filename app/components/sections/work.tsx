import Tile from '~/components/ui/work/tile'
import Title from '~/components/ui/title'

export default function Work() {
  return (
    <>
      <div
        id="case-studies"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        <div className="col-span-full">
          <Title>Case Studies</Title>
        </div>
        <div className="sm:col-span-1">
          <Tile href="/work/example" title="Work" />
        </div>
        <div className="sm:col-span-1">
          <Tile href="/work/example" title="Work" />
        </div>
        <div className="sm:col-span-1">
          <Tile href="/work/example" title="Work" />
        </div>
      </div>
      {/* To remove */}
      <div className="h-[322px] overflow-hidden">
        <img
          src="/assets/placeholders/work.png"
          width="1542"
          className="w-[1542px] absolute left-1/2 -translate-x-1/2 max-w-none"
          alt=""
        />
      </div>
    </>
  )
}
