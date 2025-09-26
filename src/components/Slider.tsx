import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/İmageSlider.css";
import Slider1 from "../images/slider1.png";
import Slider2 from "../images/slider2.png";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-slick-arrow custom-next`}
      style={{ ...style }}
      onClick={onClick}
      role="button"
      aria-label="next slide"
    >
      <KeyboardDoubleArrowRightIcon />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-slick-arrow custom-prev`}
      style={{ ...style }}
      onClick={onClick}
      role="button"
      aria-label="previous slide"
    >
      <KeyboardDoubleArrowLeftIcon />
    </div>
  );
};

const images = [Slider1, Slider2];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="slider-page" style={{ margin: 0, padding: 0 }}>
      <div
        className="slider-wrapper"
        style={{ margin: 0, padding: 0, maxWidth: "100%" }}
      >
        <Slider {...settings}>
          {images.map((img, i) => (
            <div key={i} style={{ margin: 0, padding: 0 }}>
              <img
                src={img}
                alt={`slide-${i}`}
                style={{
                  width: "100%",
                  height: "700px",
                  objectFit: "cover",
                  display: "block",
                  margin: 0,
                  padding: 0,
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
