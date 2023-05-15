import React from "react";
import { spline } from "@georgedoescode/spline";
import { createNoise2D } from "simplex-noise";
import {
  useComputedValue,
  Canvas,
  LinearGradient,
  useClockValue,
  useValue,
  vec,
  Path,
} from "@shopify/react-native-skia";
import styles from "../../styles";
import colors from "../config/colors";
function Molecule(props) {
  const noise = createNoise2D();
  const noiseStep = 0.008;
  const clock = useClockValue();
  const endGradientOffset = useValue(0);

  const createPoints = () => {
    const newPoints = [];
    const numPoints = 6;
    const angleStep = (Math.PI * 2) / numPoints;
    const rad = 140;

    for (let i = 1; i <= numPoints; i++) {
      const theta = i * angleStep;
      const x = 200 + Math.cos(theta) * rad;
      const y = 200 + Math.sin(theta) * rad;

      newPoints.push({
        x,
        y,
        originX: x,
        originY: y,
        noiseOffsetX: Math.random() * 100,
        noiseOffsetY: Math.random() * 100,
      });
    }

    return newPoints;
  };

  const points = useValue(createPoints());

  const mapFunction = (n, start1, end1, start2, end2) => {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  };

  const animation = () => {
    const newPoints = [];

    for (let i = 0; i < points.current.length; i++) {
      const point = points.current[i];

      // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
      // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
      const x = mapFunction(nX, -1, 1, point.originX - 10, point.originX + 10);
      const y = mapFunction(nY, -1, 1, point.originY - 10, point.originY + 10);

      // update the point's current coordinates
      point.x = x;
      point.y = y;

      // progress the point's x, y values through "time"
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;

      newPoints.push(point);
    }
    points.current = newPoints;
  };

  const path = useComputedValue(() => {
    animation();
    return spline(points.current, 1, true);
  }, [clock]);

  const endGradientCoordinate = useComputedValue(() => {
    endGradientOffset.current += noiseStep / 2;
    const endNoise = noise(
      endGradientOffset.current,
      endGradientOffset.current
    );
    const newValue = mapFunction(endNoise, -1, 1, 0, 360);
    return vec(400, newValue);
  }, [clock]);

  return (
    <Canvas style={styles.canvas}>
      <Path path={path}>
        <LinearGradient
          start={vec(100, 100)}
          end={endGradientCoordinate}
          colors={[colors.purple, colors.orange]}
        />
      </Path>
    </Canvas>
  );
}

export default Molecule;
