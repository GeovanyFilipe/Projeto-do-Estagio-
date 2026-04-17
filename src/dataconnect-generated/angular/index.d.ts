import { ListSubscriptionTypesData } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions} from '@angular/fire/data-connect';
import { CreateQueryResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

export type ListSubscriptionTypesOptions = () => Omit<CreateDataConnectQueryOptions<ListSubscriptionTypesData, undefined>, 'queryFn'>;
export function injectListSubscriptionTypes(options?: ListSubscriptionTypesOptions, injector?: Injector): CreateDataConnectQueryResult<ListSubscriptionTypesData, undefined>;
