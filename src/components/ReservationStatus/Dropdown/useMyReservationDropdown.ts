import { useEffect, useRef, useState } from "react";

type MyReservationDropdownType = (
  handleSchedule: (id: number) => void
) => [
  isOpen: boolean,
  title: string,
  dropdownRef: React.RefObject<HTMLDivElement | null>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleItemClick: (id: number) => void
];

export const useMyReservationDropdown: MyReservationDropdownType = (
  handleSchedule: (id: number) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("확인하려는 체험을 선택해주세요.");

  const handleItemClick = (id: number) => {
    setIsOpen(false);
    handleSchedule(id);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return [isOpen, title, dropdownRef, setTitle, setIsOpen, handleItemClick];
};
