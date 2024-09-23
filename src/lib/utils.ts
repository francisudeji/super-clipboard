import {
  ClipboardPermissionError,
  ClipboardSupportError,
  CopyImageError,
  CopyTextError,
  PasteImageError,
  PasteTextError,
} from './errors.js';

/**
 * Checks if the Clipboard API is supported by the user's browser.
 * @returns A boolean indicating whether the Clipboard API is supported.
 */
export function isClipboardSupported(): boolean {
  return !!navigator.clipboard;
}

/**
 * Checks if the Permissions API is supported by the user's browser.
 * @returns A boolean indicating whether the Permissions API is supported.
 */
export function isPermissionsSupported(): boolean {
  return !!navigator.permissions;
}

/**
 * Asserts that the Clipboard API is supported by the user's browser.
 * If the Clipboard API is not supported, an error is thrown.
 */
export function assertClipboardSupported(): void {
  if (!isClipboardSupported()) {
    throw new ClipboardSupportError(
      'Clipboard API is not supported. Ensure your browser supports the Clipboard API.',
    );
  }
}

/**
 * Asserts that the Permissions API is supported by the user's browser.
 * If the Permissions API is not supported, an error is thrown.
 */
export function assertPermissionsSupported(): void {
  if (!isPermissionsSupported()) {
    throw new ClipboardPermissionError(
      'Permissions API is not supported. Ensure your browser supports the Permissions API.',
    );
  }
}

/**
 * Copies text to the clipboard.
 * @param text - The text to copy to the clipboard.
 * @returns A promise that resolves when the text is copied.
 */
export async function copyText(text: string): Promise<void> {
  assertClipboardSupported();
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw new CopyTextError(
      'Failed to copy text. Clipboard permissions may not be granted.',
    );
  }
}

/**
 * Reads text from the clipboard.
 * @returns A promise that resolves with the text from the clipboard.
 */
export async function pasteText(): Promise<string> {
  assertClipboardSupported();
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (error) {
    throw new PasteTextError(
      'Failed to paste text. Clipboard permissions may not be granted.',
    );
  }
}

/**
 * Checks if the clipboard permissions are granted.
 * @returns A promise that resolves with the permission state.
 */
export async function checkClipboardPermissions(): Promise<PermissionState> {
  assertPermissionsSupported();
  try {
    const { state } = await navigator.permissions.query({
      name: 'clipboard-read' as PermissionName,
    });
    return state;
  } catch (error) {
    throw new ClipboardPermissionError(
      'Unable to check clipboard permissions. Ensure your browser supports the Permissions API.',
    );
  }
}

/**
 * Copies an image to the clipboard.
 * @param imageBlob - The image Blob to copy to the clipboard.
 * @returns A promise that resolves when the image is copied.
 */
export async function copyImage(imageBlob: Blob): Promise<void> {
  assertClipboardSupported();
  try {
    const clipboardItem = new ClipboardItem({ [imageBlob.type]: imageBlob });
    await navigator.clipboard.write([clipboardItem]);
  } catch (error) {
    throw new CopyImageError(
      'Failed to copy image. Clipboard permissions may not be granted or the format is unsupported.',
    );
  }
}

/**
 * Reads an image from the clipboard.
 * @returns A promise that resolves with the image Blob, or null if no image is available.
 */
export async function pasteImage(): Promise<Blob | null> {
  assertClipboardSupported();
  try {
    const clipboardItems = await navigator.clipboard.read();
    for (const item of clipboardItems) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          const blob = await item.getType(type);
          console.log('Image pasted from clipboard');
          return blob;
        }
      }
    }
    return null;
  } catch (error) {
    throw new PasteImageError(
      'Failed to paste image. Clipboard permissions may not be granted or no image data is present.',
    );
  }
}
