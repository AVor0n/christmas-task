/** Обертка над LocaleStorage для улучшения типизации и упрощения API */
export class LS extends Storage {
  /**
   * Получить элемент из localeStorage по ключу
   * @param key ключ
   */
  static getItem<T = unknown>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (typeof value === 'string') {
      return JSON.parse(value) as T;
    }
    return value;
  }

  /**
   * Сохранить значение в localeStorage
   * @param key ключ
   * @param value значение
   */
  static setItem<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value.toString());
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
