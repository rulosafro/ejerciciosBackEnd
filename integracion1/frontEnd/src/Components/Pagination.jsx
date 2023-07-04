import { Link } from "react-router-dom"

export const Pagination = () => {
  return (
      <ul className="list-style-none flex flex-row justify-center my-2">
      <li>
      <Link
        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
        href="#">Previous</Link>
      </li>
      <li>
        <Link
        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
        href="#">1</Link>
      </li>
      <li classNameName="hover:bg-neutral-500">
        <a
        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-500 "
        href="#">2</a>
      </li>
      <li>
        <Link
        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
        href="#">3</Link>
      </li>
      <li>
        <Link
        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
        href="#">Next</Link>
      </li>
    </ul>
  )
}
