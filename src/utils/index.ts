export function debounce(func: (...args: any[]) => void, wait: number, immediate = false): () => void {
    let timeout: NodeJS.Timeout | undefined;
    return function(...args): void {
        const later = (): void => {
            timeout && clearTimeout(timeout);
            timeout = undefined;
            if (!immediate) func(args);
        };
        const callNow = immediate && !timeout;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(args);
    };
}
