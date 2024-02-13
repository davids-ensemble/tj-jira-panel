import { FunctionalComponent, h } from '@stencil/core';

interface SettingsMenuProps {
  isLoggedIn: boolean;
  changePath: (e: Event) => void;
}

interface Setting {
  path: string;
  label: string;
}

export const SettingsMenu: FunctionalComponent<SettingsMenuProps> = ({
  isLoggedIn,
  changePath,
}) => {
  const userSettings = [
    {
      path: 'parent-tasks',
      label: 'Parent tasks',
    },
  ];
  const panelSettings = [
    {
      path: 'server',
      label: 'Server',
    },
  ];

  const generateButton = (setting: Setting) => (
    <button data-path={setting.path} onClick={changePath} class="menuButton">
      {setting.label}
    </button>
  );

  return (
    <div class="menu">
      {isLoggedIn && userSettings.map(setting => generateButton(setting))}
      {panelSettings.map(setting => generateButton(setting))}
    </div>
  );
};
