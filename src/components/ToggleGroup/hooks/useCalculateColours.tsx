import { useMemo } from "react";
import { lerpColour } from "../../../utils";
import { COLOURS } from "../constants";

// Uses lerp function to determine which colours to use proportionally
// to the amount of correct answers

export function useCalculateColours(
  allCorrect: boolean,
  correctAnswers: number,
  questionsOptionsLength: number
) {
  const memoised = useMemo(() => {
    const percent = correctAnswers / questionsOptionsLength;

    const calculateBackground = () => {
      if (allCorrect)
        return `linear-gradient(180deg, ${COLOURS.correct.gradient[0]} 0%, ${COLOURS.correct.gradient[1]} 100%)`;

      return `linear-gradient(180deg, ${lerpColour(
        COLOURS.incorrect.gradient[0],
        COLOURS.partial.gradient[0],
        percent
      )} 0%, ${lerpColour(
        COLOURS.incorrect.gradient[1],
        COLOURS.partial.gradient[1],
        percent
      )} 100%)`;
    };

    const calculateIndicatorColour = () => {
      if (allCorrect) return COLOURS.correct.indicator;

      return lerpColour(
        COLOURS.incorrect.indicator,
        COLOURS.partial.indicator,
        percent
      );
    };

    const calculateTextColour = () => {
      if (allCorrect) return COLOURS.correct.text;

      return lerpColour(COLOURS.incorrect.text, COLOURS.partial.text, percent);
    };

    return {
      backgroundGradient: calculateBackground(),
      indicatorColour: calculateIndicatorColour(),
      textColour: calculateTextColour(),
    };
  }, [allCorrect, correctAnswers, questionsOptionsLength]);

  return memoised;
}
