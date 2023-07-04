export const BannerText = () => (
  <section className="container  mx-auto md:px-6">
    <div className="px-6 py-12 text-center md:px-12 lg:text-left">
      <div className="contai  ner mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="mt-12 lg:mt-0">
            <h1 className="mb-12 text-5xl font-bold tracking-tight text-white md:text-6xl xl:text-7xl">
              Un mundo de relojes te espera.<br /><span className="text-[hsl(218,81%,75%)]"> </span>
            </h1>
            <p className="text-lg text-[hsl(218,81%,95%)]"> La puntualidad nunca fue tan estilizada. Encuentra relojes clásicos y modernos que reflejen tu buen gusto
            </p>
          </div>
          <div className="bg-red-300 border-2 ">
            <div className=" relative w-full overflow-hidden rounded-lg shadow-lg">
              <img className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-[url('https://smartcookie-design.co.uk/img/posts/25-watch-brands-for-eCommerce-Inspirations-banner2.jpg')] bg-red-700"
                src="https://static01.nyt.com/images/2021/06/19/multimedia/19sp-watchnative-inyt1/19sp-watchnative-inyt1-superJumbo.jpg"
                id="240632615"/>
              <iframe className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full" width="1995" height="1079" src="https://www.youtube.com/embed/YI-7seITKj8" title="Richard Mille RM 66 Flying Tourbillon | Hands-On" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
