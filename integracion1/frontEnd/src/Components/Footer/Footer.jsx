import {Link} from "react-router-dom";

export const Footer = () =>
	<footer className="bg-[#a8a8a86a] px-10 mt-10 pt-3 pb-1 relative bottom-0 mx-auto w-[100%] ">
		{/* <footer className="bg-[#a8a8a86a] px-10 mt-auto pt-3 pb-1 mx-auto w-[100%] "> */}
		<section className="flex flex-col sm:flex-row gap-3 sm:gap-10">

			<div className="basis-1/2">
				<h2 className="md:text-4xl text-2xl">WatchsWorld</h2>
				<p className="text-[12px]">Lo que nos mueve es tener el tiempo correcto a toda hora</p>
				<p className="font-bold">Contacto: </p>
				<p className="text-[12px]">hello@watchsworld.com</p>
				<form action="">
					<p className="font-bold">Newsletter</p>
					<input type="text" placeholder=" email@..." className="rounded-md font-normal text-sm" />
					<button type="submit" className="ms-1 align-sub">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-right-filled" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" strokeWidth="0" fill="currentColor"></path>
						</svg>
					</button>
				</form>
			</div>
			<div className="basis-1/4">
				<p className="">asdfasdasdfa</p>

			</div>
			<div className="basis-1/4 flex flex-col gap-2">
				<Link to='Home' className="font-thin text-xs"> Trabaja con Nosotros</Link>
				<Link to='Home' className="font-thin text-xs"> Trabaja con Nosotros</Link>
				<Link to='Home' className="font-thin text-xs"> Trabaja con Nosotros</Link>

			</div>
		</section>
		<hr className="mt-2 mb-1" />
		<div className="flex flex-row justify-between">

			<p className="text-[10px]">RulosAfro Web</p>
			<p className="text-[10px]">Javier Ramírez</p>
			<p className="text-[10px]">Contact Me</p>

		</div>
	</footer>
