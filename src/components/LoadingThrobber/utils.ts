import { sample } from "lodash";
import { LOADING_PHRASES } from "./constants";

export const getRandomLoadingPhrase = () => {
  return sample(LOADING_PHRASES);
};
