/**
 * Альтернатива нативному {@link document.querySelector}
 * В случае отсутствия элемента на странице генерирует ошибку, вместо возврата null
 * @param selectors - селекторы
 * @param container - контейнер для поиска. По-умолчанию document
 */
export function $<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  container?: Element | Document,
): HTMLElementTagNameMap[K];
export function $<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  container?: Element | Document,
): SVGElementTagNameMap[K];
export function $<E extends Element = Element>(selectors: string, container?: Element | Document): E;
export function $<T extends Element>(selector: string, container: Element | Document = document) {
  const $el = container.querySelector<T>(selector);
  if (!$el) {
    throw new Error(`Элемент с селектором '${selector}' не найден`);
  }
  return $el;
}

/**
 * Альтернатива нативному {@link document.querySelectorAll}
 * В случае отсутствия элемента на странице генерирует ошибку, вместо возврата null
 * @param selectors - селекторы
 * @param container - контейнер для поиска. По-умолчанию document
 */
export function $$<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  container?: Element | Document,
): NodeListOf<HTMLElementTagNameMap[K]>;
export function $$<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  container?: Element | Document,
): NodeListOf<SVGElementTagNameMap[K]>;
export function $$<E extends Element = Element>(selectors: string, container?: Element | Document): NodeListOf<E>;
export function $$<T extends Element>(selector: string, container: Element | Document = document) {
  const $$el = container.querySelectorAll<T>(selector);
  if ($$el.length === 0) {
    throw new Error(`Элементы с селектором '${selector}' не найдены`);
  }
  return $$el;
}
