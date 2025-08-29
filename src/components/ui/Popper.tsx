import { useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PopperProps {
  anchorRef: React.RefObject<HTMLElement> | null;
  children: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
}

const Popper = ({
  anchorRef,
  children,
  offsetX = 0,
  offsetY = 8,
}: PopperProps) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // hàm cập nhật vị trí
  const updatePosition = () => {
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.top + window.scrollY - offsetY, // đẩy lên theo offsetY
        left: rect.left + window.scrollX + rect.width / 2 + offsetX, // dịch ngang theo offsetX
      });
    }
  };

  useLayoutEffect(() => {
    updatePosition();

    // update khi resize/scroll
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchorRef, offsetX, offsetY]);

  return ReactDOM.createPortal(
    <div
      ref={popperRef}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
      }}
      className="relative"
    >
      {/* Nội dung popper */}
      <div className="px-3 py-1 bg-[#212121] text-white text-xs rounded shadow-lg whitespace-nowrap">
        {children}
      </div>

      {/* Mũi tên */}
      <div
        className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6"
        style={{
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: "#212121",
          borderLeftWidth: "6px",
          borderRightWidth: "6px",
          borderTopWidth: "6px",
        }}
      />
    </div>,
    document.body
  );
};

export default Popper;
