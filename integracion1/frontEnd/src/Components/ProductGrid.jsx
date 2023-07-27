import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from './Pagination'

export const ProductGrid = () => {
  const [products, setProducts] = useState([])
  const [loading, setloading] = useState(true)

  const getProducts = async () => {
    await fetch('http://localhost:8080/api/products/?limit=31')
    // await fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(response => setProducts(response.payload))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getProducts()
  }, [products])

  console.log(products)

  return (
    <>
      <section className='container mx-auto mt-3 flex flex-wrap justify-center'>
        { products && products.map((prod) => (
          <article key={prod._id} className='flex flex-col m-3 text-black bg-[#171717dd]  rounded-lg max-h-[500px] md:max-h-[450px] w-96 shadow shadow-yellow-500'>
            <img src={prod.image} alt="" className=' overflow-hidden min-h-[80px]' />
            <div className='py-2 px-5'>
              <h3 className='text-2xl'>{prod.title}</h3>
              <h5> { prod.department}</h5>
              <p className='font-bold'>Precio: <span className='font-normal'>{ prod.price}</span> </p>
              <p> {prod.description} </p>
              <q className='font-thin'> {prod.code}</q>
            </div>
            <Link to='' className='justify-center items-center mx-20 my-5 py-2 px-5 text-base font-medium text-center rounded-lg bg-gray-500 hover:bg-primary hover:bg-ramPrimary-400 focus:ring-4 focus:ring-primary-300 '>Ver más</Link>
          </article>
        ))}
      </section>
      <Pagination/>
    </>
  )
}
