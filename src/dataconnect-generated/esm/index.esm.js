import { queryRef, executeQuery, mutationRef, executeMutation, getDataConnect } from 'firebase/data-connect';

// Funções de utilidade locais para evitar dependência de exports internos da Firebase que mudam de nome
function validateArgs(connectorConfig, dcOrVars, vars, varsRequired) {
  const isDC = dcOrVars && (typeof dcOrVars.executeMutation === 'function' || typeof dcOrVars.executeQuery === 'function');
  const dc = isDC ? dcOrVars : getDataConnect(connectorConfig);
  const v = isDC ? vars : dcOrVars;
  return { dc, vars: v };
}

function validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, varsRequired, varsPossible) {
  const isDC = dcOrVars && (typeof dcOrVars.executeMutation === 'function' || typeof dcOrVars.executeQuery === 'function');
  const dc = isDC ? dcOrVars : getDataConnect(connectorConfig);
  let v, opt;
  
  if (isDC) {
    v = varsPossible ? varsOrOptions : undefined;
    opt = options;
  } else {
    v = varsPossible ? dcOrVars : undefined;
    opt = varsOrOptions;
  }
  return { dc, vars: v, options: opt };
}

export const connectorConfig = {
  connector: 'example',
  service: 'projeto-do-estagio-1',
  location: 'europe-west1'
};
export const dataConnectSettings = {
  cacheSettings: {}
};
export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUserRef(dcInstance, inputVars));
}

export const logLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogLogin', inputVars);
}
logLoginRef.operationName = 'LogLogin';

export function logLogin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logLoginRef(dcInstance, inputVars));
}

export const logLogoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogLogout', inputVars);
}
logLogoutRef.operationName = 'LogLogout';

export function logLogout(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logLogoutRef(dcInstance, inputVars));
}

export const createSubscriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubscription', inputVars);
}
createSubscriptionRef.operationName = 'CreateSubscription';

export function createSubscription(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSubscriptionRef(dcInstance, inputVars));
}

export const logVpnConnectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogVPNConnection', inputVars);
}
logVpnConnectionRef.operationName = 'LogVPNConnection';

export function logVpnConnection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logVpnConnectionRef(dcInstance, inputVars));
}

export const logVpnDisconnectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogVPNDisconnection', inputVars);
}
logVpnDisconnectionRef.operationName = 'LogVPNDisconnection';

export function logVpnDisconnection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logVpnDisconnectionRef(dcInstance, inputVars));
}

export const registerDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterDevice', inputVars);
}
registerDeviceRef.operationName = 'RegisterDevice';

export function registerDevice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registerDeviceRef(dcInstance, inputVars));
}

export const deleteDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteDevice', inputVars);
}
deleteDeviceRef.operationName = 'DeleteDevice';

export function deleteDevice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteDeviceRef(dcInstance, inputVars));
}

export const updateDeviceSeenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDeviceSeen', inputVars);
}
updateDeviceSeenRef.operationName = 'UpdateDeviceSeen';

export function updateDeviceSeen(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateDeviceSeenRef(dcInstance, inputVars));
}

export const createInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvoice', inputVars);
}
createInvoiceRef.operationName = 'CreateInvoice';

export function createInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvoiceRef(dcInstance, inputVars));
}

export const listSubscriptionTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSubscriptionTypes');
}
listSubscriptionTypesRef.operationName = 'ListSubscriptionTypes';

export function listSubscriptionTypes(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSubscriptionTypesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listUserDevicesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserDevices', inputVars);
}
listUserDevicesRef.operationName = 'ListUserDevices';

export function listUserDevices(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserDevicesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getUserSubscriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserSubscription', inputVars);
}
getUserSubscriptionRef.operationName = 'GetUserSubscription';

export function getUserSubscription(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserSubscriptionRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listConnectionLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListConnectionLogs', inputVars);
}
listConnectionLogsRef.operationName = 'ListConnectionLogs';

export function listConnectionLogs(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listConnectionLogsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listUserInvoicesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserInvoices', inputVars);
}
listUserInvoicesRef.operationName = 'ListUserInvoices';

export function listUserInvoices(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserInvoicesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listUserSessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserSessions', inputVars);
}
listUserSessionsRef.operationName = 'ListUserSessions';

export function listUserSessions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserSessionsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
