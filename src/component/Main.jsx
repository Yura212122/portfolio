import React from 'react';
import './Main.css'; // Додай CSS-стилі окремо
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Reviews from './Reviews';
const Main = () => {
  return (
    <div className=" container">

 

      {/* Про нас */}
      <section className="about">
        <h2>Чому обирають нас?</h2>
        <div className="about-features">
          <div>🔨 Власне виробництво</div>
          <div>🌿 Екологічні матеріали</div>
          <div>📐 Індивідуальний підхід</div>
          <div>🛡️ Гарантія якості</div>
        </div>
      </section>

      {/* Категорії */}
      <section className="categories">
        <h2>Категорії меблів</h2>
        <div className="category-list">
          <div className="category-item">Кухні</div>
          <div className="category-item">Шафи-купе</div>
          <div className="category-item">Столи</div>
          <div className="category-item">Ліжка</div>
        </div>
      </section>

      
 
 
<section className="portfolio">
  <h2>Наші роботи</h2>
  <Slider
    dots={true}
    infinite={true}
    speed={1500}
    slidesToShow={2}
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={3000}
  >
    <div>
      <img src="/images/example1.jpg" alt="Робота 1" className="slider-image" />
    </div>
    <div>
      <img src="/images/example2.jpg" alt="Робота 2" className="slider-image" />
    </div>
    <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>    <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
        <div>
      <img src="/images/example3.jpg" alt="Робота 3" className="slider-image" />
    </div>
  </Slider>
</section>


    <Reviews/>

 

    </div>
  );
};

export default Main;
