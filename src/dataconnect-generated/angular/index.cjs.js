const { createUserRef, logLoginRef, logLogoutRef, createSubscriptionRef, logVpnConnectionRef, logVpnDisconnectionRef, registerDeviceRef, deleteDeviceRef, updateDeviceSeenRef, createInvoiceRef, listSubscriptionTypesRef, listUserDevicesRef, getUserSubscriptionRef, listConnectionLogsRef, listUserInvoicesRef, listUserSessionsRef, getUserRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateUser = function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectLogLogin = function injectLogLogin(args, injector) {
  return injectDataConnectMutation(logLoginRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectLogLogout = function injectLogLogout(args, injector) {
  return injectDataConnectMutation(logLogoutRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateSubscription = function injectCreateSubscription(args, injector) {
  return injectDataConnectMutation(createSubscriptionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectLogVpnConnection = function injectLogVpnConnection(args, injector) {
  return injectDataConnectMutation(logVpnConnectionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectLogVpnDisconnection = function injectLogVpnDisconnection(args, injector) {
  return injectDataConnectMutation(logVpnDisconnectionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectRegisterDevice = function injectRegisterDevice(args, injector) {
  return injectDataConnectMutation(registerDeviceRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteDevice = function injectDeleteDevice(args, injector) {
  return injectDataConnectMutation(deleteDeviceRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateDeviceSeen = function injectUpdateDeviceSeen(args, injector) {
  return injectDataConnectMutation(updateDeviceSeenRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateInvoice = function injectCreateInvoice(args, injector) {
  return injectDataConnectMutation(createInvoiceRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}


exports.injectListSubscriptionTypes = function injectListSubscriptionTypes(options, injector) {
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



exports.injectListUserDevices = function injectListUserDevices(args, options, injector) {
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

exports.injectGetUserSubscription = function injectGetUserSubscription(args, options, injector) {
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

exports.injectListConnectionLogs = function injectListConnectionLogs(args, options, injector) {
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

exports.injectListUserInvoices = function injectListUserInvoices(args, options, injector) {
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

exports.injectListUserSessions = function injectListUserSessions(args, options, injector) {
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

exports.injectGetUser = function injectGetUser(args, options, injector) {
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

