# Senece Frontend Task

## Assumptions

- **Changing background colour**: I wasn't entirely sure how this was meant to be calculated. The video and the figma seemed to show different
background transitions, so I settled in the middle for now. I took the colours from the figma design and used a lerp function to pick a background
colour in proportion to the number of correct answers unless all correct options are selected, which has a fixed background colour. All the colours
used are stored in a `constants.ts` file, so it should be relatively straightforward to change if needed.

- **Horizontal/Vertical toggles**: It wasn't obvious from the design spec when each version should be used, so currently, it observes each toggle
in case the text overflows, which then switches it into vertical mode.

## Limitations

- **Extra re-renders**: For the sake of simplicity, all the "answers" state is stored in the top-level component `ToggleGroup`, which causes
every individual `Toggle` to re-render when an option is selected. This shouldn't cause much trouble for now, as we're not rendering that many
toggles and each render is reasonably fast, but could become an issue if more complex calculations are added or if have a question with several toggles.
