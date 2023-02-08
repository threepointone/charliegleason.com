export default function Tile({ title, href }: { title: string; href: string }) {
  return (
    <a href={href} className="block">
      <img src="https://placehold.co/600x400" className="rounded" alt="" />
      <h2 className="">{title}</h2>
    </a>
  )
}
