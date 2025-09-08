/**
 * A decorator that marks a class as available to be provided and injected as a dependency.
 * In the current DI setup, this decorator is purely for marking and readability,
 * as the actual registration is handled manually in `src/main/di.ts`.
 */
export function Injectable(): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (target) => {
    // This decorator is intentionally left empty.
    // The DI container (`src/main/di.ts`) handles the registration of all providers.
  };
}
