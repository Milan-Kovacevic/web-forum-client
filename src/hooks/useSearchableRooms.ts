import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { getAllRooms } from "@/redux/rooms/roomThunks";
import { Room } from "@/types/models/rooms";
import { useSearchParams } from "react-router-dom";

export const useSearchableRooms = () => {
  const { rooms, loadingRooms } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      var filteredRooms = rooms.filter((r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setChatRooms(filteredRooms);
    }
  }, [rooms]);

  const onTextChanged = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
    if (event.target.value === "") {
      setSearchParams();
    }
  };
  const onKeyPressed = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (searchText === "") setSearchParams();
      else setSearchParams({ search: searchText });
    }
  };

  useEffect(() => {
    var text = searchParams.get("search");
    if (!text) {
      setChatRooms(rooms);
      return;
    }

    setSearchText(text);
    var filteredRooms = rooms.filter((r) =>
      r.name.toLowerCase().includes(text!.toLowerCase())
    );
    setChatRooms(filteredRooms);
  }, [searchParams]);

  return { onTextChanged, onKeyPressed, chatRooms, loadingRooms, searchText };
};
