"use client";
import { useRive } from "@rive-app/react-canvas";

export default function RiveCharacter() {
  const { rive, RiveComponent } = useRive({
    src: "/animation/look.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <RiveComponent
      onMouseEnter={() => rive && rive.play()}
      onMouseLeave={() => rive && rive.pause()}
    />
  );
}
