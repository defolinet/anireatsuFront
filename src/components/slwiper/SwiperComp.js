import React from 'react'
import s from './swiper.module.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

function SwiperComp({slides, slideRender, viewBlocks}) {
    // console.log(slides)
    return (
        <Swiper 
            className={s.swiper}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={viewBlocks}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            {
                slides.map((slide, key) => <SwiperSlide key={key}>
                    {slideRender(slide)}
                </SwiperSlide>)
            }
        </Swiper>
        
    )
}



export default SwiperComp