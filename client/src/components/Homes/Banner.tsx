import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useRef } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import arrayBanner from "../../../public/banner/banner"

const Banner = () => {

    const sliderRef = useRef<Slider>(null);
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    const previous = () => {
        console.log('1');
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <div className="custom-slider">
                <Slider {...settings} ref={sliderRef}>
                    {arrayBanner.map((item, index) => (
                        <div key={index} className="banner">
                            <div className="banner-left">
                                <h2 className="banner-title">{item.title}</h2>
                                <p className="banner-content">{item.content}</p>
                                <Link to={''} className="addtogroup">{item.btn_content}</Link>
                            </div>
                            <div className="banner-right">
                                <Link to={''}>
                                    <img src={item.image} alt="" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="banner-np" style={{ textAlign: "center" }}>
                    <div className="button-pree" onClick={previous}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                    <div className="button-next" onClick={next}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
