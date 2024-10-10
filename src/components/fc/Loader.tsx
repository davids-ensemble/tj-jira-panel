import { FunctionalComponent, h } from '@stencil/core';

import { JSXBase } from '@stencil/core/internal';

interface LoaderProps {
  isLoading: boolean;
  style?: JSXBase.HTMLAttributes<HTMLDivElement>['style'];
  type?: 'pulse' | 'stretching' | 'elastic';
}

export const Loader: FunctionalComponent<LoaderProps> = ({ isLoading, style, type = 'pulse' }, children) => {
  if (isLoading) {
    return (
      <div class="loader-wrapper" style={style}>
        <div class={`dot-${type} loader`}></div>
      </div>
    );
  }
  return children;
};
