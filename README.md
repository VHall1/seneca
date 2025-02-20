# Senece Frontend Task

## Assumptions

- **Changing background colour**:

## Limitations

- **Extra re-renders**: For the sake of simplicity, all the "answers" state is stored in the top-level component `ToggleGroup`, which causes
every individual `Toggle` to re-render when an option is selected. This shouldn't cause much trouble for now, as we're not rendering that many
toggles and each render is reasonably fast, but could become an issue if more complex calculation are added or if have a question with several toggles.
