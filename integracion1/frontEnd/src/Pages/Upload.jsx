import React from 'react'

export const Upload = () => (
  <section className='min-h-screen grid place-content-center text-white'>
    <div className=' bg-ramSecondary-200 w-50 px-16 py-10 rounded-lg'>

      <h2 className='text-3xl'>Carga tu Archivo</h2>
      <hr />

      <form action="http://localhost:8080/upload" method="post" encType="multipart/form-data">
        <div className="my-3">
          <input type="file" name="myFile" id="" className="form-control" />
        </div>
        <button type="submit" className='inline-flex justify-center items-center py-2 px-5 text-base font-medium text-center rounded-lg bg-gray-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300'>Subir   ⬆️</button>
      </form>
    </div>

  </section>
)
