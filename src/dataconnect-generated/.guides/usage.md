# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```

import { injectListSubscriptionTypes } from '@dataconnect/generated/angular';

import { injectCreateUser, injectLogLogin, injectLogLogout, injectCreateSubscription, injectLogVpnConnection, injectLogVpnDisconnection, injectRegisterDevice, injectDeleteDevice, injectUpdateDeviceSeen, injectCreateInvoice } from '@dataconnect/generated/angular';


@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts

  private readonly ListSubscriptionTypesOperation = injectListSubscriptionTypes();

  private readonly CreateUserOperation = injectCreateUser(createUserVars);
  private readonly LogLoginOperation = injectLogLogin(logLoginVars);
  private readonly LogLogoutOperation = injectLogLogout(logLogoutVars);
  private readonly CreateSubscriptionOperation = injectCreateSubscription(createSubscriptionVars);
  private readonly LogVPNConnectionOperation = injectLogVpnConnection(logVpnConnectionVars);
  private readonly LogVPNDisconnectionOperation = injectLogVpnDisconnection(logVpnDisconnectionVars);
  private readonly RegisterDeviceOperation = injectRegisterDevice(registerDeviceVars);
  private readonly DeleteDeviceOperation = injectDeleteDevice(deleteDeviceVars);
  private readonly UpdateDeviceSeenOperation = injectUpdateDeviceSeen(updateDeviceSeenVars);
  private readonly CreateInvoiceOperation = injectCreateInvoice(createInvoiceVars);

  }
```

Each operation is a wrapper function around Tanstack Query Angular.

Here's an example:
```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (movies.isPending()) {
      Loading...
    }
    @if (movies.error()) {
      An error has occurred: {{ movies.error().message }}
    }
    @if (movies.data(); as data) {
      @for (movie of data.movies ; track
        movie.id) {
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      }
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  movies = injectListMovies();
}
```




## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js

import { listSubscriptionTypes } from '@dataconnect/generated';


// Operation ListSubscriptionTypes: 
const { data } = await ListSubscriptionTypes(dataConnect);

import { createUser, logLogin, logLogout, createSubscription, logVpnConnection, logVpnDisconnection, registerDevice, deleteDevice, updateDeviceSeen, createInvoice } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation LogLogin:  For variables, look at type LogLoginVars in ../index.d.ts
const { data } = await LogLogin(dataConnect, logLoginVars);

// Operation LogLogout:  For variables, look at type LogLogoutVars in ../index.d.ts
const { data } = await LogLogout(dataConnect, logLogoutVars);

// Operation CreateSubscription:  For variables, look at type CreateSubscriptionVars in ../index.d.ts
const { data } = await CreateSubscription(dataConnect, createSubscriptionVars);

// Operation LogVPNConnection:  For variables, look at type LogVpnConnectionVars in ../index.d.ts
const { data } = await LogVpnConnection(dataConnect, logVpnConnectionVars);

// Operation LogVPNDisconnection:  For variables, look at type LogVpnDisconnectionVars in ../index.d.ts
const { data } = await LogVpnDisconnection(dataConnect, logVpnDisconnectionVars);

// Operation RegisterDevice:  For variables, look at type RegisterDeviceVars in ../index.d.ts
const { data } = await RegisterDevice(dataConnect, registerDeviceVars);

// Operation DeleteDevice:  For variables, look at type DeleteDeviceVars in ../index.d.ts
const { data } = await DeleteDevice(dataConnect, deleteDeviceVars);

// Operation UpdateDeviceSeen:  For variables, look at type UpdateDeviceSeenVars in ../index.d.ts
const { data } = await UpdateDeviceSeen(dataConnect, updateDeviceSeenVars);

// Operation CreateInvoice:  For variables, look at type CreateInvoiceVars in ../index.d.ts
const { data } = await CreateInvoice(dataConnect, createInvoiceVars);



```