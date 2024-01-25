import type { ColumnType } from "kysely";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<
  string,
  bigint | number | string,
  bigint | number | string
>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Casts {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  embeds: Generated<Json>;
  fid: Int8;
  hash: Buffer;
  id: Generated<string>;
  mentions: Generated<Json>;
  mentions_positions: Generated<Json>;
  parent_fid: Int8 | null;
  parent_hash: Buffer | null;
  parent_url: string | null;
  root_parent_hash: Buffer | null;
  root_parent_url: string | null;
  text: string;
  timestamp: Timestamp;
  updated_at: Generated<Timestamp>;
}

export interface ChainEvents {
  block_hash: Buffer;
  block_number: Int8;
  block_timestamp: Timestamp;
  body: Json;
  chain_id: Int8;
  created_at: Generated<Timestamp>;
  fid: Int8;
  id: Generated<string>;
  log_index: number;
  raw: Buffer;
  transaction_hash: Buffer;
  transaction_index: number;
  type: number;
}

export interface Fids {
  chain_event_id: string;
  created_at: Generated<Timestamp>;
  custody_address: Buffer;
  fid: Int8;
  recovery_address: Buffer;
  registered_at: Timestamp;
  updated_at: Generated<Timestamp>;
}

export interface Fnames {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  fid: Int8;
  id: Generated<string>;
  registered_at: Timestamp;
  type: number;
  updated_at: Generated<Timestamp>;
  username: string;
}

export interface Links {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  display_timestamp: Timestamp | null;
  fid: Int8;
  hash: Buffer;
  id: Generated<string>;
  target_fid: Int8;
  timestamp: Timestamp;
  type: string;
  updated_at: Generated<Timestamp>;
}

export interface Messages {
  body: Json;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  fid: Int8;
  hash: Buffer;
  hash_scheme: number;
  id: Generated<string>;
  pruned_at: Timestamp | null;
  raw: Buffer;
  revoked_at: Timestamp | null;
  signature: Buffer;
  signature_scheme: number;
  signer: Buffer;
  timestamp: Timestamp;
  type: number;
  updated_at: Generated<Timestamp>;
}

export interface Reactions {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  fid: Int8;
  hash: Buffer;
  id: Generated<string>;
  target_cast_fid: Int8 | null;
  target_cast_hash: Buffer | null;
  target_url: string | null;
  timestamp: Timestamp;
  type: number;
  updated_at: Generated<Timestamp>;
}

export interface Signers {
  add_chain_event_id: string;
  added_at: Timestamp;
  created_at: Generated<Timestamp>;
  fid: Int8;
  id: Generated<string>;
  key: Buffer;
  key_type: number;
  metadata: Json;
  metadata_type: number;
  remove_chain_event_id: string | null;
  removed_at: Timestamp | null;
  requester_fid: Int8;
  updated_at: Generated<Timestamp>;
}

export interface StorageAllocations {
  chain_event_id: string;
  created_at: Generated<Timestamp>;
  expires_at: Timestamp;
  fid: Int8;
  id: Generated<string>;
  payer: Buffer;
  rented_at: Timestamp;
  units: number;
  updated_at: Generated<Timestamp>;
}

export interface UserData {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  fid: Int8;
  hash: Buffer;
  id: Generated<string>;
  timestamp: Timestamp;
  type: number;
  updated_at: Generated<Timestamp>;
  value: string;
}

export interface UsernameProofs {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  fid: Int8;
  id: Generated<string>;
  owner: Buffer;
  signature: Buffer;
  timestamp: Timestamp;
  type: number;
  updated_at: Generated<Timestamp>;
  username: string;
}

export interface Verifications {
  block_hash: Buffer;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  fid: Int8;
  hash: Buffer;
  id: Generated<string>;
  signature: Buffer;
  signer_address: Buffer;
  timestamp: Timestamp;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  casts: Casts;
  chain_events: ChainEvents;
  fids: Fids;
  fnames: Fnames;
  links: Links;
  messages: Messages;
  reactions: Reactions;
  signers: Signers;
  storage_allocations: StorageAllocations;
  user_data: UserData;
  username_proofs: UsernameProofs;
  verifications: Verifications;
}
