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

/**
 * @ngdoc controller
 * @name account.profile.controller:AccountProfileCtrl
 * @description This class is handling the controller for the delete account widget
 * @author Oleksii Orel
 */
class AccountDeleteCtrl {
  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($window) {
    this.$window = $window;
  }

  prepareEmail() {
    this.$window.location.href = 'mailto:cancellation@codenvy.com?subject=' + encodeURIComponent('Account Deletion Request');
  }

}

export default AccountDeleteCtrl;
