import { ConstructorClass } from 'src/shared/types/Constructor';

export class Registry {
    private static instance: Registry | undefined;

    static getInstance() {
        if (!this.instance) {
            this.instance = new Registry();
        }
        return this.instance;
    }

    private constructor() {}
    private readonly providers = new Map<any, Registry.Provider>();

    /**
     * Registers a provider with the DI container.
     * @param token The token to identify the dependency (e.g., 'IUserRepository' or a class like GetUserUseCase).
     * @param impl The concrete class to instantiate.
     * @param dependencyTokens Optional: An array of tokens for the constructor dependencies of the `impl`.
     *                         This is crucial when dependencies are interfaces, as type information is lost at runtime.
     */
    register(token: any, impl: ConstructorClass, dependencyTokens: any[] = []) {
        if (this.providers.has(token)) {
            // eslint-disable-next-line no-console
            console.warn(
                `Provider with token "${String(token)}" is already registered. Overwriting.`,
            );
        }

        // If dependency tokens are not manually provided, try to infer them from metadata.
        // This works for concrete class dependencies but not for interfaces.
        const deps =
            dependencyTokens.length > 0
                ? dependencyTokens
                : (Reflect.getMetadata('design:paramtypes', impl) ?? []);

        this.providers.set(token, { impl, deps });
    }

    /**
     * Resolves a dependency by its token.
     * @param token The token of the provider to resolve.
     * @returns An instance of the resolved provider.
     */
    resolver<T>(token: any): T {
        const provider = this.providers.get(token);

        if (!provider) {
            throw new Error(`Provider with token "${String(token)}" is not registered.`);
        }

        // Resolve all dependency tokens into instances recursively.
        const deps = provider.deps.map((depToken) => this.resolver(depToken));

        const instance = new provider.impl(...deps);
        return instance as T;
    }
}

export namespace Registry {
    export type Provider = {
        impl: ConstructorClass;
        deps: any[]; // Stores tokens of the dependencies
    };
}
