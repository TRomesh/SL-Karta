import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Audio from "../audio";

// eslint-disable-next-line react-refresh/only-export-components
export enum LABEL_POSITION {
  "TOP" = "TOP",
  "TOP_RIGHT" = "TOP_RIGHT",
  "BOTTOM_LEFT" = "BOTTOM_LEFT",
}

const getLabelAngle = (position?: string): number => {
  switch (position) {
    case LABEL_POSITION.TOP_RIGHT:
    case LABEL_POSITION.BOTTOM_LEFT:
      return -45;
    default:
      return 0;
  }
};

const getLabelPossition = (point: Point): Pick<Point, "x" | "y"> => {
  switch (point.position) {
    case LABEL_POSITION.TOP:
      return {
        x: point.position === LABEL_POSITION.TOP ? point.x - 20 : point.x,
        y: point.position === LABEL_POSITION.TOP ? point.y - 30 : point.y,
      };
    case LABEL_POSITION.BOTTOM_LEFT:
      return { x: point.x - 100, y: point.y + 110 };
    default:
      return {
        x: point.start || point.end ? point.x + 30 : point.x,
        y: point.start || point.end ? point.y - 10 : point.y,
      };
  }
};

const MetroLineMap: React.FC<MetroLineMapProps> = ({ data, width, height }) => {
  // Create a ref for the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  const [queuedAudio, setQueuedAudio] = useState<string | null>(null);

  const playAudio = async (file: string) => {
    if (audioRef.current) {
      // Set the fixed audio as the current source
      audioRef.current.src = Audio.Nasta;
      await audioRef.current.play();
      // Queue the selected audio file to play after the fixed audio
      setQueuedAudio(file);
    }
  };

  const handleAudioEnded = async () => {
    if (queuedAudio && audioRef.current) {
      // Once the fixed audio finishes, play the queued audio
      audioRef.current.src = Audio[queuedAudio];
      await audioRef.current.play();
      // Reset the queued audio to null
      setQueuedAudio(null);
    }
  };

  const svgRef = useRef<SVGSVGElement>(null);

  const handleCircleClick = useCallback((name: string) => {
    playAudio(name);
  }, []);

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    data.forEach((lineSegment) => {
      const group = svg.append("g");

      const lineGenerator = d3
        .line<Point>()
        .x((d) => d.x)
        .y((d) => d.y);

      // Draw line
      group
        .append("path")
        .datum(lineSegment.points)
        .attr("d", lineGenerator)
        .attr("stroke", lineSegment.color)
        .attr("stroke-width", 15)
        .attr("fill", "none");

      // Render points
      lineSegment.points.forEach((point) => {
        if (point.start || point.end) {
          // Render rectangles for start and end points
          group
            .append("rect")
            .attr("x", point.x - 20)
            .attr("y", point.y - 20)
            .attr("width", 40)
            .attr("height", 30)
            .attr("fill", lineSegment.color)
            .attr("rx", 5) // Rounded corners
            .attr("ry", 5)
            .style("cursor", "pointer")
            .on("click", () => handleCircleClick(point.name));

          // Render text for start and end points
          group
            .append("text")
            .attr("x", point.x)
            .attr("y", point.y - 5)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .text(lineSegment.line)
            .style("cursor", "pointer")
            .on("click", () => handleCircleClick(point.name));

          // Render text for start and end points

          const { x, y } = getLabelPossition(point);
          group
            .append("text")
            .attr("x", x)
            .attr("y", y)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "central")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .text(point.name)
            .style("cursor", "pointer")
            .on("click", () => handleCircleClick(point.name));
        } else {
          // Render white circles and text at a 45-degree angle for other points
          if (point.multi) {
            group
              .append("rect")
              .attr("x", point.x - 15)
              .attr("y", point.y - 6)
              .attr("width", 30)
              .attr("height", 13)
              .attr("rx", 8)
              .attr("ry", 8)
              .attr("fill", "#C5C8C9")
              .attr("stroke", "white")
              .attr("stroke-width", 2)
              .style("cursor", "pointer")
              .on("click", () => handleCircleClick(point.name));
          } else {
            group
              .append("circle")
              .attr("cx", point.x)
              .attr("cy", point.y)
              .attr("r", 4)
              .attr("fill", "white")
              .style("cursor", "pointer")
              .on("click", () => handleCircleClick(point.name));
          }

          const { x, y } = getLabelPossition(point);

          group
            .append("text")
            .attr("x", x + 25)
            .attr("y", y)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "central")
            .attr("fill", "black")
            .attr("font-weight", "bold")
            .attr(
              "transform",
              `rotate(${getLabelAngle(point.position)},
               ${x}, ${y})`
            )
            .attr("fill", "white")
            .text(point.name)
            .style("cursor", "pointer")
            .on("click", () => handleCircleClick(point.name))
            .html(() =>
              point.name.replace(
                /\n/g,
                '<tspan x="' + (point.x + 15) + '" dy="1.2em">'
              )
            );
        }
      });
    });
  }, [data, handleCircleClick]);

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
      />
      <svg
        ref={svgRef}
        width={width}
        height={height}></svg>
    </>
  );
};

export default MetroLineMap;
