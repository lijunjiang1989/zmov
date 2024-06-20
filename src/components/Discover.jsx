import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper';
import Card from './Card';

SwiperCore.use([Navigation]);

export default function Discover(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(props.url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.url]);

  const swiperParams = {
    slidesPerView: "auto",
    navigation: true,
    loop: movies.length > 1,
    id: "discover-card"
  };

  return (
    <div id="discover-section">
      <p id="discover-title">{props.name}</p>
      <div id="discover-main">
        <Swiper {...swiperParams}>
          {movies.map((item, index) => (
            <SwiperSlide key={index} id="discover-slider">
              <Card item={item} type={props.type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}