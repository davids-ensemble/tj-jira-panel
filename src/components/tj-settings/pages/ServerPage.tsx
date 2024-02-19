import { FunctionalComponent, h } from '@stencil/core';

import { Server } from '@utils/tj';

export const ServerPage: FunctionalComponent = () => {
  return (
    <div class="server">
      <label>
        Server API URL
        <input
          type="text"
          value={Server.url}
          onBlur={(e: Event) => {
            const target = e.target as HTMLInputElement;
            Server.url = target.value;
          }}
        />
      </label>
    </div>
  );
};
