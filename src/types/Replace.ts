export type ReplaceWith<T extends {}, O extends keyof T, R> = Omit<T, O> & { O: R }
