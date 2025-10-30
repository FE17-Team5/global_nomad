import { filterList, type FilterListType } from "../filter-data";
import { useState } from "react";
import { useCancelMyReservation } from "../../../hooks/mutations";
import {
  QueryClient,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { CancelMyReservationResponse } from "../../../lib/my-reservations/types";
import type { components } from "../../../types/api-types";

type ReservationCardType = (
  status: components["schemas"]["ReservationStatus"]
) => [
  cancelMutation: UseMutationResult<
    CancelMyReservationResponse,
    Error,
    number,
    unknown
  >,
  queryClient: QueryClient,
  filterStatus: FilterListType | undefined,
  isOpen: {
    cancel: boolean;
    review: boolean;
  },
  handleModalOpen: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleModalClose: (modal: "cancel" | "review") => void
];

export const useReservationCard: ReservationCardType = (
  status: components["schemas"]["ReservationStatus"]
) => {
  const accessToken = localStorage.getItem("accessToken");
  const cancelMutation = useCancelMyReservation(accessToken!);
  const queryClient = useQueryClient();
  const filterStatus = filterList.find((data) => data.status === status);
  const [isOpen, setIsOpen] = useState({
    cancel: false,
    review: false,
  });

  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const modal = e.currentTarget.name as keyof typeof isOpen;

    setIsOpen((prevOpen) => ({
      ...prevOpen,
      [modal]: true,
    }));
  };

  const handleModalClose = (modal: keyof typeof isOpen) => {
    setIsOpen((prevOpen) => ({
      ...prevOpen,
      [modal]: false,
    }));
  };
  return [
    cancelMutation,
    queryClient,
    filterStatus,
    isOpen,
    handleModalOpen,
    handleModalClose,
  ];
};
