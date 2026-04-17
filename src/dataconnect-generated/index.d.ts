import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ConnectionLog_Key {
  id: UUIDString;
  __typename?: 'ConnectionLog_Key';
}

export interface ListSubscriptionTypesData {
  subscriptionTypes: ({
    id: UUIDString;
    name: string;
    price: number;
    durationMonths: number;
    maxSpeedMbps: number;
    maxDevices: number;
    description?: string | null;
  } & SubscriptionType_Key)[];
}

export interface Server_Key {
  id: UUIDString;
  __typename?: 'Server_Key';
}

export interface SubscriptionType_Key {
  id: UUIDString;
  __typename?: 'SubscriptionType_Key';
}

export interface UserSubscription_Key {
  id: UUIDString;
  __typename?: 'UserSubscription_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListSubscriptionTypesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSubscriptionTypesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSubscriptionTypesData, undefined>;
  operationName: string;
}
export const listSubscriptionTypesRef: ListSubscriptionTypesRef;

export function listSubscriptionTypes(options?: ExecuteQueryOptions): QueryPromise<ListSubscriptionTypesData, undefined>;
export function listSubscriptionTypes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSubscriptionTypesData, undefined>;

