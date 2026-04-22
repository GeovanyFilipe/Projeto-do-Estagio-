# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListSubscriptionTypes*](#listsubscriptiontypes)

- [**Mutations**](#mutations)
=======
  - [*ListUserDevices*](#listuserdevices)
  - [*GetUserSubscription*](#getusersubscription)
  - [*ListConnectionLogs*](#listconnectionlogs)
  - [*ListUserInvoices*](#listuserinvoices)
  - [*ListUserSessions*](#listusersessions)
  - [*GetUser*](#getuser)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*LogLogin*](#loglogin)
  - [*LogLogout*](#loglogout)
  - [*CreateSubscription*](#createsubscription)
  - [*LogVPNConnection*](#logvpnconnection)
  - [*LogVPNDisconnection*](#logvpndisconnection)
  - [*RegisterDevice*](#registerdevice)
  - [*DeleteDevice*](#deletedevice)
  - [*UpdateDeviceSeen*](#updatedeviceseen)
  - [*CreateInvoice*](#createinvoice)
>>>>>>> 7cb0d603539b19c13fce02c59ef5c06568f1ec75

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListSubscriptionTypes
You can execute the `ListSubscriptionTypes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSubscriptionTypes(options?: ExecuteQueryOptions): QueryPromise<ListSubscriptionTypesData, undefined>;

interface ListSubscriptionTypesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSubscriptionTypesData, undefined>;
}
export const listSubscriptionTypesRef: ListSubscriptionTypesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSubscriptionTypes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSubscriptionTypesData, undefined>;

interface ListSubscriptionTypesRef {
  ...
  (dc: DataConnect): QueryRef<ListSubscriptionTypesData, undefined>;
}
export const listSubscriptionTypesRef: ListSubscriptionTypesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSubscriptionTypesRef:
```typescript
const name = listSubscriptionTypesRef.operationName;
console.log(name);
```

### Variables
The `ListSubscriptionTypes` query has no variables.
### Return Type
Recall that executing the `ListSubscriptionTypes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSubscriptionTypesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListSubscriptionTypes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSubscriptionTypes } from '@dataconnect/generated';


// Call the `listSubscriptionTypes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSubscriptionTypes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSubscriptionTypes(dataConnect);

console.log(data.subscriptionTypes);

// Or, you can use the `Promise` API.
listSubscriptionTypes().then((response) => {
  const data = response.data;
  console.log(data.subscriptionTypes);
});
```

### Using `ListSubscriptionTypes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSubscriptionTypesRef } from '@dataconnect/generated';


// Call the `listSubscriptionTypesRef()` function to get a reference to the query.
const ref = listSubscriptionTypesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSubscriptionTypesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.subscriptionTypes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.subscriptionTypes);
});
```


# Mutations

No mutations were generated for the `example` connector.

If you want to learn more about how to use mutations in Data Connect, you can follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).
=======
## ListUserDevices
You can execute the `ListUserDevices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserDevices(vars: ListUserDevicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserDevicesData, ListUserDevicesVariables>;

interface ListUserDevicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserDevicesVariables): QueryRef<ListUserDevicesData, ListUserDevicesVariables>;
}
export const listUserDevicesRef: ListUserDevicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserDevices(dc: DataConnect, vars: ListUserDevicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserDevicesData, ListUserDevicesVariables>;

interface ListUserDevicesRef {
  ...
  (dc: DataConnect, vars: ListUserDevicesVariables): QueryRef<ListUserDevicesData, ListUserDevicesVariables>;
}
export const listUserDevicesRef: ListUserDevicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserDevicesRef:
```typescript
const name = listUserDevicesRef.operationName;
console.log(name);
```

### Variables
The `ListUserDevices` query requires an argument of type `ListUserDevicesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUserDevicesVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListUserDevices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserDevicesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserDevicesData {
  devices: ({
    id: UUIDString;
    deviceName: string;
    ipAddress?: string | null;
    lastSeen: TimestampString;
  } & Device_Key)[];
}
```
### Using `ListUserDevices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserDevices, ListUserDevicesVariables } from '@dataconnect/generated';

// The `ListUserDevices` query requires an argument of type `ListUserDevicesVariables`:
const listUserDevicesVars: ListUserDevicesVariables = {
  userId: ..., 
};

// Call the `listUserDevices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserDevices(listUserDevicesVars);
// Variables can be defined inline as well.
const { data } = await listUserDevices({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserDevices(dataConnect, listUserDevicesVars);

console.log(data.devices);

// Or, you can use the `Promise` API.
listUserDevices(listUserDevicesVars).then((response) => {
  const data = response.data;
  console.log(data.devices);
});
```

### Using `ListUserDevices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserDevicesRef, ListUserDevicesVariables } from '@dataconnect/generated';

// The `ListUserDevices` query requires an argument of type `ListUserDevicesVariables`:
const listUserDevicesVars: ListUserDevicesVariables = {
  userId: ..., 
};

// Call the `listUserDevicesRef()` function to get a reference to the query.
const ref = listUserDevicesRef(listUserDevicesVars);
// Variables can be defined inline as well.
const ref = listUserDevicesRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserDevicesRef(dataConnect, listUserDevicesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.devices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.devices);
});
```

## GetUserSubscription
You can execute the `GetUserSubscription` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserSubscription(vars: GetUserSubscriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionData, GetUserSubscriptionVariables>;

interface GetUserSubscriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSubscriptionVariables): QueryRef<GetUserSubscriptionData, GetUserSubscriptionVariables>;
}
export const getUserSubscriptionRef: GetUserSubscriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserSubscription(dc: DataConnect, vars: GetUserSubscriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionData, GetUserSubscriptionVariables>;

interface GetUserSubscriptionRef {
  ...
  (dc: DataConnect, vars: GetUserSubscriptionVariables): QueryRef<GetUserSubscriptionData, GetUserSubscriptionVariables>;
}
export const getUserSubscriptionRef: GetUserSubscriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserSubscriptionRef:
```typescript
const name = getUserSubscriptionRef.operationName;
console.log(name);
```

### Variables
The `GetUserSubscription` query requires an argument of type `GetUserSubscriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserSubscriptionVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserSubscription` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserSubscriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserSubscription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserSubscription, GetUserSubscriptionVariables } from '@dataconnect/generated';

// The `GetUserSubscription` query requires an argument of type `GetUserSubscriptionVariables`:
const getUserSubscriptionVars: GetUserSubscriptionVariables = {
  userId: ..., 
};

// Call the `getUserSubscription()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserSubscription(getUserSubscriptionVars);
// Variables can be defined inline as well.
const { data } = await getUserSubscription({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserSubscription(dataConnect, getUserSubscriptionVars);

console.log(data.userSubscriptions);

// Or, you can use the `Promise` API.
getUserSubscription(getUserSubscriptionVars).then((response) => {
  const data = response.data;
  console.log(data.userSubscriptions);
});
```

### Using `GetUserSubscription`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserSubscriptionRef, GetUserSubscriptionVariables } from '@dataconnect/generated';

// The `GetUserSubscription` query requires an argument of type `GetUserSubscriptionVariables`:
const getUserSubscriptionVars: GetUserSubscriptionVariables = {
  userId: ..., 
};

// Call the `getUserSubscriptionRef()` function to get a reference to the query.
const ref = getUserSubscriptionRef(getUserSubscriptionVars);
// Variables can be defined inline as well.
const ref = getUserSubscriptionRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserSubscriptionRef(dataConnect, getUserSubscriptionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSubscriptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSubscriptions);
});
```

## ListConnectionLogs
You can execute the `ListConnectionLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listConnectionLogs(vars: ListConnectionLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListConnectionLogsData, ListConnectionLogsVariables>;

interface ListConnectionLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListConnectionLogsVariables): QueryRef<ListConnectionLogsData, ListConnectionLogsVariables>;
}
export const listConnectionLogsRef: ListConnectionLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listConnectionLogs(dc: DataConnect, vars: ListConnectionLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListConnectionLogsData, ListConnectionLogsVariables>;

interface ListConnectionLogsRef {
  ...
  (dc: DataConnect, vars: ListConnectionLogsVariables): QueryRef<ListConnectionLogsData, ListConnectionLogsVariables>;
}
export const listConnectionLogsRef: ListConnectionLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listConnectionLogsRef:
```typescript
const name = listConnectionLogsRef.operationName;
console.log(name);
```

### Variables
The `ListConnectionLogs` query requires an argument of type `ListConnectionLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListConnectionLogsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListConnectionLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListConnectionLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListConnectionLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listConnectionLogs, ListConnectionLogsVariables } from '@dataconnect/generated';

// The `ListConnectionLogs` query requires an argument of type `ListConnectionLogsVariables`:
const listConnectionLogsVars: ListConnectionLogsVariables = {
  userId: ..., 
};

// Call the `listConnectionLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listConnectionLogs(listConnectionLogsVars);
// Variables can be defined inline as well.
const { data } = await listConnectionLogs({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listConnectionLogs(dataConnect, listConnectionLogsVars);

console.log(data.connectionLogs);

// Or, you can use the `Promise` API.
listConnectionLogs(listConnectionLogsVars).then((response) => {
  const data = response.data;
  console.log(data.connectionLogs);
});
```

### Using `ListConnectionLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listConnectionLogsRef, ListConnectionLogsVariables } from '@dataconnect/generated';

// The `ListConnectionLogs` query requires an argument of type `ListConnectionLogsVariables`:
const listConnectionLogsVars: ListConnectionLogsVariables = {
  userId: ..., 
};

// Call the `listConnectionLogsRef()` function to get a reference to the query.
const ref = listConnectionLogsRef(listConnectionLogsVars);
// Variables can be defined inline as well.
const ref = listConnectionLogsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listConnectionLogsRef(dataConnect, listConnectionLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.connectionLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.connectionLogs);
});
```

## ListUserInvoices
You can execute the `ListUserInvoices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserInvoices(vars: ListUserInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserInvoicesData, ListUserInvoicesVariables>;

interface ListUserInvoicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserInvoicesVariables): QueryRef<ListUserInvoicesData, ListUserInvoicesVariables>;
}
export const listUserInvoicesRef: ListUserInvoicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserInvoices(dc: DataConnect, vars: ListUserInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserInvoicesData, ListUserInvoicesVariables>;

interface ListUserInvoicesRef {
  ...
  (dc: DataConnect, vars: ListUserInvoicesVariables): QueryRef<ListUserInvoicesData, ListUserInvoicesVariables>;
}
export const listUserInvoicesRef: ListUserInvoicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserInvoicesRef:
```typescript
const name = listUserInvoicesRef.operationName;
console.log(name);
```

### Variables
The `ListUserInvoices` query requires an argument of type `ListUserInvoicesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUserInvoicesVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListUserInvoices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserInvoicesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUserInvoices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserInvoices, ListUserInvoicesVariables } from '@dataconnect/generated';

// The `ListUserInvoices` query requires an argument of type `ListUserInvoicesVariables`:
const listUserInvoicesVars: ListUserInvoicesVariables = {
  userId: ..., 
};

// Call the `listUserInvoices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserInvoices(listUserInvoicesVars);
// Variables can be defined inline as well.
const { data } = await listUserInvoices({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserInvoices(dataConnect, listUserInvoicesVars);

console.log(data.invoices);

// Or, you can use the `Promise` API.
listUserInvoices(listUserInvoicesVars).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `ListUserInvoices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserInvoicesRef, ListUserInvoicesVariables } from '@dataconnect/generated';

// The `ListUserInvoices` query requires an argument of type `ListUserInvoicesVariables`:
const listUserInvoicesVars: ListUserInvoicesVariables = {
  userId: ..., 
};

// Call the `listUserInvoicesRef()` function to get a reference to the query.
const ref = listUserInvoicesRef(listUserInvoicesVars);
// Variables can be defined inline as well.
const ref = listUserInvoicesRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserInvoicesRef(dataConnect, listUserInvoicesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

## ListUserSessions
You can execute the `ListUserSessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserSessions(vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;

interface ListUserSessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
}
export const listUserSessionsRef: ListUserSessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserSessions(dc: DataConnect, vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;

interface ListUserSessionsRef {
  ...
  (dc: DataConnect, vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
}
export const listUserSessionsRef: ListUserSessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserSessionsRef:
```typescript
const name = listUserSessionsRef.operationName;
console.log(name);
```

### Variables
The `ListUserSessions` query requires an argument of type `ListUserSessionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUserSessionsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListUserSessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserSessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserSessionsData {
  userSessions: ({
    id: UUIDString;
    loginTime: TimestampString;
    logoutTime?: TimestampString | null;
    ipAddress?: string | null;
    userAgent?: string | null;
  } & UserSession_Key)[];
}
```
### Using `ListUserSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserSessions, ListUserSessionsVariables } from '@dataconnect/generated';

// The `ListUserSessions` query requires an argument of type `ListUserSessionsVariables`:
const listUserSessionsVars: ListUserSessionsVariables = {
  userId: ..., 
};

// Call the `listUserSessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserSessions(listUserSessionsVars);
// Variables can be defined inline as well.
const { data } = await listUserSessions({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserSessions(dataConnect, listUserSessionsVars);

console.log(data.userSessions);

// Or, you can use the `Promise` API.
listUserSessions(listUserSessionsVars).then((response) => {
  const data = response.data;
  console.log(data.userSessions);
});
```

### Using `ListUserSessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserSessionsRef, ListUserSessionsVariables } from '@dataconnect/generated';

// The `ListUserSessions` query requires an argument of type `ListUserSessionsVariables`:
const listUserSessionsVars: ListUserSessionsVariables = {
  userId: ..., 
};

// Call the `listUserSessionsRef()` function to get a reference to the query.
const ref = listUserSessionsRef(listUserSessionsVars);
// Variables can be defined inline as well.
const ref = listUserSessionsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserSessionsRef(dataConnect, listUserSessionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSessions);
});
```

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query requires an argument of type `GetUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    id: UUIDString;
    email: string;
    firstName?: string | null;
    userSubscriptions_on_user: ({
      subscriptionType: {
        name: string;
      };
    })[];
  } & User_Key;
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser, GetUserVariables } from '@dataconnect/generated';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser(getUserVars);
// Variables can be defined inline as well.
const { data } = await getUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect, getUserVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser(getUserVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef, GetUserVariables } from '@dataconnect/generated';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef(getUserVars);
// Variables can be defined inline as well.
const ref = getUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect, getUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  id: UUIDString;
  email: string;
  passwordHash: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  id: ..., 
  email: ..., 
  passwordHash: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  createdAt: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ id: ..., email: ..., passwordHash: ..., firstName: ..., lastName: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  id: ..., 
  email: ..., 
  passwordHash: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  createdAt: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ id: ..., email: ..., passwordHash: ..., firstName: ..., lastName: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## LogLogin
You can execute the `LogLogin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logLogin(vars: LogLoginVariables): MutationPromise<LogLoginData, LogLoginVariables>;

interface LogLoginRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogLoginVariables): MutationRef<LogLoginData, LogLoginVariables>;
}
export const logLoginRef: LogLoginRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logLogin(dc: DataConnect, vars: LogLoginVariables): MutationPromise<LogLoginData, LogLoginVariables>;

interface LogLoginRef {
  ...
  (dc: DataConnect, vars: LogLoginVariables): MutationRef<LogLoginData, LogLoginVariables>;
}
export const logLoginRef: LogLoginRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logLoginRef:
```typescript
const name = logLoginRef.operationName;
console.log(name);
```

### Variables
The `LogLogin` mutation requires an argument of type `LogLoginVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogLoginVariables {
  id: UUIDString;
  userId: UUIDString;
  loginTime: TimestampString;
  ipAddress?: string | null;
  userAgent?: string | null;
}
```
### Return Type
Recall that executing the `LogLogin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogLoginData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogLoginData {
  userSession_insert: UserSession_Key;
}
```
### Using `LogLogin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logLogin, LogLoginVariables } from '@dataconnect/generated';

// The `LogLogin` mutation requires an argument of type `LogLoginVariables`:
const logLoginVars: LogLoginVariables = {
  id: ..., 
  userId: ..., 
  loginTime: ..., 
  ipAddress: ..., // optional
  userAgent: ..., // optional
};

// Call the `logLogin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logLogin(logLoginVars);
// Variables can be defined inline as well.
const { data } = await logLogin({ id: ..., userId: ..., loginTime: ..., ipAddress: ..., userAgent: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logLogin(dataConnect, logLoginVars);

console.log(data.userSession_insert);

// Or, you can use the `Promise` API.
logLogin(logLoginVars).then((response) => {
  const data = response.data;
  console.log(data.userSession_insert);
});
```

### Using `LogLogin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logLoginRef, LogLoginVariables } from '@dataconnect/generated';

// The `LogLogin` mutation requires an argument of type `LogLoginVariables`:
const logLoginVars: LogLoginVariables = {
  id: ..., 
  userId: ..., 
  loginTime: ..., 
  ipAddress: ..., // optional
  userAgent: ..., // optional
};

// Call the `logLoginRef()` function to get a reference to the mutation.
const ref = logLoginRef(logLoginVars);
// Variables can be defined inline as well.
const ref = logLoginRef({ id: ..., userId: ..., loginTime: ..., ipAddress: ..., userAgent: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logLoginRef(dataConnect, logLoginVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSession_insert);
});
```

## LogLogout
You can execute the `LogLogout` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logLogout(vars: LogLogoutVariables): MutationPromise<LogLogoutData, LogLogoutVariables>;

interface LogLogoutRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogLogoutVariables): MutationRef<LogLogoutData, LogLogoutVariables>;
}
export const logLogoutRef: LogLogoutRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logLogout(dc: DataConnect, vars: LogLogoutVariables): MutationPromise<LogLogoutData, LogLogoutVariables>;

interface LogLogoutRef {
  ...
  (dc: DataConnect, vars: LogLogoutVariables): MutationRef<LogLogoutData, LogLogoutVariables>;
}
export const logLogoutRef: LogLogoutRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logLogoutRef:
```typescript
const name = logLogoutRef.operationName;
console.log(name);
```

### Variables
The `LogLogout` mutation requires an argument of type `LogLogoutVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogLogoutVariables {
  sessionId: UUIDString;
  logoutTime: TimestampString;
}
```
### Return Type
Recall that executing the `LogLogout` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogLogoutData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogLogoutData {
  userSession_update?: UserSession_Key | null;
}
```
### Using `LogLogout`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logLogout, LogLogoutVariables } from '@dataconnect/generated';

// The `LogLogout` mutation requires an argument of type `LogLogoutVariables`:
const logLogoutVars: LogLogoutVariables = {
  sessionId: ..., 
  logoutTime: ..., 
};

// Call the `logLogout()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logLogout(logLogoutVars);
// Variables can be defined inline as well.
const { data } = await logLogout({ sessionId: ..., logoutTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logLogout(dataConnect, logLogoutVars);

console.log(data.userSession_update);

// Or, you can use the `Promise` API.
logLogout(logLogoutVars).then((response) => {
  const data = response.data;
  console.log(data.userSession_update);
});
```

### Using `LogLogout`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logLogoutRef, LogLogoutVariables } from '@dataconnect/generated';

// The `LogLogout` mutation requires an argument of type `LogLogoutVariables`:
const logLogoutVars: LogLogoutVariables = {
  sessionId: ..., 
  logoutTime: ..., 
};

// Call the `logLogoutRef()` function to get a reference to the mutation.
const ref = logLogoutRef(logLogoutVars);
// Variables can be defined inline as well.
const ref = logLogoutRef({ sessionId: ..., logoutTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logLogoutRef(dataConnect, logLogoutVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSession_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSession_update);
});
```

## CreateSubscription
You can execute the `CreateSubscription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSubscription(vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;

interface CreateSubscriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
}
export const createSubscriptionRef: CreateSubscriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSubscription(dc: DataConnect, vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;

interface CreateSubscriptionRef {
  ...
  (dc: DataConnect, vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
}
export const createSubscriptionRef: CreateSubscriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSubscriptionRef:
```typescript
const name = createSubscriptionRef.operationName;
console.log(name);
```

### Variables
The `CreateSubscription` mutation requires an argument of type `CreateSubscriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSubscriptionVariables {
  userId: UUIDString;
  typeId: UUIDString;
  startDate: TimestampString;
  endDate: TimestampString;
}
```
### Return Type
Recall that executing the `CreateSubscription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSubscriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSubscriptionData {
  userSubscription_insert: UserSubscription_Key;
}
```
### Using `CreateSubscription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSubscription, CreateSubscriptionVariables } from '@dataconnect/generated';

// The `CreateSubscription` mutation requires an argument of type `CreateSubscriptionVariables`:
const createSubscriptionVars: CreateSubscriptionVariables = {
  userId: ..., 
  typeId: ..., 
  startDate: ..., 
  endDate: ..., 
};

// Call the `createSubscription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubscription(createSubscriptionVars);
// Variables can be defined inline as well.
const { data } = await createSubscription({ userId: ..., typeId: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSubscription(dataConnect, createSubscriptionVars);

console.log(data.userSubscription_insert);

// Or, you can use the `Promise` API.
createSubscription(createSubscriptionVars).then((response) => {
  const data = response.data;
  console.log(data.userSubscription_insert);
});
```

### Using `CreateSubscription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSubscriptionRef, CreateSubscriptionVariables } from '@dataconnect/generated';

// The `CreateSubscription` mutation requires an argument of type `CreateSubscriptionVariables`:
const createSubscriptionVars: CreateSubscriptionVariables = {
  userId: ..., 
  typeId: ..., 
  startDate: ..., 
  endDate: ..., 
};

// Call the `createSubscriptionRef()` function to get a reference to the mutation.
const ref = createSubscriptionRef(createSubscriptionVars);
// Variables can be defined inline as well.
const ref = createSubscriptionRef({ userId: ..., typeId: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSubscriptionRef(dataConnect, createSubscriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSubscription_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSubscription_insert);
});
```

## LogVPNConnection
You can execute the `LogVPNConnection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logVpnConnection(vars: LogVpnConnectionVariables): MutationPromise<LogVpnConnectionData, LogVpnConnectionVariables>;

interface LogVpnConnectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogVpnConnectionVariables): MutationRef<LogVpnConnectionData, LogVpnConnectionVariables>;
}
export const logVpnConnectionRef: LogVpnConnectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logVpnConnection(dc: DataConnect, vars: LogVpnConnectionVariables): MutationPromise<LogVpnConnectionData, LogVpnConnectionVariables>;

interface LogVpnConnectionRef {
  ...
  (dc: DataConnect, vars: LogVpnConnectionVariables): MutationRef<LogVpnConnectionData, LogVpnConnectionVariables>;
}
export const logVpnConnectionRef: LogVpnConnectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logVpnConnectionRef:
```typescript
const name = logVpnConnectionRef.operationName;
console.log(name);
```

### Variables
The `LogVPNConnection` mutation requires an argument of type `LogVpnConnectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogVpnConnectionVariables {
  userId: UUIDString;
  serverId: UUIDString;
  connectTime: TimestampString;
}
```
### Return Type
Recall that executing the `LogVPNConnection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogVpnConnectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogVpnConnectionData {
  connectionLog_insert: ConnectionLog_Key;
}
```
### Using `LogVPNConnection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logVpnConnection, LogVpnConnectionVariables } from '@dataconnect/generated';

// The `LogVPNConnection` mutation requires an argument of type `LogVpnConnectionVariables`:
const logVpnConnectionVars: LogVpnConnectionVariables = {
  userId: ..., 
  serverId: ..., 
  connectTime: ..., 
};

// Call the `logVpnConnection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logVpnConnection(logVpnConnectionVars);
// Variables can be defined inline as well.
const { data } = await logVpnConnection({ userId: ..., serverId: ..., connectTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logVpnConnection(dataConnect, logVpnConnectionVars);

console.log(data.connectionLog_insert);

// Or, you can use the `Promise` API.
logVpnConnection(logVpnConnectionVars).then((response) => {
  const data = response.data;
  console.log(data.connectionLog_insert);
});
```

### Using `LogVPNConnection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logVpnConnectionRef, LogVpnConnectionVariables } from '@dataconnect/generated';

// The `LogVPNConnection` mutation requires an argument of type `LogVpnConnectionVariables`:
const logVpnConnectionVars: LogVpnConnectionVariables = {
  userId: ..., 
  serverId: ..., 
  connectTime: ..., 
};

// Call the `logVpnConnectionRef()` function to get a reference to the mutation.
const ref = logVpnConnectionRef(logVpnConnectionVars);
// Variables can be defined inline as well.
const ref = logVpnConnectionRef({ userId: ..., serverId: ..., connectTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logVpnConnectionRef(dataConnect, logVpnConnectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.connectionLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.connectionLog_insert);
});
```

## LogVPNDisconnection
You can execute the `LogVPNDisconnection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logVpnDisconnection(vars: LogVpnDisconnectionVariables): MutationPromise<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;

interface LogVpnDisconnectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogVpnDisconnectionVariables): MutationRef<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;
}
export const logVpnDisconnectionRef: LogVpnDisconnectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logVpnDisconnection(dc: DataConnect, vars: LogVpnDisconnectionVariables): MutationPromise<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;

interface LogVpnDisconnectionRef {
  ...
  (dc: DataConnect, vars: LogVpnDisconnectionVariables): MutationRef<LogVpnDisconnectionData, LogVpnDisconnectionVariables>;
}
export const logVpnDisconnectionRef: LogVpnDisconnectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logVpnDisconnectionRef:
```typescript
const name = logVpnDisconnectionRef.operationName;
console.log(name);
```

### Variables
The `LogVPNDisconnection` mutation requires an argument of type `LogVpnDisconnectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogVpnDisconnectionVariables {
  id: UUIDString;
  disconnectTime: TimestampString;
  dataTransferredGB?: number | null;
}
```
### Return Type
Recall that executing the `LogVPNDisconnection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogVpnDisconnectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogVpnDisconnectionData {
  connectionLog_update?: ConnectionLog_Key | null;
}
```
### Using `LogVPNDisconnection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logVpnDisconnection, LogVpnDisconnectionVariables } from '@dataconnect/generated';

// The `LogVPNDisconnection` mutation requires an argument of type `LogVpnDisconnectionVariables`:
const logVpnDisconnectionVars: LogVpnDisconnectionVariables = {
  id: ..., 
  disconnectTime: ..., 
  dataTransferredGB: ..., // optional
};

// Call the `logVpnDisconnection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logVpnDisconnection(logVpnDisconnectionVars);
// Variables can be defined inline as well.
const { data } = await logVpnDisconnection({ id: ..., disconnectTime: ..., dataTransferredGB: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logVpnDisconnection(dataConnect, logVpnDisconnectionVars);

console.log(data.connectionLog_update);

// Or, you can use the `Promise` API.
logVpnDisconnection(logVpnDisconnectionVars).then((response) => {
  const data = response.data;
  console.log(data.connectionLog_update);
});
```

### Using `LogVPNDisconnection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logVpnDisconnectionRef, LogVpnDisconnectionVariables } from '@dataconnect/generated';

// The `LogVPNDisconnection` mutation requires an argument of type `LogVpnDisconnectionVariables`:
const logVpnDisconnectionVars: LogVpnDisconnectionVariables = {
  id: ..., 
  disconnectTime: ..., 
  dataTransferredGB: ..., // optional
};

// Call the `logVpnDisconnectionRef()` function to get a reference to the mutation.
const ref = logVpnDisconnectionRef(logVpnDisconnectionVars);
// Variables can be defined inline as well.
const ref = logVpnDisconnectionRef({ id: ..., disconnectTime: ..., dataTransferredGB: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logVpnDisconnectionRef(dataConnect, logVpnDisconnectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.connectionLog_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.connectionLog_update);
});
```

## RegisterDevice
You can execute the `RegisterDevice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registerDevice(vars: RegisterDeviceVariables): MutationPromise<RegisterDeviceData, RegisterDeviceVariables>;

interface RegisterDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterDeviceVariables): MutationRef<RegisterDeviceData, RegisterDeviceVariables>;
}
export const registerDeviceRef: RegisterDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registerDevice(dc: DataConnect, vars: RegisterDeviceVariables): MutationPromise<RegisterDeviceData, RegisterDeviceVariables>;

interface RegisterDeviceRef {
  ...
  (dc: DataConnect, vars: RegisterDeviceVariables): MutationRef<RegisterDeviceData, RegisterDeviceVariables>;
}
export const registerDeviceRef: RegisterDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registerDeviceRef:
```typescript
const name = registerDeviceRef.operationName;
console.log(name);
```

### Variables
The `RegisterDevice` mutation requires an argument of type `RegisterDeviceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegisterDeviceVariables {
  id: UUIDString;
  userId: UUIDString;
  deviceName: string;
  ipAddress?: string | null;
  lastSeen: TimestampString;
}
```
### Return Type
Recall that executing the `RegisterDevice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegisterDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegisterDeviceData {
  device_insert: Device_Key;
}
```
### Using `RegisterDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registerDevice, RegisterDeviceVariables } from '@dataconnect/generated';

// The `RegisterDevice` mutation requires an argument of type `RegisterDeviceVariables`:
const registerDeviceVars: RegisterDeviceVariables = {
  id: ..., 
  userId: ..., 
  deviceName: ..., 
  ipAddress: ..., // optional
  lastSeen: ..., 
};

// Call the `registerDevice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registerDevice(registerDeviceVars);
// Variables can be defined inline as well.
const { data } = await registerDevice({ id: ..., userId: ..., deviceName: ..., ipAddress: ..., lastSeen: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registerDevice(dataConnect, registerDeviceVars);

console.log(data.device_insert);

// Or, you can use the `Promise` API.
registerDevice(registerDeviceVars).then((response) => {
  const data = response.data;
  console.log(data.device_insert);
});
```

### Using `RegisterDevice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registerDeviceRef, RegisterDeviceVariables } from '@dataconnect/generated';

// The `RegisterDevice` mutation requires an argument of type `RegisterDeviceVariables`:
const registerDeviceVars: RegisterDeviceVariables = {
  id: ..., 
  userId: ..., 
  deviceName: ..., 
  ipAddress: ..., // optional
  lastSeen: ..., 
};

// Call the `registerDeviceRef()` function to get a reference to the mutation.
const ref = registerDeviceRef(registerDeviceVars);
// Variables can be defined inline as well.
const ref = registerDeviceRef({ id: ..., userId: ..., deviceName: ..., ipAddress: ..., lastSeen: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registerDeviceRef(dataConnect, registerDeviceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.device_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.device_insert);
});
```

## DeleteDevice
You can execute the `DeleteDevice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteDevice(vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;

interface DeleteDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
}
export const deleteDeviceRef: DeleteDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteDevice(dc: DataConnect, vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;

interface DeleteDeviceRef {
  ...
  (dc: DataConnect, vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
}
export const deleteDeviceRef: DeleteDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDeviceRef:
```typescript
const name = deleteDeviceRef.operationName;
console.log(name);
```

### Variables
The `DeleteDevice` mutation requires an argument of type `DeleteDeviceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteDeviceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteDevice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDeviceData {
  device_delete?: Device_Key | null;
}
```
### Using `DeleteDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteDevice, DeleteDeviceVariables } from '@dataconnect/generated';

// The `DeleteDevice` mutation requires an argument of type `DeleteDeviceVariables`:
const deleteDeviceVars: DeleteDeviceVariables = {
  id: ..., 
};

// Call the `deleteDevice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteDevice(deleteDeviceVars);
// Variables can be defined inline as well.
const { data } = await deleteDevice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteDevice(dataConnect, deleteDeviceVars);

console.log(data.device_delete);

// Or, you can use the `Promise` API.
deleteDevice(deleteDeviceVars).then((response) => {
  const data = response.data;
  console.log(data.device_delete);
});
```

### Using `DeleteDevice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDeviceRef, DeleteDeviceVariables } from '@dataconnect/generated';

// The `DeleteDevice` mutation requires an argument of type `DeleteDeviceVariables`:
const deleteDeviceVars: DeleteDeviceVariables = {
  id: ..., 
};

// Call the `deleteDeviceRef()` function to get a reference to the mutation.
const ref = deleteDeviceRef(deleteDeviceVars);
// Variables can be defined inline as well.
const ref = deleteDeviceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDeviceRef(dataConnect, deleteDeviceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.device_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.device_delete);
});
```

## UpdateDeviceSeen
You can execute the `UpdateDeviceSeen` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDeviceSeen(vars: UpdateDeviceSeenVariables): MutationPromise<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;

interface UpdateDeviceSeenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeviceSeenVariables): MutationRef<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;
}
export const updateDeviceSeenRef: UpdateDeviceSeenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDeviceSeen(dc: DataConnect, vars: UpdateDeviceSeenVariables): MutationPromise<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;

interface UpdateDeviceSeenRef {
  ...
  (dc: DataConnect, vars: UpdateDeviceSeenVariables): MutationRef<UpdateDeviceSeenData, UpdateDeviceSeenVariables>;
}
export const updateDeviceSeenRef: UpdateDeviceSeenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDeviceSeenRef:
```typescript
const name = updateDeviceSeenRef.operationName;
console.log(name);
```

### Variables
The `UpdateDeviceSeen` mutation requires an argument of type `UpdateDeviceSeenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDeviceSeenVariables {
  id: UUIDString;
  lastSeen: TimestampString;
}
```
### Return Type
Recall that executing the `UpdateDeviceSeen` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDeviceSeenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDeviceSeenData {
  device_update?: Device_Key | null;
}
```
### Using `UpdateDeviceSeen`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDeviceSeen, UpdateDeviceSeenVariables } from '@dataconnect/generated';

// The `UpdateDeviceSeen` mutation requires an argument of type `UpdateDeviceSeenVariables`:
const updateDeviceSeenVars: UpdateDeviceSeenVariables = {
  id: ..., 
  lastSeen: ..., 
};

// Call the `updateDeviceSeen()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDeviceSeen(updateDeviceSeenVars);
// Variables can be defined inline as well.
const { data } = await updateDeviceSeen({ id: ..., lastSeen: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDeviceSeen(dataConnect, updateDeviceSeenVars);

console.log(data.device_update);

// Or, you can use the `Promise` API.
updateDeviceSeen(updateDeviceSeenVars).then((response) => {
  const data = response.data;
  console.log(data.device_update);
});
```

### Using `UpdateDeviceSeen`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDeviceSeenRef, UpdateDeviceSeenVariables } from '@dataconnect/generated';

// The `UpdateDeviceSeen` mutation requires an argument of type `UpdateDeviceSeenVariables`:
const updateDeviceSeenVars: UpdateDeviceSeenVariables = {
  id: ..., 
  lastSeen: ..., 
};

// Call the `updateDeviceSeenRef()` function to get a reference to the mutation.
const ref = updateDeviceSeenRef(updateDeviceSeenVars);
// Variables can be defined inline as well.
const ref = updateDeviceSeenRef({ id: ..., lastSeen: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDeviceSeenRef(dataConnect, updateDeviceSeenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.device_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.device_update);
});
```

## CreateInvoice
You can execute the `CreateInvoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInvoice(vars: CreateInvoiceVariables): MutationPromise<CreateInvoiceData, CreateInvoiceVariables>;

interface CreateInvoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvoiceVariables): MutationRef<CreateInvoiceData, CreateInvoiceVariables>;
}
export const createInvoiceRef: CreateInvoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInvoice(dc: DataConnect, vars: CreateInvoiceVariables): MutationPromise<CreateInvoiceData, CreateInvoiceVariables>;

interface CreateInvoiceRef {
  ...
  (dc: DataConnect, vars: CreateInvoiceVariables): MutationRef<CreateInvoiceData, CreateInvoiceVariables>;
}
export const createInvoiceRef: CreateInvoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInvoiceRef:
```typescript
const name = createInvoiceRef.operationName;
console.log(name);
```

### Variables
The `CreateInvoice` mutation requires an argument of type `CreateInvoiceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateInvoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInvoiceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInvoiceData {
  invoice_insert: Invoice_Key;
}
```
### Using `CreateInvoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInvoice, CreateInvoiceVariables } from '@dataconnect/generated';

// The `CreateInvoice` mutation requires an argument of type `CreateInvoiceVariables`:
const createInvoiceVars: CreateInvoiceVariables = {
  id: ..., 
  userId: ..., 
  amount: ..., 
  currency: ..., 
  paymentMethod: ..., 
  status: ..., 
  createdAt: ..., 
  planName: ..., 
};

// Call the `createInvoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInvoice(createInvoiceVars);
// Variables can be defined inline as well.
const { data } = await createInvoice({ id: ..., userId: ..., amount: ..., currency: ..., paymentMethod: ..., status: ..., createdAt: ..., planName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInvoice(dataConnect, createInvoiceVars);

console.log(data.invoice_insert);

// Or, you can use the `Promise` API.
createInvoice(createInvoiceVars).then((response) => {
  const data = response.data;
  console.log(data.invoice_insert);
});
```

### Using `CreateInvoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInvoiceRef, CreateInvoiceVariables } from '@dataconnect/generated';

// The `CreateInvoice` mutation requires an argument of type `CreateInvoiceVariables`:
const createInvoiceVars: CreateInvoiceVariables = {
  id: ..., 
  userId: ..., 
  amount: ..., 
  currency: ..., 
  paymentMethod: ..., 
  status: ..., 
  createdAt: ..., 
  planName: ..., 
};

// Call the `createInvoiceRef()` function to get a reference to the mutation.
const ref = createInvoiceRef(createInvoiceVars);
// Variables can be defined inline as well.
const ref = createInvoiceRef({ id: ..., userId: ..., amount: ..., currency: ..., paymentMethod: ..., status: ..., createdAt: ..., planName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInvoiceRef(dataConnect, createInvoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoice_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoice_insert);
});



