import { ChangeEvent, FC, useState, useCallback } from "react";

import { Button, Flex, Text, Link, VStack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { debounce } from "lodash";

import { DisclaimerModel } from "./DisclaimerModel";
import { FilterOptions } from "./FilterOptions";
import { FreeRoomsCardList } from "./FreeRoomsCardList";
import { ScrollToTop } from "./ScrollToTop";
import { Feedback } from "./Feedback";

const numberDayToStringDay = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
};

const isWeekDay = (numberDay: number) => 1 <= numberDay && numberDay <= 5;
const numberDay = new Date().getDay();

export const Main: FC<{}> = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("ALL");
  const [currentDay, setCurrentDay] = useState<string>(
    isWeekDay(numberDay) ? numberDayToStringDay[numberDay] : "MON"
  );
  const [confirmSearchText, setConfirmSearchText] = useState<string>("");
  const [cluster, setCluster] = useState<string>("ALL");

  const handleTimeSlotSelectDebounce = useCallback(
    debounce((e) => setTimeSlot(e.target.value), 125),
    []
  );
  const handleCurrentDaySelectDebounce = useCallback(
    debounce((e) => setCurrentDay(e.target.value), 125),
    []
  );
  const handleClusterSelectDebounce = useCallback(
    debounce((e) => setCluster(e.target.value), 125),
    []
  );

  const handleClusterChange = useCallback(
    (e: ChangeEvent<any>) => handleClusterSelectDebounce(e),
    []
  );
  const handleTimeSlotChange = useCallback(
    (e: ChangeEvent<any>) => handleTimeSlotSelectDebounce(e),
    []
  );
  const handleDayChange = useCallback(
    (e: ChangeEvent<any>) => handleCurrentDaySelectDebounce(e),
    []
  );
  const handleSearchTextChange = useCallback(
    (e: ChangeEvent<any>) => setSearchText(e.target.value),
    []
  );
  const handleSearchTextButton = () => setConfirmSearchText(searchText);
  const handleSearchTextEnterKey = (e) => {
    if (e.key === "Enter") {
      setConfirmSearchText(searchText);
    }
  };

  return (
    <Flex direction="column" w="full" h="auto" minH="100vh" bg="gray.100">
      <DisclaimerModel />
      <Flex mt="2" ml={["4", "8"]} justify="space-between" align="center">
        {isWeekDay(numberDay) ? (
          <Text fontSize="sm">hmm.. where to mug?📚📚</Text>
        ) : (
          <Text fontSize="sm">
            Its weekend. Rmb to take a break. Love you💗
          </Text>
        )}
        <Link href="https://maps.ntu.edu.sg/" isExternal>
          <Button
            rightIcon={<ChevronRightIcon />}
            fontSize="sm"
            textDecoration="underline"
            marginRight={["", "10"]}
          >
            To NTU Map
          </Button>
        </Link>
      </Flex>
      <FilterOptions
        timeSlot={timeSlot}
        handleTimeSlotChange={handleTimeSlotChange}
        currentDay={currentDay}
        handleDayChange={handleDayChange}
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
        handleSearchTextButton={handleSearchTextButton}
        handleSearchTextEnterKey={handleSearchTextEnterKey}
        cluster={cluster}
        handleClusterChange={handleClusterChange}
      />
      <FreeRoomsCardList
        searchText={confirmSearchText}
        timeSlot={timeSlot}
        currentDay={currentDay}
        cluster={cluster}
      />
      <VStack
        direction="column"
        position="fixed"
        bottom={["3", "5"]}
        right={["3", "5"]}
      >
        <Feedback />
        <ScrollToTop />
      </VStack>
    </Flex>
  );
};
