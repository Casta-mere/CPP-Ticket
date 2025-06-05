"use client";
import React, { useEffect, useRef, useState } from "react";

interface DraggableProps {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  className?: string;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  initialX = 0,
  initialY = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDragging(true);
    setRel({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 50,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Draggable;
