import { Hero } from '../Components/Hero'
import { Banner } from '../Components/Banner'
import { Section1 } from '../Components/Section1'
import { Feature } from '../Components/Feature'
import { BannerText } from '../Components/BannerText'
import { InfoImg } from '../Components/InfoImg'
import { Pagination } from '../Components/Pagination'

export const Home = () => (
  <div className="min-h-screen max-w-screen-3xl mx-auto">
    <Hero url1='https://smartcookie-design.co.uk/img/posts/25-watch-brands-for-eCommerce-Inspirations-banner2.jpg'/>
    <BannerText />
    <Feature/>
    <InfoImg/>
    <Banner />
    {/* <Section1 /> */}
  </div>
)
