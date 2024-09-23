/**
 * Error classes for clipboard operations.
 * These errors are thrown when clipboard operations fail.
 */

/**
 * Error class for when text cannot be copied to the clipboard.
 * This error is thrown when the text cannot be copied.
 */
export class CopyTextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CopyTextError';
  }
}

/**
 * Error class for when text cannot be pasted from the clipboard.
 * This error is thrown when the text cannot be pasted.
 */
export class PasteTextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasteTextError';
  }
}

/**
 * Error class for when clipboard permissions are denied.
 * This error is thrown when clipboard permissions are denied.
 */
export class ClipboardPermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClipboardPermissionError';
  }
}

/**
 * Error class for when an image cannot be copied to the clipboard.
 * This error is thrown when the image cannot be copied.
 */
export class CopyImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CopyImageError';
  }
}

/**
 * Error class for when an image cannot be pasted from the clipboard.
 * This error is thrown when the image cannot be pasted.
 */
export class PasteImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasteImageError';
  }
}

/**
 * Error class for when clipboard support is not available.
 * This error is thrown when the Clipboard API is not supported.
 */
export class ClipboardSupportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClipboardSupportError';
  }
}
