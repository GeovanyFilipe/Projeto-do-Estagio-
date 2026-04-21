const {
  queryRef,
  executeQuery,
  mutationRef,
  executeMutation,
  getDataConnect
} = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'projeto-do-estagio-1',
  location: 'europe-west1'
};

exports.connectorConfig = connectorConfig;

// =======================
// UTILITÁRIOS
// =======================

function validateArgs(connectorConfig, dcOrVars, vars) {
  const isDC =
    dcOrVars &&
    (typeof dcOrVars.executeMutation === 'function' ||
      typeof dcOrVars.executeQuery === 'function');

  const dc = isDC ? dcOrVars : getDataConnect(connectorConfig);
  const v = isDC ? vars : dcOrVars;

  return { dc, vars: v };
}

function validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options) {
  const isDC =
    dcOrVars &&
    (typeof dcOrVars.executeMutation === 'function' ||
      typeof dcOrVars.executeQuery === 'function');

  const dc = isDC ? dcOrVars : getDataConnect(connectorConfig);

  let vars, opts;

  if (isDC) {
    vars = undefined;
    opts = options;
  } else {
    vars = dcOrVars;
    opts = varsOrOptions;
  }

  return { dc, vars, options: opts };
}

// =======================
// MUTATIONS
// =======================

const createUserRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return mutationRef(instance, 'CreateUser', inputVars);
};

exports.createUser = (dc, vars) =>
  executeMutation(createUserRef(dc, vars));

const logLoginRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return mutationRef(instance, 'LogLogin', inputVars);
};

exports.logLogin = (dc, vars) =>
  executeMutation(logLoginRef(dc, vars));

const logLogoutRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return mutationRef(instance, 'LogLogout', inputVars);
};

exports.logLogout = (dc, vars) =>
  executeMutation(logLogoutRef(dc, vars));

const createSubscriptionRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return mutationRef(instance, 'CreateSubscription', inputVars);
};

exports.createSubscription = (dc, vars) =>
  executeMutation(createSubscriptionRef(dc, vars));

const createInvoiceRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return mutationRef(instance, 'CreateInvoice', inputVars);
};

exports.createInvoice = (dc, vars) =>
  executeMutation(createInvoiceRef(dc, vars));

// =======================
// QUERIES
// =======================

const listSubscriptionTypesRef = (dc) => {
  const instance = getDataConnect(connectorConfig);
  instance._useGeneratedSdk();
  return queryRef(instance, 'ListSubscriptionTypes');
};

exports.listSubscriptionTypes = (dcOrOptions, options) => {
  const { dc: instance } = validateArgsWithOptions(connectorConfig, dcOrOptions, options);
  return executeQuery(listSubscriptionTypesRef(instance), options?.fetchPolicy);
};

const getUserSubscriptionRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return queryRef(instance, 'GetUserSubscription', inputVars);
};

exports.getUserSubscription = (dc, vars) =>
  executeQuery(getUserSubscriptionRef(dc, vars));

const listConnectionLogsRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return queryRef(instance, 'ListConnectionLogs', inputVars);
};

exports.listConnectionLogs = (dc, vars) =>
  executeQuery(listConnectionLogsRef(dc, vars));

const listUserSessionsRef = (dc, vars) => {
  const { dc: instance, vars: inputVars } = validateArgs(connectorConfig, dc, vars);
  instance._useGeneratedSdk();
  return queryRef(instance, 'ListUserSessions', inputVars);
};

exports.listUserSessions = (dc, vars) =>
  executeQuery(listUserSessionsRef(dc, vars));