import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Banner = () => (
  <motion.hero
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
    className="grid lg:grid-cols-12 max-w-screen-3xl px-8 py-8 lg:py-12 mx-auto md:gap-12  ">

    <section className="mr-auto place-self-center lg:col-span-6">
      <h1 className="max-w-4xl mb-2 text-4xl font-extrabold tracking-tight md:text-5xl ">Descubre la precisión y la calidad en cada uno de nuestros relojes</h1>
      <p className="max-w-4xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">El regalo perfecto para ti o tus seres queridos: nuestros relojes de alta gama.</p>
      <p className="inline-flex items-center justify-center px-5 pa-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 "> Encuentra tu favorito
        <svg className=" ms-2" width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l14 0"></path>
          <path d="M13 18l6 -6"></path>
          <path d="M13 6l6 6"></path>
        </svg></p>

      <Link to="/products" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-300 border rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">Catálogo</Link>
    </section>

    <section className="hidden md:mt-0 md:col-span-6 lg:flex ">
      <img className='object-cover imgDemo' src="https://cdn.shopify.com/s/files/1/0133/9195/3977/articles/Gemma_Blog_Featured_Image-10.png?v=1659622430" alt="" />
    </section>

  </motion.hero>
)
