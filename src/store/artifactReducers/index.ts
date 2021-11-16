import { ArtifactName, BoardState } from "../../pages/gamePage/types";
import { centaursAxeReducer } from "./centaursAxe";
import { helmOfAlabasterUnicornReducer } from "./helmOfAlabasterUnicorn";
import { ringOfVitalityReducer } from "./ringOfVitality";
import { shieldOfDwarwenLordsReducer } from "./shieldOfDwarwenLords";

export const applyArtifactEffect = (
  board: BoardState,
  artifactName: ArtifactName,
  owner: string
) => {
  switch (artifactName) {
    case "HELM_OF_ALABASTER_UNICORN":
      return helmOfAlabasterUnicornReducer(board, owner);
    case "CENTAURS_AXE":
      return centaursAxeReducer(board, owner);
    case "RING_OF_VITALITY":
      return ringOfVitalityReducer(board, owner);
    case "SHIELD_OF_DWARWEN_LORDS":
      return shieldOfDwarwenLordsReducer(board, owner);
  }
};
