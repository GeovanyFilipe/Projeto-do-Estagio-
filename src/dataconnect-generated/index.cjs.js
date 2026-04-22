const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'projeto-do-estagio-1',
  location: 'europe-west1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUserRef(dcInstance, inputVars));
}
;

const logLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogLogin', inputVars);
}
logLoginRef.operationName = 'LogLogin';
exports.logLoginRef = logLoginRef;

exports.logLogin = function logLogin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logLoginRef(dcInstance, inputVars));
}
;

const logLogoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogLogout', inputVars);
}
logLogoutRef.operationName = 'LogLogout';
exports.logLogoutRef = logLogoutRef;

exports.logLogout = function logLogout(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logLogoutRef(dcInstance, inputVars));
}
;

const createSubscriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubscription', inputVars);
}
createSubscriptionRef.operationName = 'CreateSubscription';
exports.createSubscriptionRef = createSubscriptionRef;

exports.createSubscription = function createSubscription(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSubscriptionRef(dcInstance, inputVars));
}
;

const logVpnConnectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogVPNConnection', inputVars);
}
logVpnConnectionRef.operationName = 'LogVPNConnection';
exports.logVpnConnectionRef = logVpnConnectionRef;

exports.logVpnConnection = function logVpnConnection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logVpnConnectionRef(dcInstance, inputVars));
}
;

const logVpnDisconnectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogVPNDisconnection', inputVars);
}
logVpnDisconnectionRef.operationName = 'LogVPNDisconnection';
exports.logVpnDisconnectionRef = logVpnDisconnectionRef;

exports.logVpnDisconnection = function logVpnDisconnection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logVpnDisconnectionRef(dcInstance, inputVars));
}
;

const registerDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterDevice', inputVars);
}
registerDeviceRef.operationName = 'RegisterDevice';
exports.registerDeviceRef = registerDeviceRef;

exports.registerDevice = function registerDevice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registerDeviceRef(dcInstance, inputVars));
}
;

const deleteDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteDevice', inputVars);
}
deleteDeviceRef.operationName = 'DeleteDevice';
exports.deleteDeviceRef = deleteDeviceRef;

exports.deleteDevice = function deleteDevice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteDeviceRef(dcInstance, inputVars));
}
;

const updateDeviceSeenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDeviceSeen', inputVars);
}
updateDeviceSeenRef.operationName = 'UpdateDeviceSeen';
exports.updateDeviceSeenRef = updateDeviceSeenRef;

exports.updateDeviceSeen = function updateDeviceSeen(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateDeviceSeenRef(dcInstance, inputVars));
}
;

const createInvoiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvoice', inputVars);
}
createInvoiceRef.operationName = 'CreateInvoice';
exports.createInvoiceRef = createInvoiceRef;

exports.createInvoice = function createInvoice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvoiceRef(dcInstance, inputVars));
}
;

const listSubscriptionTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSubscriptionTypes');
}
listSubscriptionTypesRef.operationName = 'ListSubscriptionTypes';
exports.listSubscriptionTypesRef = listSubscriptionTypesRef;

exports.listSubscriptionTypes = function listSubscriptionTypes(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSubscriptionTypesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listUserDevicesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserDevices', inputVars);
}
listUserDevicesRef.operationName = 'ListUserDevices';
exports.listUserDevicesRef = listUserDevicesRef;

exports.listUserDevices = function listUserDevices(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserDevicesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getUserSubscriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserSubscription', inputVars);
}
getUserSubscriptionRef.operationName = 'GetUserSubscription';
exports.getUserSubscriptionRef = getUserSubscriptionRef;

exports.getUserSubscription = function getUserSubscription(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserSubscriptionRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listConnectionLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListConnectionLogs', inputVars);
}
listConnectionLogsRef.operationName = 'ListConnectionLogs';
exports.listConnectionLogsRef = listConnectionLogsRef;

exports.listConnectionLogs = function listConnectionLogs(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listConnectionLogsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listUserInvoicesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserInvoices', inputVars);
}
listUserInvoicesRef.operationName = 'ListUserInvoices';
exports.listUserInvoicesRef = listUserInvoicesRef;

exports.listUserInvoices = function listUserInvoices(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserInvoicesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listUserSessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserSessions', inputVars);
}
listUserSessionsRef.operationName = 'ListUserSessions';
exports.listUserSessionsRef = listUserSessionsRef;

exports.listUserSessions = function listUserSessions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUserSessionsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser', inputVars);
}
getUserRef.operationName = 'GetUser';
exports.getUserRef = getUserRef;

exports.getUser = function getUser(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
