import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ANIMATION_DURATION = 300;

interface ConfirmModalProps {
  withAnimation?: boolean;
  containerClassName?: string;
  modalClassName?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal = ({
  withAnimation = false,
  containerClassName,
  modalClassName,
  isOpen,
  onClose,
  children,
}: ConfirmModalProps) => {
  const portal = document.getElementById("modal")!;

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      setShouldRender(true);
      const showTimer = setTimeout(() => setIsVisible(true), 10);

      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";

      return () => {
        clearTimeout(showTimer);
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto";
      };
    } else {
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setShouldRender(false);
      }, ANIMATION_DURATION);
      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const slideClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-full opacity-0";

  const dimmedClass = isVisible ? "opacity-100" : "opacity-0";

  return createPortal(
    <div
      className={`${containerClassName} ${
        withAnimation &&
        "tablet:transition-opacity tablet:duration-300 tablet:ease-in-out"
      } ${dimmedClass}`}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" || e.key === "Enter") {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-message"
      tabIndex={-1}
    >
      {/* biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: Modal content wrapper needs stopPropagation */}
      <div
        className={`bg-white ${
          withAnimation &&
          "tablet:transition-all tablet:duration-300 tablet:ease-in-out"
        } ${modalClassName} ${slideClass}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    portal,
  );
};

export default CustomModal;
