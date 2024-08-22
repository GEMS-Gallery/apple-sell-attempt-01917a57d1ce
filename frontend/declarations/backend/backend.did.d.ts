import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Product {
  'id' : bigint,
  'features' : Array<string>,
  'name' : string,
  'description' : string,
  'specs' : Array<[string, string]>,
  'price' : bigint,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'addProduct' : ActorMethod<
    [string, string, bigint, Array<string>, Array<[string, string]>],
    bigint
  >,
  'getAllProducts' : ActorMethod<[], Array<Product>>,
  'getProduct' : ActorMethod<[bigint], [] | [Product]>,
  'updateProduct' : ActorMethod<
    [bigint, string, string, bigint, Array<string>, Array<[string, string]>],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
