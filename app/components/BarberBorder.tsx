"use client";
import React from "react";

export type BarberBorderProps = {
    height?: string;
    stripe?: number;
    angle?: number;
    speed?: number;
    direction?: "left" | "right";
    className?: string;
};

export default function BarberBorder({
    height = "70px",
    stripe = 50,
    angle = 45,
    speed = 1,
    direction = "left",
    className = "",
}: BarberBorderProps) {
    const period = stripe * 2;
    const dirMultiplier = direction === "right" ? 1 : -1;

    return (
        <div
            className={`w-full relative overflow-hidden ${className}`}
            style={{
                height,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.2))",
            }}
        >
            <div
                className="absolute top-0 left-0 h-full w-[200%]"
                style={{
                    backgroundImage: `repeating-linear-gradient(${angle}deg, #000 0 ${stripe}px, #fff ${stripe}px ${period}px)`,
                    backgroundSize: `${period}px ${period}px`,
                    animation: `barber-spin ${speed}s linear infinite`,
                    imageRendering: "pixelated",
                }}
            />

            <style jsx>{`
        @keyframes barber-spin {
          from {
            background-position: 0px 0px;
          }
          to {
            background-position: ${dirMultiplier * period}px 0px;
          }
        }
      `}</style>
        </div>
    );
}
