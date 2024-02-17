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
    interface TjHeading {
        "isExpanded": boolean;
    }
    interface TjJiraPanel {
        "jiraID": string;
        "jiraSummary": string;
    }
    interface TjLoginForm {
    }
    interface TjParentTasksPage {
    }
    interface TjSettings {
        "isLoggedIn": boolean;
    }
    interface TjTaskPage {
        "jiraID": string;
        "jiraSummary": string;
    }
    interface WithLoading {
        "isLoading": boolean;
    }
}
export interface TjFooterCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjFooterElement;
}
export interface TjHeadingCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjHeadingElement;
}
export interface TjLoginFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjLoginFormElement;
}
export interface TjTaskPageCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjTaskPageElement;
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
    interface HTMLTjFooterElementEventMap {
        "showSettings": void;
        "hideSettings": void;
    }
    interface HTMLTjFooterElement extends Components.TjFooter, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjFooterElementEventMap>(type: K, listener: (this: HTMLTjFooterElement, ev: TjFooterCustomEvent<HTMLTjFooterElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjFooterElementEventMap>(type: K, listener: (this: HTMLTjFooterElement, ev: TjFooterCustomEvent<HTMLTjFooterElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjFooterElement: {
        prototype: HTMLTjFooterElement;
        new (): HTMLTjFooterElement;
    };
    interface HTMLTjHeadingElementEventMap {
        "togglePanel": void;
    }
    interface HTMLTjHeadingElement extends Components.TjHeading, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjHeadingElementEventMap>(type: K, listener: (this: HTMLTjHeadingElement, ev: TjHeadingCustomEvent<HTMLTjHeadingElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjHeadingElementEventMap>(type: K, listener: (this: HTMLTjHeadingElement, ev: TjHeadingCustomEvent<HTMLTjHeadingElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjHeadingElement: {
        prototype: HTMLTjHeadingElement;
        new (): HTMLTjHeadingElement;
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
    interface HTMLTjParentTasksPageElement extends Components.TjParentTasksPage, HTMLStencilElement {
    }
    var HTMLTjParentTasksPageElement: {
        prototype: HTMLTjParentTasksPageElement;
        new (): HTMLTjParentTasksPageElement;
    };
    interface HTMLTjSettingsElement extends Components.TjSettings, HTMLStencilElement {
    }
    var HTMLTjSettingsElement: {
        prototype: HTMLTjSettingsElement;
        new (): HTMLTjSettingsElement;
    };
    interface HTMLTjTaskPageElementEventMap {
        "notification": Notification;
    }
    interface HTMLTjTaskPageElement extends Components.TjTaskPage, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjTaskPageElementEventMap>(type: K, listener: (this: HTMLTjTaskPageElement, ev: TjTaskPageCustomEvent<HTMLTjTaskPageElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjTaskPageElementEventMap>(type: K, listener: (this: HTMLTjTaskPageElement, ev: TjTaskPageCustomEvent<HTMLTjTaskPageElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjTaskPageElement: {
        prototype: HTMLTjTaskPageElement;
        new (): HTMLTjTaskPageElement;
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
        "tj-heading": HTMLTjHeadingElement;
        "tj-jira-panel": HTMLTjJiraPanelElement;
        "tj-login-form": HTMLTjLoginFormElement;
        "tj-parent-tasks-page": HTMLTjParentTasksPageElement;
        "tj-settings": HTMLTjSettingsElement;
        "tj-task-page": HTMLTjTaskPageElement;
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
        "onHideSettings"?: (event: TjFooterCustomEvent<void>) => void;
        "onShowSettings"?: (event: TjFooterCustomEvent<void>) => void;
    }
    interface TjHeading {
        "isExpanded"?: boolean;
        "onTogglePanel"?: (event: TjHeadingCustomEvent<void>) => void;
    }
    interface TjJiraPanel {
        "jiraID"?: string;
        "jiraSummary"?: string;
    }
    interface TjLoginForm {
        "onLogin"?: (event: TjLoginFormCustomEvent<void>) => void;
        "onNotification"?: (event: TjLoginFormCustomEvent<Notification>) => void;
    }
    interface TjParentTasksPage {
    }
    interface TjSettings {
        "isLoggedIn"?: boolean;
    }
    interface TjTaskPage {
        "jiraID"?: string;
        "jiraSummary"?: string;
        "onNotification"?: (event: TjTaskPageCustomEvent<Notification>) => void;
    }
    interface WithLoading {
        "isLoading"?: boolean;
    }
    interface IntrinsicElements {
        "notification-toast": NotificationToast;
        "notifications-provider": NotificationsProvider;
        "tj-footer": TjFooter;
        "tj-heading": TjHeading;
        "tj-jira-panel": TjJiraPanel;
        "tj-login-form": TjLoginForm;
        "tj-parent-tasks-page": TjParentTasksPage;
        "tj-settings": TjSettings;
        "tj-task-page": TjTaskPage;
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
            "tj-heading": LocalJSX.TjHeading & JSXBase.HTMLAttributes<HTMLTjHeadingElement>;
            "tj-jira-panel": LocalJSX.TjJiraPanel & JSXBase.HTMLAttributes<HTMLTjJiraPanelElement>;
            "tj-login-form": LocalJSX.TjLoginForm & JSXBase.HTMLAttributes<HTMLTjLoginFormElement>;
            "tj-parent-tasks-page": LocalJSX.TjParentTasksPage & JSXBase.HTMLAttributes<HTMLTjParentTasksPageElement>;
            "tj-settings": LocalJSX.TjSettings & JSXBase.HTMLAttributes<HTMLTjSettingsElement>;
            "tj-task-page": LocalJSX.TjTaskPage & JSXBase.HTMLAttributes<HTMLTjTaskPageElement>;
            "with-loading": LocalJSX.WithLoading & JSXBase.HTMLAttributes<HTMLWithLoadingElement>;
        }
    }
}
