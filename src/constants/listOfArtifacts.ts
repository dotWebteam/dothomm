import { Artifact } from "../pages/gamePage/types";

import helmOfAlabasterUnicornIcon from "../pages/gamePage/pictures/artifacts/helmOfAlabasterUnicorn.png";
import centaursAxeIcon from "../pages/gamePage/pictures/artifacts/centaursAxe.png";
import ringOfVitalityIcon from "../pages/gamePage/pictures/artifacts/ringOfVitality.png";

export const HELM_OF_ALABASTER_UNICORN: Artifact = {
  id: 1,
  name: "HELM_OF_ALABASTER_UNICORN",
  humanReadableName: "Helm of Alabaster Unicorn",
  description: "Gives +2 for your Spell Points in the beggining of the match",
  iconSrc: helmOfAlabasterUnicornIcon,
  cost: 1000,
};

export const CENTAURS_AXE: Artifact = {
  id: 2,
  name: "CENTAURS_AXE",
  humanReadableName: "Centaur's Axe",
  description: "Gives +1 max attack for all your units",
  iconSrc: centaursAxeIcon,
  cost: 2000,
};

export const RING_OF_VITALITY: Artifact = {
  id: 3,
  name: "RING_OF_VITALITY",
  humanReadableName: "Ring of Vitality",
  description: "Gives +1 health for all your units",
  iconSrc: ringOfVitalityIcon,
  cost: 5000,
};

const LIST_OF_ARTIFACTS = [
  HELM_OF_ALABASTER_UNICORN,
  CENTAURS_AXE,
  RING_OF_VITALITY,
];

export default LIST_OF_ARTIFACTS;
