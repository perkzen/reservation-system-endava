export const sliderSettings = {
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 11,
  slidesToScroll: 11,
  responsive: [
    {
      breakpoint: 1610,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 10,
      },
    },
    {
      breakpoint: 1520,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 1285,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};
