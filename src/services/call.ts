export type CallerType = <T>(url: string, options?: RequestInit) => Promise<T>;

export function CallPokeAPI<T>(url: string, options?: RequestInit): Promise<T> {
    return fetch(`${process.env.REACT_APP_POKE_API}/${url}`, options).then(r => r && r.json && r.ok && r.json());
}
