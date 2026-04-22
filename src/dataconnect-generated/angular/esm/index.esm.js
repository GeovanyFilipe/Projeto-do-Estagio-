import { createUserRef, logLoginRef, logLogoutRef, createSubscriptionRef, logVpnConnectionRef, logVpnDisconnectionRef, registerDeviceRef, deleteDeviceRef, updateDeviceSeenRef, createInvoiceRef, listSubscriptionTypesRef, listUserDevicesRef, getUserSubscriptionRef, listConnectionLogsRef, listUserInvoicesRef, listUserSessionsRef, getUserRef, verifyUserRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectLogLogin(args, injector) {
  return injectDataConnectMutation(logLoginRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectLogLogout(args, injector) {
  return injectDataConnectMutation(logLogoutRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateSubscription(args, injector) {
  return injectDataConnectMutation(createSubscriptionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectLogVpnConnection(args, injector) {
  return injectDataConnectMutation(logVpnConnectionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectLogVpnDisconnection(args, injector) {
  return injectDataConnectMutation(logVpnDisconnectionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectRegisterDevice(args, injector) {
  return injectDataConnectMutation(registerDeviceRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteDevice(args, injector) {
  return injectDataConnectMutation(deleteDeviceRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateDeviceSeen(args, injector) {
  return injectDataConnectMutation(updateDeviceSeenRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateInvoice(args, injector) {
  return injectDataConnectMutation(createInvoiceRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListSubscriptionTypes(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listSubscriptionTypesRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUserDevices(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUserDevicesRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetUserSubscription(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getUserSubscriptionRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListConnectionLogs(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listConnectionLogsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUserInvoices(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUserInvoicesRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUserSessions(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUserSessionsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetUser(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getUserRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectVerifyUser(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  verifyUserRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

