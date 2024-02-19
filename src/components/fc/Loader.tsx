import { FunctionalComponent, h } from '@stencil/core';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: FunctionalComponent<LoaderProps> = (
  { isLoading },
  children,
) => {
  if (isLoading) {
    return (
      <div class="loader-wrapper">
        <div class="dot-pulse loader"></div>
      </div>
    );
  }
  return children;
};
