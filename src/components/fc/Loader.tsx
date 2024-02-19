import { h, FunctionalComponent } from '@stencil/core';

interface LoaderProps {
  isLoading: boolean;
}

const styles = {
  wrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    '--color': 'var(--primary-color)',
    '--size': '50px',
    'width': 'var(--size)',
    'height': 'var(--size)',
  },
};

export const Loader: FunctionalComponent<LoaderProps> = (
  { isLoading },
  children,
) => {
  if (isLoading) {
    return (
      <div style={styles.wrapper}>
        <ion-spinner name="dots" style={styles.spinner}></ion-spinner>
      </div>
    );
  }
  return children;
};
