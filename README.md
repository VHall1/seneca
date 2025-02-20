# Seneca Frontend Task

## Requirements

- Node.js: v20 or later
  - [Download](https://nodejs.org/en/download/)

## Project Structure

```
/
├── src/
│   ├── components/ (where individual components are stored - ToggleGroup handles questions, and Toggle handles the individual option toggles)
│   │   ├── Button/
│   │   ├── Toggle/
│   │   └── ToggleGroup/
│   ├── utils/  (helper functions - e.g. className merge, colour lerping, array shuffling, etc...)
│   └── app.tsx (app entry point)
└── package.json
```

## Assumptions

- **Changing background colour**: I wasn't entirely sure how this was meant to be calculated. The video and the figma seemed to show different
background transitions, so I settled in the middle for now. I took the colours from the figma design and used a lerp function to pick a background
colour in proportion to the number of correct answers unless all correct options are selected,  in which case a fixed background colour is used.
All the colours used are stored in a `constants.ts` file, so it should be relatively straightforward to change if needed.

- **Horizontal/Vertical toggles**: It wasn't obvious from the design spec when each version should be used, so currently, it observes each toggle
and switches to vertical mode if the text overflows.

- **Question switching**: One of the extension tasks also asked to add an easy way for users to switch between active questions. Since that wasn't a part
of the original design I took the liberty to add two buttons to the bottom of the screen to switch between questions. This also means the `ToggleGroup` component
takes more than one question, while also storing the answer for all of the questions so progress is not lost when switching between questions.

## Limitations

- **Extra re-renders**: For the sake of simplicity, all the "answers" state is stored in the top-level component `ToggleGroup`, which causes
every individual `Toggle` to re-render when an option is selected. This shouldn't cause much trouble for now, as we're not rendering that many
toggles and each render is reasonably fast, but could become an issue if more complex calculations are added or if have a question with several toggles.
