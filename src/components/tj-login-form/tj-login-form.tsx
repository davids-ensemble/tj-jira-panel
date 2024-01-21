import { Component, h } from '@stencil/core';

import { LoginParams, User } from '../../utils/tj-api/User';

@Component({
  tag: 'tj-login-form',
  styleUrl: 'tj-login-form.css',
  shadow: true,
})
export class TJLoginForm {
  private async onFormSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries([...formData.entries()]) as unknown as LoginParams;
    const authObject = await User.login(data);
    console.log(authObject);
  }

  render() {
    return (
      <form action="" onSubmit={this.onFormSubmit}>
        <input type="text" placeholder="username" id="username" name="username" />
        <input type="password" placeholder="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    );
  }
}
