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
 * Test of the CodenvyGit
 */
describe('CodenvyGit', function () {

  /**
   * User Factory for the test
   */
  var factory;

  /**
   * API builder.
   */
  var apiBuilder;

  /**
   * Backend for handling http operations
   */
  var httpBackend;

  /**
   * Codenvy backend
   */
  var codenvyBackend;

  /**
   *  setup module
   */
  beforeEach(module('userDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject(function (codenvyGit, codenvyAPIBuilder, codenvyHttpBackend) {
    factory = codenvyGit;
    apiBuilder = codenvyAPIBuilder;
    codenvyBackend = codenvyHttpBackend;
    httpBackend = codenvyHttpBackend.getHttpBackend();
  }));

  /**
   * Check assertion after the test
   */
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  /**
   * Check that we're able to fetch local git url
   */
  it('Fetch local git url', function () {
      // setup tests objects
      var workspaceId = 'workspace123test';
      var projectPath = '/testProject';
      var localUrl = 'http://codenvy.com/git/f1/' + workspaceId + projectPath;

      // providing request
      // add test localUrl on Http backend
      codenvyBackend.addLocalGitUrl(workspaceId, encodeURIComponent(projectPath), localUrl);

      // setup backend
      codenvyBackend.setup();
      codenvyBackend.getLocalGitUrl(workspaceId, encodeURIComponent(projectPath));

      // fetch localUrl
      factory.fetchLocalUrl(workspaceId, projectPath);

      // expecting GETs
      httpBackend.expectGET('/api/git/' + workspaceId + '/read-only-url?projectPath=' + encodeURIComponent(projectPath));

      // flush command
      httpBackend.flush();

      // now, check url
      var url = factory.getLocalUrlByKey(workspaceId, projectPath);

      // check local url
      expect(localUrl).toEqual(url);
    }
  );

  /**
   * Check that we're able to fetch remote git urls
   */
  it('Fetch remote git urls', function () {
      // setup tests objects
      var workspaceId = 'workspace123test';
      var projectPath = '/testProject';
      var remoteArray = [{
        'url': 'https://github.com/test1',
        'name': 'test3'
      }, {
        'url': 'https://github.com/test2',
        'name': 'test1'
      }, {
        'url': 'https://github.com/test3',
        'name': 'test2'
      }];

      // providing request
      // add test remote array with urls on Http backend
      codenvyBackend.addRemoteGitUrlArray(workspaceId, encodeURIComponent(projectPath), remoteArray);

      // setup backend
      codenvyBackend.setup();
      codenvyBackend.getRemoteGitUrlArray(workspaceId, encodeURIComponent(projectPath));

      // fetch localUrl
      factory.fetchRemoteUrlArray(workspaceId, projectPath);

      // expecting POSTs
      httpBackend.expectPOST('/api/git/' + workspaceId + '/remote-list?projectPath=' + encodeURIComponent(projectPath));

      // flush command
      httpBackend.flush();

      // now, check url
      var urlArray = factory.getRemoteUrlArrayByKey(workspaceId, projectPath);
      remoteArray.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });

      // check
      expect(remoteArray.join()).toEqual(urlArray.join());
    }
  );


});
