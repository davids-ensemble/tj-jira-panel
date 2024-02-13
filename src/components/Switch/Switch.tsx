import type { VNode, FunctionalComponent } from '@stencil/core';

interface Case {
  condition: boolean;
  getComponent: () => VNode;
}

interface SwitchProps {
  cases: Case[];
  /* If true, the switch will break after the first case that returns true */
  shouldBreak?: boolean;
}

export const Switch: FunctionalComponent<SwitchProps> = ({
  cases,
  shouldBreak,
}) => {
  const result = [];

  for (const { condition, getComponent } of cases) {
    if (condition) {
      result.push(getComponent());
      if (shouldBreak) {
        break;
      }
    }
  }

  return result;
};
