/*
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import Register from '../utils/register.js';

/**
 * This class is handling the interface with Installation Manager Server (IMS) part of the API that relates to subscriptions.
 */
class imsSubscriptionApi {

  /**
   * Default constructor for the subscription API.
   * @ngInject for Dependency injection
   */
  constructor($resource) {

    // remote call
    this.remoteImsAPI = $resource('/im', {}, {
      addTrialSubscription: { method: 'POST', url: '/subscription/add/trial' }, // real url not known yet
      checkSubscription: { method: 'GET', url: '/subscription?subscriptionName=:subscriptionName' },
    });
  }

  checkSubscription(subscriptionName) {
    let param = { subscriptionName: subscriptionName };
    let request = this.remoteImsAPI.checkSubscription(param);
    return request.$promise;
  }

  checkOnPremisesSubscription() {
    return checkSubscription('OnPremises');
  }
}

// Register this factory
Register.getInstance().factory('imsSubscriptionApi', imsSubscriptionApi);