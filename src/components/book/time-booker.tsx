import { FC, FunctionComponent, useEffect, useMemo, useRef } from "react";
import { Box, Text } from "zmp-ui";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Hours } from "../../models";
import Time from "../format/time";
import React from "react";

const { Title } = Text;

export const TimeCell: FC<{ time: Hours; index: number }> = ({
  time,
  index,
}) => {
  const swiper = useSwiper();

  const slideInto = () => {
    swiper.slideTo(index);
  };

  return (
    <div
      onClick={slideInto}
      className="flex rounded-full bg-white px-6 py-4 items-center justify-center mx-2 whitespace-nowrap"
    >
      <Time time={time} />
    </div>
  );
};

interface TimeBookerProps {
  onChange: (value: Hours) => void;
  hours: {
    opening: Hours;
    closing: Hours;
  };
}

const TimeBooker: FunctionComponent<TimeBookerProps> = ({
  onChange,
  hours,
}) => {
  const swiperRef = useRef<any>();
  const availableHours = useMemo(() => {
    const res: Hours[] = [];
    const currentHour = new Date().getHours();
    let hour = Math.max(hours.opening[0], currentHour + 1);
    let minute = hours.opening[1];
    while (
      hour < hours.closing[0] ||
      (hour === hours.closing[0] && minute < hours.closing[1])
    ) {
      res.push([hour < 13 ? hour : hour - 12, minute, hour < 13 ? "AM" : "PM"]);
      if (minute < 30) {
        minute = 30;
      } else {
        minute = 0;
        hour++;
      }
    }
    res.push([hours.closing[0], hours.closing[1], hours.closing[2]]);

    return res;
  }, [hours]);

  useEffect(() => {
    onChange(availableHours[0]);
  }, []);

  return (
    <Box m={0}>
      <Title size="small" className="mx-2 mb-3">
        Thời gian khả dụng
      </Title>
      <Swiper
        ref={swiperRef}
        className="date-booker"
        slidesPerView={3}
        centeredSlides
        onSlideChange={(swiper) => onChange(availableHours[swiper.activeIndex])}
      >
        {availableHours.map((hour, i) => (
          <SwiperSlide key={i}>
            <TimeCell time={hour} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TimeBooker;
