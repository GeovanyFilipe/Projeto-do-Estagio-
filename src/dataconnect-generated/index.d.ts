import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

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

export interface CreateInvoiceData {
  invoice_insert: Invoice_Key;
}

export interface CreateInvoiceVariables {
  id: UUIDString;
  userId: UUIDString;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  createdAt: TimestampString;
  planName: string;
}

export interface CreateSubscriptionData {
  userSubscription_insert: UserSubscription_Key;
}

export interface CreateSubscriptionVariables {
  userId: UUIDString;
  typeId: UUIDString;
  startDate: TimestampString;
  endDate: TimestampString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  id: UUIDString;
  email: string;
  passwordHash: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: TimestampString;
}

export interface DeleteDeviceData {
  device_delete?: Device_Key | null;
}

export interface DeleteDeviceVariables {
  id: UUIDString;
}

export interface Device_Key {
  id: UUIDString;
  __typename?: 'Device_Key';
}

export interface GetUserSubscriptionData {
  userSubscriptions: ({
    id: UUIDString;
    subscriptionType: {
      name: string;
      maxDevices: number;
      maxSpeedMbps: number;
    };
      startDate: TimestampString;
      endDate: TimestampString;
  } & UserSubscription_Key)[];
}

export interface GetUserSubscriptionVariables {
  userId: UUIDString;
}

export interface Invoice_Key {
  id: UUIDString;
  __typename?: 'Invoice_Key';
}

export interface ListConnectionLogsData {
  connectionLogs: ({
    id: UUIDString;
    server: {
      name: string;
      location: string;
    };
      connectTime: TimestampString;
      disconnectTime?: TimestampString | null;
      dataTransferredGB?: number | null;
  } & ConnectionLog_Key)[];
}

export interface ListConnectionLogsVariables {
  userId: UUIDString;
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

export interface ListUserDevicesData {
  devices: ({
    id: UUIDString;
    deviceName: string;
    ipAddress?: string | null;
    lastSeen: TimestampString;
  } & Device_Key)[];
}

export interface ListUserDevicesVariables {
  userId: UUIDString;
}

export interface ListUserInvoicesData {
  invoices: ({
    id: UUIDString;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: string;
    createdAt: TimestampString;
    planName: string;
  } & Invoice_Key)[];
}

export interface ListUserInvoicesVariables {
  userId: UUIDString;
}

export interface ListUserSessionsData {
  userSessions: ({
    id: UUIDString;
    loginTime: TimestampString;
    logoutTime?: TimestampString | null;
    ipAddress?: string | null;
    userAgent?: string | null;
  } & UserSession_Key)[];
}

export interface ListUserSessionsVariables {
  userId: UUIDString;
}

export interface LogLoginData {
  userSession_insert: UserSession_Key;
}

export interface LogLoginVariables {
  id: UUIDString;
  userId: UUIDString;
  loginTime: TimestampString;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface LogLogoutData {
  userSession_update?: UserSession_Key | null;
}

export interface LogLogoutVariables {
  sessionId: UUIDString;
  logoutTime: TimestampString;
}

export interface LogVpnConnectionData {
  connectionLog_insert: ConnectionLog_Key;
}

export interface LogVpnConnectionVariables {
  userId: UUIDString;
  serverId: UUIDString;
  connectTime: TimestampString;
}

export interface LogVpnDisconnectionData {
  connectionLog_update?: ConnectionLog_Key | null;
}

export interface LogVpnDisconnectionVariables {
  id: UUIDString;
  disconnectTime: TimestampString;
  dataTransferredGB?: number | null;
}

export interface RegisterDeviceData {
  device_insert: Device_Key;
}

export interface RegisterDeviceVariables {
  id: UUIDString;
  userId: UUIDString;
  deviceName: string;
  ipAddress?: string | null;
  lastSeen: TimestampString;
}

export interface Server_Key {
  id: UUIDString;
  __typename?: 'Server_Key';
}

export interface SubscriptionType_Key {
  id: UUIDString;
  __typename?: 'SubscriptionType_Key';
}

export interface UpdateDeviceSeenData {
  device_update?: Device_Key | null;
}

export interface UpdateDeviceSeenVariables {
  id: UUIDString;
  lastSeen: TimestampString;
}

export interface UserSession_Key {
  id: UUIDString;
  __typename?: 'UserSession_Key';
}

export interface UserSubscription_Key {
  id: UUIDString;
  __typename?: 'UserSubscription_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface LogLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogLoginVariables): MutationRef<LogLoginData, LogLoginVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogLoginVariables): MutationRef<LogLoginData, LogLoginVariables>;
  operationName: string;
}
export const logLoginRef: LogLoginRef;

export function logLogin(vars: LogLoginVariables): MutationPromise<LogLoginData, LogLoginVariables>;
export function logLogin(dc: DataConnect, vars: LogLoginVariables): MutationPromise<LogLoginData, LogLoginVariables>;

interface LogLogoutRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogLogoutVariables): MutationRef<LogLogoutData, LogLogoutVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogLogoutVariables): MutationRef<LogLogoutData, LogLogoutVariables>;
  operationName: string;
}
export const logLogoutRef: LogLogoutRef;

export function logLogout(vars: LogLogoutVariables): MutationPromise<LogLogoutData, LogLogoutVariables>;
export function logLogout(dc: DataConnect, vars: LogLogoutVariables): MutationPromise<LogLogoutData, LogLogoutVariables>;

interface CreateSubscriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
  operationName: string;
}
export const createSubscriptionRef: CreateSubscriptionRef;

export function createSubscription(vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;
export function createSubscription(dc: DataConnect, vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;

interface LogVpnConnectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogVpnConnectionVariables): MutationRef<LogVpnConnectionData, LogVpnConnectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogVpnConnectionVariables): MutationRef<LogVpnConnectionData, LogVpnConnectionVariables>;
  operationName: string;
}
export const logVpnConnectionRef: LogVpnConnectionRef;

export function logVpnConnection(vars: LogVpnConnectionVariables): MutationPromise<LogVpnConnectionData, LogVpnConnectionVariables>;
export function logVpnConnection(dc: DataConnect, vars: LogVpnConnectionVariables): MutationPromise<LogVpnConnectionData, LogVpnConnectionVariables>;

interface LogVpnDisconnectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogVpnDisconnectionVariables): MutationRef<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogVpnDisconnectionVariables): MutationRef<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;
  operationName: string;
}
export const logVpnDisconnectionRef: LogVpnDisconnectionRef;

export function logVpnDisconnection(vars: LogVpnDisconnectionVariables): MutationPromise<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;
export function logVpnDisconnection(dc: DataConnect, vars: LogVpnDisconnectionVariables): MutationPromise<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;

interface RegisterDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterDeviceVariables): MutationRef<RegisterDeviceData, RegisterDeviceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegisterDeviceVariables): MutationRef<RegisterDeviceData, RegisterDeviceVariables>;
  operationName: string;
}
export const registerDeviceRef: RegisterDeviceRef;

export function registerDevice(vars: RegisterDeviceVariables): MutationPromise<RegisterDeviceData, RegisterDeviceVariables>;
export function registerDevice(dc: DataConnect, vars: RegisterDeviceVariables): MutationPromise<RegisterDeviceData, RegisterDeviceVariables>;

interface DeleteDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
  operationName: string;
}
export const deleteDeviceRef: DeleteDeviceRef;

export function deleteDevice(vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;
export function deleteDevice(dc: DataConnect, vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;

interface UpdateDeviceSeenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeviceSeenVariables): MutationRef<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDeviceSeenVariables): MutationRef<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;
  operationName: string;
}
export const updateDeviceSeenRef: UpdateDeviceSeenRef;

export function updateDeviceSeen(vars: UpdateDeviceSeenVariables): MutationPromise<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;
export function updateDeviceSeen(dc: DataConnect, vars: UpdateDeviceSeenVariables): MutationPromise<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;

interface CreateInvoiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvoiceVariables): MutationRef<CreateInvoiceData, CreateInvoiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInvoiceVariables): MutationRef<CreateInvoiceData, CreateInvoiceVariables>;
  operationName: string;
}
export const createInvoiceRef: CreateInvoiceRef;

export function createInvoice(vars: CreateInvoiceVariables): MutationPromise<CreateInvoiceData, CreateInvoiceVariables>;
export function createInvoice(dc: DataConnect, vars: CreateInvoiceVariables): MutationPromise<CreateInvoiceData, CreateInvoiceVariables>;

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

interface ListUserDevicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserDevicesVariables): QueryRef<ListUserDevicesData, ListUserDevicesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUserDevicesVariables): QueryRef<ListUserDevicesData, ListUserDevicesVariables>;
  operationName: string;
}
export const listUserDevicesRef: ListUserDevicesRef;

export function listUserDevices(vars: ListUserDevicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserDevicesData, ListUserDevicesVariables>;
export function listUserDevices(dc: DataConnect, vars: ListUserDevicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserDevicesData, ListUserDevicesVariables>;

interface GetUserSubscriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSubscriptionVariables): QueryRef<GetUserSubscriptionData, GetUserSubscriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserSubscriptionVariables): QueryRef<GetUserSubscriptionData, GetUserSubscriptionVariables>;
  operationName: string;
}
export const getUserSubscriptionRef: GetUserSubscriptionRef;

export function getUserSubscription(vars: GetUserSubscriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionData, GetUserSubscriptionVariables>;
export function getUserSubscription(dc: DataConnect, vars: GetUserSubscriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionData, GetUserSubscriptionVariables>;

interface ListConnectionLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListConnectionLogsVariables): QueryRef<ListConnectionLogsData, ListConnectionLogsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListConnectionLogsVariables): QueryRef<ListConnectionLogsData, ListConnectionLogsVariables>;
  operationName: string;
}
export const listConnectionLogsRef: ListConnectionLogsRef;

export function listConnectionLogs(vars: ListConnectionLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListConnectionLogsData, ListConnectionLogsVariables>;
export function listConnectionLogs(dc: DataConnect, vars: ListConnectionLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListConnectionLogsData, ListConnectionLogsVariables>;

interface ListUserInvoicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserInvoicesVariables): QueryRef<ListUserInvoicesData, ListUserInvoicesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUserInvoicesVariables): QueryRef<ListUserInvoicesData, ListUserInvoicesVariables>;
  operationName: string;
}
export const listUserInvoicesRef: ListUserInvoicesRef;

export function listUserInvoices(vars: ListUserInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserInvoicesData, ListUserInvoicesVariables>;
export function listUserInvoices(dc: DataConnect, vars: ListUserInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserInvoicesData, ListUserInvoicesVariables>;

interface ListUserSessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
  operationName: string;
}
export const listUserSessionsRef: ListUserSessionsRef;

export function listUserSessions(vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;
export function listUserSessions(dc: DataConnect, vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;

