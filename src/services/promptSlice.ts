import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prompt } from "@types";
import { RootState } from "./store";

interface PromptState {
  prompts: Prompt[];
  selected: number;
}

const initialState: PromptState = {
  selected: 0,
  prompts: [
    {
      template: `<Instructions>Please answer the question briefly, succinctly and in a personable manner using nice markdown as the Assistant. End your answer with a lot of fun emojis.
<Context>Use this context in the response: customer name: {name}, customer age: {age}, customer timezone: {location}.
<Documentation>{documentation}
<Conversation>{conversation}
{name}: {message}
Assistant:`,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
  ],
};

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    addPrompt: (state, action: PayloadAction<Prompt>) => {
      state.prompts.push(action.payload);
    },
    setSelectedPrompt: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.prompts.length)
        state.selected = action.payload;
    },
    setCurrentPrompt: (state, action: PayloadAction<string>) => {
      state.prompts[state.selected].template = action.payload;
    },
  },
});

export const { addPrompt, setSelectedPrompt, setCurrentPrompt } = promptSlice.actions;
export const selectPrompts = (state: RootState) => state.prompts.prompts;
export const currentPrompt = (state: RootState) =>
  state.prompts.prompts[state.prompts.selected];
export default promptSlice.reducer;
