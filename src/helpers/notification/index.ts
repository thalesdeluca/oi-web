import { notification } from "antd";

export default class Notification {
  static success(title: string, message: string) {
    Notification.notify('success', title, message)
  }

  static info(title: string, message: string) {
    Notification.notify('success', title, message)
  }

  static warning(title: string, message: string) {
    Notification.notify('warning', title, message)
  }

  static error(title: string, message: string) {
    Notification.notify('error', title, message)
  }

  static notify(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    notification[type]({
      message: title,
      description: message
    })
  }
}
