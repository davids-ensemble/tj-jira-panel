import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { login } from './tjAPI.js';

@customElement('jira-web-panel-login')
export class JiraWebPanelLogin extends LitElement {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 200px;
    }
    input[type='submit'] {
      background-color: #005273;
      border: 0;
      color: white;
      text-transform: uppercase;
      border-radius: 2px;
      max-width: 100px;
      padding: 5px 10px;
      cursor: pointer;
    }
  `;

  private async __onFormSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = form.querySelector('#username') as HTMLInputElement;
    const password = form.querySelector('#password') as HTMLInputElement;
    // TODO: add validation
    const data = await login(username.value, password.value);
    const event = new CustomEvent('login', {
      detail: data,
    });
    this.dispatchEvent(event);
  }

  static stopEventPropagation(e: Event) {
    e.stopImmediatePropagation();
  }

  render() {
    return html`
      <form action="" @submit=${this.__onFormSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          @keypress=${JiraWebPanelLogin.stopEventPropagation}
        /><br />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          @keypress=${JiraWebPanelLogin.stopEventPropagation}
        /><br />
        <input type="submit" value="Login" />
      </form>
    `;
  }
}
