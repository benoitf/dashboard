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
 * Defines a directive for displaying factory from project widget.
 * @author Oleksii Orel
 */
class FactoryFromFile {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.restrict = 'E';

    this.templateUrl = 'app/factories/create-factory/config-file-tab/factory-from-file.html';
    this.replace = false;

    this.controller = 'FactoryFromFileCtrl';
    this.controllerAs = 'factoryFromFileCtrl';

    this.bindToController = true;

    // scope values
    this.scope = {
      isImporting: '=cdvyIsImporting',
      factoryContent: '=cdvyFactoryContent'
    };
  }

  link($scope, element) {
    // search the input fields
    let inputElements = element.find('input');

    $scope.clickUpload = function () {
      inputElements.eq(0).click();
    };
  }

}

export default FactoryFromFile;
