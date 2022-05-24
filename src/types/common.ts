import { Observable } from 'rxjs'
import { EntityMap } from './entities'

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

export function isDefined<T>(value: T): boolean {
  return value !== undefined && value !== null
}

export type Parameter<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P[0] : never

export type OrderBy<T extends string> = `${T}` | `${T} desc`

export type ListRequestProps = { pageSize?: number; /* url-safe base64 */ pageToken?: string }
export type ListResponseProps<T> = { pageSize: number; nextPageToken: string; entities: T[] }

export type Get<Entity extends keyof EntityMap, Request = { id: string }, Response = EntityMap[Entity]> = {
  [K in Entity as `Get${K}`]: (request: Request) => Observable<Response>
}

export type List<
  Entity extends keyof EntityMap,
  Request extends ListRequestProps = ListRequestProps,
  Response extends ListResponseProps<Omit<EntityMap[Entity], 'username'>> = ListResponseProps<EntityMap[Entity]>
> = { [K in Entity as `List${K}s`]: (request: Request) => Observable<Response> }

export type Create<
  Entity extends keyof EntityMap,
  Request = Omit<EntityMap[Entity], 'id'>,
  Response = EntityMap[Entity]
> = { [K in Entity as `Create${K}`]: (request: Request) => Observable<Response> }

export type Remove<Entity extends keyof EntityMap, Request = { id: string }, Response = EntityMap[Entity]> = {
  [K in Entity as `Remove${K}`]: (request: Request) => Observable<Response>
}

export type Update<
  Entity extends keyof EntityMap,
  Request = RequireAtLeastOne<EntityMap[Entity]>,
  Response = EntityMap[Entity]
> = { [K in Entity as `Update${K}`]: (request: Request) => Observable<Response> }

export type BatchGet<
  Entity extends keyof EntityMap,
  Request = { ids: EntityMap[Entity]['username'][] },
  Response = EntityMap[Entity][]
> = { [K in Entity as `BatchGet${K}s`]: (request: Request) => Observable<Response> }
