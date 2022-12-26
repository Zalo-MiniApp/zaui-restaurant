import React, { Suspense } from "react";
import { Page, Box, Avatar, Text } from "zmp-ui";
import { getConfig } from "../components/config-provider";
import Inquiry, { QuickFilter } from "../components/inquiry";
import RestaurantItem from "../components/restaurant";
import {
  useRecoilValue,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
} from "recoil";
import {
  nearestRestaurantsState,
  popularRestaurantsState,
  userState,
} from "../state";

const { Title, Header } = Text;

function Popular() {
  const populars = useRecoilValue(popularRestaurantsState);

  return (
    <>
      <Box mx={4} mt={6}>
        <Header className="mt-6 mb-3 font-semibold">Địa điểm phổ biến</Header>
      </Box>
      {populars.length ? (
        <div className="overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar">
          <Box m={0} pr={4} flex className="w-max">
            {populars.map((restaurant) => (
              <Box
                key={restaurant.id}
                ml={4}
                mr={0}
                className="snap-start"
                style={{ width: "calc(100vw - 120px)" }}
              >
                <RestaurantItem layout="cover" restaurant={restaurant} />
              </Box>
            ))}
          </Box>
        </div>
      ) : (
        <Box mx={4}>Không có địa điểm nào ở khu vực này</Box>
      )}
    </>
  );
}

function Nearest() {
  const nearests = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    nearestRestaurantsState
  );
  return (
    <>
      <Box mx={4} mt={5}>
        <Header className="mt-6 mb-3 font-semibold">Gần bạn nhất</Header>
        {nearests.map((restaurant) => (
          <Box key={restaurant.id} mx={0} my={3}>
            <RestaurantItem
              layout="list-item"
              restaurant={restaurant}
              after={
                <Text size="small" className="text-gray-500">
                  {restaurant.address}
                </Text>
              }
            />
          </Box>
        ))}
      </Box>
    </>
  );
}

function Welcome() {
  const user = useRecoilValue(userState);
  return (
    <>
      <Avatar className="shadow align-middle mb-2" src={user.avatar}>
        Hi
      </Avatar>
      <Text size="small">{user.name ? <>Chào, {user.name}!</> : "..."}</Text>
      <Text className="text-[25px] leading-[29px] font-bold">
        Hôm nay bạn muốn ăn ở đâu?
      </Text>
    </>
  );
}

const HomePage = () => {
  return (
    <Page>
      <Box mx={4} mb={4} mt={5}>
        <Suspense>
          <Welcome />
        </Suspense>
        {getConfig((c) => c.template.searchBar) && (
          <>
            <Inquiry />
            <Header className="mt-6 font-semibold">Phân loại nhanh</Header>
          </>
        )}
        <QuickFilter />
      </Box>
      <Popular />
      <Suspense>
        <Nearest />
      </Suspense>
    </Page>
  );
};

export default HomePage;
