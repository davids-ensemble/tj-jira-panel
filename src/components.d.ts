/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Variant } from "./components/contextual-help/contextual-help";
import { Notification } from "./components/notifications-provider/types";
import { Task } from "./utils/tj/index";
import { TaskFormData } from "./components/tj-task-page/components/tj-task-form/tj-task-form";
export { Variant } from "./components/contextual-help/contextual-help";
export { Notification } from "./components/notifications-provider/types";
export { Task } from "./utils/tj/index";
export { TaskFormData } from "./components/tj-task-page/components/tj-task-form/tj-task-form";
export namespace Components {
    /**
     * Component providing a button that triggers a popover with contextual help content.
     */
    interface ContextualHelp {
        /**
          * Controls the icon shown in the button.
         */
        "variant": Variant;
    }
    interface NotificationToast {
        "identifier": string;
        "message": string;
        "timeout": number;
        "type": Notification['type'];
    }
    /**
     * The `notifications-provider` component is a provider for notifications. It listens for `notification` events and renders `notification-toast` components for each notification.
     */
    interface NotificationsProvider {
    }
    interface TjEditTaskForm {
        /**
          * The task for which to display the edit form.
         */
        "task": Task;
    }
    /**
     * The footer of the panel.
     * Displays the version of the server and the extension and provides a button to open/close the settings.
     */
    interface TjFooter {
        /**
          * Whether the user is logged in. Certain information is only available when logged in.
         */
        "isLoggedIn": boolean;
        /**
          * The version of the script used to inject the panel.
         */
        "scriptVersion": string | undefined;
    }
    /**
     * The heading for the TJ panel. It contains the title and a button to toggle the panel.
     */
    interface TjHeading {
        /**
          * Whether the panel is expanded or not. This is used to toggle the icon in the button.
         */
        "isExpanded": boolean;
    }
    interface TjJiraPanel {
        /**
          * The Jira description of the task.
         */
        "jiraDescription": string | undefined;
        /**
          * The Jira ID of the task to display.
         */
        "jiraID": string;
        /**
          * The Jira summary of the task to display.
         */
        "jiraSummary": string;
        /**
          * The version of the script used to inject the panel.
         */
        "scriptVersion": string | undefined;
    }
    /**
     * A form to log into TJ.
     */
    interface TjLoginForm {
    }
    /**
     * A form that allows the user to create a new task for the given Jira issue.
     */
    interface TjNewTaskForm {
        /**
          * The Jira description of the task.
         */
        "jiraDescription": string | undefined;
        /**
          * The Jira ID of the task.
         */
        "jiraID": string;
        /**
          * The summary of the task.
         */
        "jiraSummary": string;
    }
    interface TjParentTasksPage {
    }
    /**
     * Component for the settings page.
     */
    interface TjSettings {
        /**
          * Whether the user is logged in. Used to determine which settings to show.
         */
        "isLoggedIn": boolean;
    }
    interface TjTaskForm {
        "buttonLabel": string;
        "description": string | undefined;
        "name": string;
        "parentId": string | undefined;
        "showDescription": boolean;
        "startDate": string;
        "state": 'active' | 'closed' | undefined;
    }
    /**
     * Main component that decides whether to show the task timesheet or the new task form.
     */
    interface TjTaskPage {
        /**
          * The Jira description of the task.
         */
        "jiraDescription": string | undefined;
        /**
          * The Jira ID of the task.
         */
        "jiraID": string;
        /**
          * The summary of the task.
         */
        "jiraSummary": string;
    }
    /**
     * A component that displays the timesheet for a given task allowing the user to record hours.
     */
    interface TjTaskTimesheet {
        /**
          * The task for which to display the timesheet.
         */
        "task": Task;
    }
    /**
     * A banner that displays when a new version of the component is available.
     */
    interface TjUpdateBanner {
        /**
          * The version of the script used to inject the panel.
         */
        "scriptVersion": string | undefined;
    }
}
export interface TjEditTaskFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjEditTaskFormElement;
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
export interface TjNewTaskFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjNewTaskFormElement;
}
export interface TjTaskFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjTaskFormElement;
}
export interface TjTaskPageCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjTaskPageElement;
}
export interface TjTaskTimesheetCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTjTaskTimesheetElement;
}
declare global {
    /**
     * Component providing a button that triggers a popover with contextual help content.
     */
    interface HTMLContextualHelpElement extends Components.ContextualHelp, HTMLStencilElement {
    }
    var HTMLContextualHelpElement: {
        prototype: HTMLContextualHelpElement;
        new (): HTMLContextualHelpElement;
    };
    interface HTMLNotificationToastElement extends Components.NotificationToast, HTMLStencilElement {
    }
    var HTMLNotificationToastElement: {
        prototype: HTMLNotificationToastElement;
        new (): HTMLNotificationToastElement;
    };
    /**
     * The `notifications-provider` component is a provider for notifications. It listens for `notification` events and renders `notification-toast` components for each notification.
     */
    interface HTMLNotificationsProviderElement extends Components.NotificationsProvider, HTMLStencilElement {
    }
    var HTMLNotificationsProviderElement: {
        prototype: HTMLNotificationsProviderElement;
        new (): HTMLNotificationsProviderElement;
    };
    interface HTMLTjEditTaskFormElementEventMap {
        "notification": Notification;
        "cancelEditTask": void;
    }
    interface HTMLTjEditTaskFormElement extends Components.TjEditTaskForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjEditTaskFormElementEventMap>(type: K, listener: (this: HTMLTjEditTaskFormElement, ev: TjEditTaskFormCustomEvent<HTMLTjEditTaskFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjEditTaskFormElementEventMap>(type: K, listener: (this: HTMLTjEditTaskFormElement, ev: TjEditTaskFormCustomEvent<HTMLTjEditTaskFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjEditTaskFormElement: {
        prototype: HTMLTjEditTaskFormElement;
        new (): HTMLTjEditTaskFormElement;
    };
    interface HTMLTjFooterElementEventMap {
        "showSettings": void;
        "hideSettings": void;
    }
    /**
     * The footer of the panel.
     * Displays the version of the server and the extension and provides a button to open/close the settings.
     */
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
    /**
     * The heading for the TJ panel. It contains the title and a button to toggle the panel.
     */
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
    /**
     * A form to log into TJ.
     */
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
    interface HTMLTjNewTaskFormElementEventMap {
        "notification": Notification;
        "taskCreated": Task;
    }
    /**
     * A form that allows the user to create a new task for the given Jira issue.
     */
    interface HTMLTjNewTaskFormElement extends Components.TjNewTaskForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjNewTaskFormElementEventMap>(type: K, listener: (this: HTMLTjNewTaskFormElement, ev: TjNewTaskFormCustomEvent<HTMLTjNewTaskFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjNewTaskFormElementEventMap>(type: K, listener: (this: HTMLTjNewTaskFormElement, ev: TjNewTaskFormCustomEvent<HTMLTjNewTaskFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjNewTaskFormElement: {
        prototype: HTMLTjNewTaskFormElement;
        new (): HTMLTjNewTaskFormElement;
    };
    interface HTMLTjParentTasksPageElement extends Components.TjParentTasksPage, HTMLStencilElement {
    }
    var HTMLTjParentTasksPageElement: {
        prototype: HTMLTjParentTasksPageElement;
        new (): HTMLTjParentTasksPageElement;
    };
    /**
     * Component for the settings page.
     */
    interface HTMLTjSettingsElement extends Components.TjSettings, HTMLStencilElement {
    }
    var HTMLTjSettingsElement: {
        prototype: HTMLTjSettingsElement;
        new (): HTMLTjSettingsElement;
    };
    interface HTMLTjTaskFormElementEventMap {
        "notification": Notification;
        "formSubmit": TaskFormData;
        "loaded": void;
    }
    interface HTMLTjTaskFormElement extends Components.TjTaskForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjTaskFormElementEventMap>(type: K, listener: (this: HTMLTjTaskFormElement, ev: TjTaskFormCustomEvent<HTMLTjTaskFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjTaskFormElementEventMap>(type: K, listener: (this: HTMLTjTaskFormElement, ev: TjTaskFormCustomEvent<HTMLTjTaskFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjTaskFormElement: {
        prototype: HTMLTjTaskFormElement;
        new (): HTMLTjTaskFormElement;
    };
    interface HTMLTjTaskPageElementEventMap {
        "notification": Notification;
    }
    /**
     * Main component that decides whether to show the task timesheet or the new task form.
     */
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
    interface HTMLTjTaskTimesheetElementEventMap {
        "notification": Notification;
        "editTask": void;
    }
    /**
     * A component that displays the timesheet for a given task allowing the user to record hours.
     */
    interface HTMLTjTaskTimesheetElement extends Components.TjTaskTimesheet, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTjTaskTimesheetElementEventMap>(type: K, listener: (this: HTMLTjTaskTimesheetElement, ev: TjTaskTimesheetCustomEvent<HTMLTjTaskTimesheetElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTjTaskTimesheetElementEventMap>(type: K, listener: (this: HTMLTjTaskTimesheetElement, ev: TjTaskTimesheetCustomEvent<HTMLTjTaskTimesheetElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTjTaskTimesheetElement: {
        prototype: HTMLTjTaskTimesheetElement;
        new (): HTMLTjTaskTimesheetElement;
    };
    /**
     * A banner that displays when a new version of the component is available.
     */
    interface HTMLTjUpdateBannerElement extends Components.TjUpdateBanner, HTMLStencilElement {
    }
    var HTMLTjUpdateBannerElement: {
        prototype: HTMLTjUpdateBannerElement;
        new (): HTMLTjUpdateBannerElement;
    };
    interface HTMLElementTagNameMap {
        "contextual-help": HTMLContextualHelpElement;
        "notification-toast": HTMLNotificationToastElement;
        "notifications-provider": HTMLNotificationsProviderElement;
        "tj-edit-task-form": HTMLTjEditTaskFormElement;
        "tj-footer": HTMLTjFooterElement;
        "tj-heading": HTMLTjHeadingElement;
        "tj-jira-panel": HTMLTjJiraPanelElement;
        "tj-login-form": HTMLTjLoginFormElement;
        "tj-new-task-form": HTMLTjNewTaskFormElement;
        "tj-parent-tasks-page": HTMLTjParentTasksPageElement;
        "tj-settings": HTMLTjSettingsElement;
        "tj-task-form": HTMLTjTaskFormElement;
        "tj-task-page": HTMLTjTaskPageElement;
        "tj-task-timesheet": HTMLTjTaskTimesheetElement;
        "tj-update-banner": HTMLTjUpdateBannerElement;
    }
}
declare namespace LocalJSX {
    /**
     * Component providing a button that triggers a popover with contextual help content.
     */
    interface ContextualHelp {
        /**
          * Controls the icon shown in the button.
         */
        "variant": Variant;
    }
    interface NotificationToast {
        "identifier": string;
        "message": string;
        "timeout": number;
        "type": Notification['type'];
    }
    /**
     * The `notifications-provider` component is a provider for notifications. It listens for `notification` events and renders `notification-toast` components for each notification.
     */
    interface NotificationsProvider {
    }
    interface TjEditTaskForm {
        /**
          * Emitted when the form is cancelled.
         */
        "onCancelEditTask"?: (event: TjEditTaskFormCustomEvent<void>) => void;
        /**
          * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
         */
        "onNotification"?: (event: TjEditTaskFormCustomEvent<Notification>) => void;
        /**
          * The task for which to display the edit form.
         */
        "task": Task;
    }
    /**
     * The footer of the panel.
     * Displays the version of the server and the extension and provides a button to open/close the settings.
     */
    interface TjFooter {
        /**
          * Whether the user is logged in. Certain information is only available when logged in.
         */
        "isLoggedIn"?: boolean;
        /**
          * Emitted when the user presses the close settings button.
         */
        "onHideSettings"?: (event: TjFooterCustomEvent<void>) => void;
        /**
          * Emitted when the user presses the settings button.
         */
        "onShowSettings"?: (event: TjFooterCustomEvent<void>) => void;
        /**
          * The version of the script used to inject the panel.
         */
        "scriptVersion"?: string | undefined;
    }
    /**
     * The heading for the TJ panel. It contains the title and a button to toggle the panel.
     */
    interface TjHeading {
        /**
          * Whether the panel is expanded or not. This is used to toggle the icon in the button.
         */
        "isExpanded"?: boolean;
        /**
          * Emitted when the user presses the toggle button. This is used to expand or collapse the panel.
         */
        "onTogglePanel"?: (event: TjHeadingCustomEvent<void>) => void;
    }
    interface TjJiraPanel {
        /**
          * The Jira description of the task.
         */
        "jiraDescription"?: string | undefined;
        /**
          * The Jira ID of the task to display.
         */
        "jiraID": string;
        /**
          * The Jira summary of the task to display.
         */
        "jiraSummary": string;
        /**
          * The version of the script used to inject the panel.
         */
        "scriptVersion"?: string | undefined;
    }
    /**
     * A form to log into TJ.
     */
    interface TjLoginForm {
        /**
          * Emitted when the user logs in.
         */
        "onLogin"?: (event: TjLoginFormCustomEvent<void>) => void;
        /**
          * Emitted when an error occurs. Requires the component to be inside a `notifications-provider`.
         */
        "onNotification"?: (event: TjLoginFormCustomEvent<Notification>) => void;
    }
    /**
     * A form that allows the user to create a new task for the given Jira issue.
     */
    interface TjNewTaskForm {
        /**
          * The Jira description of the task.
         */
        "jiraDescription"?: string | undefined;
        /**
          * The Jira ID of the task.
         */
        "jiraID": string;
        /**
          * The summary of the task.
         */
        "jiraSummary": string;
        /**
          * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
         */
        "onNotification"?: (event: TjNewTaskFormCustomEvent<Notification>) => void;
        /**
          * Emitted when a new task was created.
         */
        "onTaskCreated"?: (event: TjNewTaskFormCustomEvent<Task>) => void;
    }
    interface TjParentTasksPage {
    }
    /**
     * Component for the settings page.
     */
    interface TjSettings {
        /**
          * Whether the user is logged in. Used to determine which settings to show.
         */
        "isLoggedIn"?: boolean;
    }
    interface TjTaskForm {
        "buttonLabel"?: string;
        "description"?: string | undefined;
        "name": string;
        /**
          * Emitted when the form is submitted.
         */
        "onFormSubmit"?: (event: TjTaskFormCustomEvent<TaskFormData>) => void;
        /**
          * Emitted when the form is loaded.
         */
        "onLoaded"?: (event: TjTaskFormCustomEvent<void>) => void;
        /**
          * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
         */
        "onNotification"?: (event: TjTaskFormCustomEvent<Notification>) => void;
        "parentId"?: string | undefined;
        "showDescription"?: boolean;
        "startDate": string;
        "state"?: 'active' | 'closed' | undefined;
    }
    /**
     * Main component that decides whether to show the task timesheet or the new task form.
     */
    interface TjTaskPage {
        /**
          * The Jira description of the task.
         */
        "jiraDescription"?: string | undefined;
        /**
          * The Jira ID of the task.
         */
        "jiraID": string;
        /**
          * The summary of the task.
         */
        "jiraSummary": string;
        /**
          * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
         */
        "onNotification"?: (event: TjTaskPageCustomEvent<Notification>) => void;
    }
    /**
     * A component that displays the timesheet for a given task allowing the user to record hours.
     */
    interface TjTaskTimesheet {
        /**
          * Emitted when the user clicks the edit button.
         */
        "onEditTask"?: (event: TjTaskTimesheetCustomEvent<void>) => void;
        /**
          * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
         */
        "onNotification"?: (event: TjTaskTimesheetCustomEvent<Notification>) => void;
        /**
          * The task for which to display the timesheet.
         */
        "task": Task;
    }
    /**
     * A banner that displays when a new version of the component is available.
     */
    interface TjUpdateBanner {
        /**
          * The version of the script used to inject the panel.
         */
        "scriptVersion"?: string | undefined;
    }
    interface IntrinsicElements {
        "contextual-help": ContextualHelp;
        "notification-toast": NotificationToast;
        "notifications-provider": NotificationsProvider;
        "tj-edit-task-form": TjEditTaskForm;
        "tj-footer": TjFooter;
        "tj-heading": TjHeading;
        "tj-jira-panel": TjJiraPanel;
        "tj-login-form": TjLoginForm;
        "tj-new-task-form": TjNewTaskForm;
        "tj-parent-tasks-page": TjParentTasksPage;
        "tj-settings": TjSettings;
        "tj-task-form": TjTaskForm;
        "tj-task-page": TjTaskPage;
        "tj-task-timesheet": TjTaskTimesheet;
        "tj-update-banner": TjUpdateBanner;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            /**
             * Component providing a button that triggers a popover with contextual help content.
             */
            "contextual-help": LocalJSX.ContextualHelp & JSXBase.HTMLAttributes<HTMLContextualHelpElement>;
            "notification-toast": LocalJSX.NotificationToast & JSXBase.HTMLAttributes<HTMLNotificationToastElement>;
            /**
             * The `notifications-provider` component is a provider for notifications. It listens for `notification` events and renders `notification-toast` components for each notification.
             */
            "notifications-provider": LocalJSX.NotificationsProvider & JSXBase.HTMLAttributes<HTMLNotificationsProviderElement>;
            "tj-edit-task-form": LocalJSX.TjEditTaskForm & JSXBase.HTMLAttributes<HTMLTjEditTaskFormElement>;
            /**
             * The footer of the panel.
             * Displays the version of the server and the extension and provides a button to open/close the settings.
             */
            "tj-footer": LocalJSX.TjFooter & JSXBase.HTMLAttributes<HTMLTjFooterElement>;
            /**
             * The heading for the TJ panel. It contains the title and a button to toggle the panel.
             */
            "tj-heading": LocalJSX.TjHeading & JSXBase.HTMLAttributes<HTMLTjHeadingElement>;
            "tj-jira-panel": LocalJSX.TjJiraPanel & JSXBase.HTMLAttributes<HTMLTjJiraPanelElement>;
            /**
             * A form to log into TJ.
             */
            "tj-login-form": LocalJSX.TjLoginForm & JSXBase.HTMLAttributes<HTMLTjLoginFormElement>;
            /**
             * A form that allows the user to create a new task for the given Jira issue.
             */
            "tj-new-task-form": LocalJSX.TjNewTaskForm & JSXBase.HTMLAttributes<HTMLTjNewTaskFormElement>;
            "tj-parent-tasks-page": LocalJSX.TjParentTasksPage & JSXBase.HTMLAttributes<HTMLTjParentTasksPageElement>;
            /**
             * Component for the settings page.
             */
            "tj-settings": LocalJSX.TjSettings & JSXBase.HTMLAttributes<HTMLTjSettingsElement>;
            "tj-task-form": LocalJSX.TjTaskForm & JSXBase.HTMLAttributes<HTMLTjTaskFormElement>;
            /**
             * Main component that decides whether to show the task timesheet or the new task form.
             */
            "tj-task-page": LocalJSX.TjTaskPage & JSXBase.HTMLAttributes<HTMLTjTaskPageElement>;
            /**
             * A component that displays the timesheet for a given task allowing the user to record hours.
             */
            "tj-task-timesheet": LocalJSX.TjTaskTimesheet & JSXBase.HTMLAttributes<HTMLTjTaskTimesheetElement>;
            /**
             * A banner that displays when a new version of the component is available.
             */
            "tj-update-banner": LocalJSX.TjUpdateBanner & JSXBase.HTMLAttributes<HTMLTjUpdateBannerElement>;
        }
    }
}
