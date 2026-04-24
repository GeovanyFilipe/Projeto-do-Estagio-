import { CreateUserData, CreateUserVariables, LogLoginData, LogLoginVariables, LogLogoutData, LogLogoutVariables, CreateSubscriptionData, CreateSubscriptionVariables, LogVpnConnectionData, LogVpnConnectionVariables, LogVpnDisconnectionData, LogVpnDisconnectionVariables, RegisterDeviceData, RegisterDeviceVariables, DeleteDeviceData, DeleteDeviceVariables, UpdateDeviceSeenData, UpdateDeviceSeenVariables, CreateInvoiceData, CreateInvoiceVariables, ListSubscriptionTypesData, ListUserDevicesData, ListUserDevicesVariables, GetUserSubscriptionData, GetUserSubscriptionVariables, ListConnectionLogsData, ListConnectionLogsVariables, ListUserInvoicesData, ListUserInvoicesVariables, ListUserSessionsData, ListUserSessionsVariables, GetUserData, GetUserVariables, VerifyUserData, VerifyUserVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateUserOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateUserData, FirebaseError, CreateUserVariables>;
export function injectCreateUser(options?: CreateUserOptions, injector?: Injector): CreateDataConnectMutationResult<CreateUserData, CreateUserVariables, CreateUserVariables>;

type LogLoginOptions = DataConnectMutationOptionsUndefinedMutationFn<LogLoginData, FirebaseError, LogLoginVariables>;
export function injectLogLogin(options?: LogLoginOptions, injector?: Injector): CreateDataConnectMutationResult<LogLoginData, LogLoginVariables, LogLoginVariables>;

type LogLogoutOptions = DataConnectMutationOptionsUndefinedMutationFn<LogLogoutData, FirebaseError, LogLogoutVariables>;
export function injectLogLogout(options?: LogLogoutOptions, injector?: Injector): CreateDataConnectMutationResult<LogLogoutData, LogLogoutVariables, LogLogoutVariables>;

type CreateSubscriptionOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateSubscriptionData, FirebaseError, CreateSubscriptionVariables>;
export function injectCreateSubscription(options?: CreateSubscriptionOptions, injector?: Injector): CreateDataConnectMutationResult<CreateSubscriptionData, CreateSubscriptionVariables, CreateSubscriptionVariables>;

type LogVpnConnectionOptions = DataConnectMutationOptionsUndefinedMutationFn<LogVpnConnectionData, FirebaseError, LogVpnConnectionVariables>;
export function injectLogVpnConnection(options?: LogVpnConnectionOptions, injector?: Injector): CreateDataConnectMutationResult<LogVpnConnectionData, LogVpnConnectionVariables, LogVpnConnectionVariables>;

type LogVpnDisconnectionOptions = DataConnectMutationOptionsUndefinedMutationFn<LogVpnDisconnectionData, FirebaseError, LogVpnDisconnectionVariables>;
export function injectLogVpnDisconnection(options?: LogVpnDisconnectionOptions, injector?: Injector): CreateDataConnectMutationResult<LogVpnDisconnectionData, LogVpnDisconnectionVariables, LogVpnDisconnectionVariables>;

type RegisterDeviceOptions = DataConnectMutationOptionsUndefinedMutationFn<RegisterDeviceData, FirebaseError, RegisterDeviceVariables>;
export function injectRegisterDevice(options?: RegisterDeviceOptions, injector?: Injector): CreateDataConnectMutationResult<RegisterDeviceData, RegisterDeviceVariables, RegisterDeviceVariables>;

type DeleteDeviceOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteDeviceData, FirebaseError, DeleteDeviceVariables>;
export function injectDeleteDevice(options?: DeleteDeviceOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteDeviceData, DeleteDeviceVariables, DeleteDeviceVariables>;

type UpdateDeviceSeenOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateDeviceSeenData, FirebaseError, UpdateDeviceSeenVariables>;
export function injectUpdateDeviceSeen(options?: UpdateDeviceSeenOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateDeviceSeenData, UpdateDeviceSeenVariables, UpdateDeviceSeenVariables>;

type CreateInvoiceOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateInvoiceData, FirebaseError, CreateInvoiceVariables>;
export function injectCreateInvoice(options?: CreateInvoiceOptions, injector?: Injector): CreateDataConnectMutationResult<CreateInvoiceData, CreateInvoiceVariables, CreateInvoiceVariables>;

export type ListSubscriptionTypesOptions = () => Omit<CreateDataConnectQueryOptions<ListSubscriptionTypesData, undefined>, 'queryFn'>;
export function injectListSubscriptionTypes(options?: ListSubscriptionTypesOptions, injector?: Injector): CreateDataConnectQueryResult<ListSubscriptionTypesData, undefined>;

type ListUserDevicesArgs = ListUserDevicesVariables | (() => ListUserDevicesVariables);
export type ListUserDevicesOptions = () => Omit<CreateDataConnectQueryOptions<ListUserDevicesData, ListUserDevicesVariables>, 'queryFn'>;
export function injectListUserDevices(args: ListUserDevicesArgs, options?: ListUserDevicesOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserDevicesData, ListUserDevicesVariables>;

type GetUserSubscriptionArgs = GetUserSubscriptionVariables | (() => GetUserSubscriptionVariables);
export type GetUserSubscriptionOptions = () => Omit<CreateDataConnectQueryOptions<GetUserSubscriptionData, GetUserSubscriptionVariables>, 'queryFn'>;
export function injectGetUserSubscription(args: GetUserSubscriptionArgs, options?: GetUserSubscriptionOptions, injector?: Injector): CreateDataConnectQueryResult<GetUserSubscriptionData, GetUserSubscriptionVariables>;

type ListConnectionLogsArgs = ListConnectionLogsVariables | (() => ListConnectionLogsVariables);
export type ListConnectionLogsOptions = () => Omit<CreateDataConnectQueryOptions<ListConnectionLogsData, ListConnectionLogsVariables>, 'queryFn'>;
export function injectListConnectionLogs(args: ListConnectionLogsArgs, options?: ListConnectionLogsOptions, injector?: Injector): CreateDataConnectQueryResult<ListConnectionLogsData, ListConnectionLogsVariables>;

type ListUserInvoicesArgs = ListUserInvoicesVariables | (() => ListUserInvoicesVariables);
export type ListUserInvoicesOptions = () => Omit<CreateDataConnectQueryOptions<ListUserInvoicesData, ListUserInvoicesVariables>, 'queryFn'>;
export function injectListUserInvoices(args: ListUserInvoicesArgs, options?: ListUserInvoicesOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserInvoicesData, ListUserInvoicesVariables>;

type ListUserSessionsArgs = ListUserSessionsVariables | (() => ListUserSessionsVariables);
export type ListUserSessionsOptions = () => Omit<CreateDataConnectQueryOptions<ListUserSessionsData, ListUserSessionsVariables>, 'queryFn'>;
export function injectListUserSessions(args: ListUserSessionsArgs, options?: ListUserSessionsOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserSessionsData, ListUserSessionsVariables>;

type GetUserArgs = GetUserVariables | (() => GetUserVariables);
export type GetUserOptions = () => Omit<CreateDataConnectQueryOptions<GetUserData, GetUserVariables>, 'queryFn'>;
export function injectGetUser(args: GetUserArgs, options?: GetUserOptions, injector?: Injector): CreateDataConnectQueryResult<GetUserData, GetUserVariables>;

type VerifyUserArgs = VerifyUserVariables | (() => VerifyUserVariables);
export type VerifyUserOptions = () => Omit<CreateDataConnectQueryOptions<VerifyUserData, VerifyUserVariables>, 'queryFn'>;
export function injectVerifyUser(args: VerifyUserArgs, options?: VerifyUserOptions, injector?: Injector): CreateDataConnectQueryResult<VerifyUserData, VerifyUserVariables>;
