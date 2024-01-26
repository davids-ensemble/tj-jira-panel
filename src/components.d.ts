/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Notification } from "./components/notifications-provider/types";
export { Notification } from "./components/notifications-provider/types";
export namespace Components {
    interface NotificationToast {
        "identifier": string;
        "message": string;
        "timeout": number;
        "type": Notification['type'];
    }
    interface NotificationsProvider {
    }
    interface TjFooter {
        "isLoggedIn": boolean;
    }
    interface TjJiraPanel {
        "jiraID": string;
        "jiraSummary": string;
    }
    interface TjLoginForm {
    }
    interface WithLoading {
        "isLoading": boolean;
    }
}
export interface TjLoginFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjLoginFormElement;
}
declare global {
    interface HTMLNotificationToastElement extends Components.NotificationToast, HTMLStencilElement {
    }
    var HTMLNotificationToastElement: {
        prototype: HTMLNotificationToastElement;
        new (): HTMLNotificationToastElement;
    };
    interface HTMLNotificationsProviderElement extends Components.NotificationsProvider, HTMLStencilElement {
    }
    var HTMLNotificationsProviderElement: {
        prototype: HTMLNotificationsProviderElement;
        new (): HTMLNotificationsProviderElement;
    };
    interface HTMLTjFooterElement extends Components.TjFooter, HTMLStencilElement {
    }
    var HTMLTjFooterElement: {
        prototype: HTMLTjFooterElement;
        new (): HTMLTjFooterElement;
    };
    interface HTMLTjJiraPanelElement extends Components.TjJiraPanel, HTMLStencilElement {
    }
    var HTMLTjJiraPanelElement: {
        prototype: HTMLTjJiraPanelElement;
        new (): HTMLTjJiraPanelElement;
    };
    interface HTMLTjLoginFormElementEventMap {
        "notification": Notification;
        "login": void;
    }
    interface HTMLTjLoginFormElement extends Components.TjLoginForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjLoginFormElementEventMap>(type: K, listener: (this: HTMLTjLoginFormElement, ev: TjLoginFormCustomEvent<HTMLTjLoginFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjLoginFormElementEventMap>(type: K, listener: (this: HTMLTjLoginFormElement, ev: TjLoginFormCustomEvent<HTMLTjLoginFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjLoginFormElement: {
        prototype: HTMLTjLoginFormElement;
        new (): HTMLTjLoginFormElement;
    };
    interface HTMLWithLoadingElement extends Components.WithLoading, HTMLStencilElement {
    }
    var HTMLWithLoadingElement: {
        prototype: HTMLWithLoadingElement;
        new (): HTMLWithLoadingElement;
    };
    interface HTMLElementTagNameMap {
        "notification-toast": HTMLNotificationToastElement;
        "notifications-provider": HTMLNotificationsProviderElement;
        "tj-footer": HTMLTjFooterElement;
        "tj-jira-panel": HTMLTjJiraPanelElement;
        "tj-login-form": HTMLTjLoginFormElement;
        "with-loading": HTMLWithLoadingElement;
    }
}
declare namespace LocalJSX {
    interface NotificationToast {
        "identifier": string;
        "message": string;
        "timeout": number;
        "type": Notification['type'];
    }
    interface NotificationsProvider {
    }
    interface TjFooter {
        "isLoggedIn"?: boolean;
    }
    interface TjJiraPanel {
        "jiraID"?: string;
        "jiraSummary"?: string;
    }
    interface TjLoginForm {
        "onLogin"?: (event: TjLoginFormCustomEvent<void>) => void;
        "onNotification"?: (event: TjLoginFormCustomEvent<Notification>) => void;
    }
    interface WithLoading {
        "isLoading"?: boolean;
    }
    interface IntrinsicElements {
        "notification-toast": NotificationToast;
        "notifications-provider": NotificationsProvider;
        "tj-footer": TjFooter;
        "tj-jira-panel": TjJiraPanel;
        "tj-login-form": TjLoginForm;
        "with-loading": WithLoading;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "notification-toast": LocalJSX.NotificationToast & JSXBase.HTMLAttributes<HTMLNotificationToastElement>;
            "notifications-provider": LocalJSX.NotificationsProvider & JSXBase.HTMLAttributes<HTMLNotificationsProviderElement>;
            "tj-footer": LocalJSX.TjFooter & JSXBase.HTMLAttributes<HTMLTjFooterElement>;
            "tj-jira-panel": LocalJSX.TjJiraPanel & JSXBase.HTMLAttributes<HTMLTjJiraPanelElement>;
            "tj-login-form": LocalJSX.TjLoginForm & JSXBase.HTMLAttributes<HTMLTjLoginFormElement>;
            "with-loading": LocalJSX.WithLoading & JSXBase.HTMLAttributes<HTMLWithLoadingElement>;
        }
    }
}
