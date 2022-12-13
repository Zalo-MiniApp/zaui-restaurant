import React, { FC } from "react";
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const { Title } = Text;

interface DateBookerProps {
  onChange: (date: Date) => void;
}

const getDayName = (date: Date) => ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'][date.getDay()];

export const DateCell: FC<{ date: Date }> = ({ date }) => {
  const swiper = useSwiper();

  const slideToDay = (day: number) => {
    swiper.slideTo(day - 1);
  }

  return <div onClick={() => slideToDay(date.getDate())} className="bg-white rounded-full h-20 pb-2 box-content flex flex-col items-center justify-center w-12 m-auto">
    <span className="whitespace-nowrap mt-2 mb-1 text-xs">{getDayName(date)}</span>
    <Text className="font-semibold" size="large">{date.getDate()}</Text>
  </div>
}


const DateBooker: FunctionComponent<DateBookerProps> = ({ onChange }) => {
  const swiperRef = useRef<any>();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const datesOfMonth = useMemo(() => {
    const dates: Date[] = [];
    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      dates.push(date);
      date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    }
    return dates;
  }, [month, year]);

  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  const handleSlideChange = useCallback((swiper) => {
    onChange(datesOfMonth[swiper.activeIndex])
  }, [datesOfMonth])

  return <>
    <Box flex alignItems="center" className="gap-4 mb-4">
      <Title size="small">Tháng {month + 1} {year}</Title>
      <Button onClick={prev} variant="secondary" icon={<Icon icon="zi-chevron-left" className="font-bold" />} size="small"></Button>
      <Button onClick={next} variant="secondary" icon={<Icon icon="zi-chevron-right" className="font-bold" />} size="small"></Button>
    </Box>
    <Swiper ref={swiperRef} className="date-booker fade-corner" slidesPerView={5} centeredSlides onSlideChange={handleSlideChange}>
      {datesOfMonth.map((date, i) => <SwiperSlide key={i}>
        <DateCell key={i} date={date} />
      </SwiperSlide>)}
    </Swiper>
  </>;
}

export default DateBooker;