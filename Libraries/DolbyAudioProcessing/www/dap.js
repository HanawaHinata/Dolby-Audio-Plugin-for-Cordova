/******************************************************************************
 * This program is protected under international and U.S. copyright laws as
 * an unpublished work. This program is confidential and proprietary to the
 * copyright owners. Reproduction or disclosure, in whole or in part, or the
 * production of derivative works there from without the express permission of
 * the copyright owners is prohibited. 
 *
 *                Copyright (C) 2014 by Dolby Laboratories.
 *                            All rights reserved.
 ******************************************************************************/

/**
 * This class contains information about Dolby Audio Processing.
 * @constructor
 */
var DolbyAudioProcessing = function() {};

var cordova = require('cordova'),
    exec = require('cordova/exec');

DolbyAudioProcessing.prototype = {
    /**
     * The first method to initialize a Dolby Audio Processing. Internally binds to the background Dolby service.
     * 
     * NOTES:
     * 
     * Typically can be called in the Cordova's deviceready event callback function.
     * Defaults to DS enabled, Game Profile upon initialization. The initial profile can be defined by profile parameter.
     * 
     * @param {String} profile Profile used to initialize the Dolby Audio Processing, the Game profile will be used by default if it is null or undefined.
     * @param {Function} success A callback that executes when Dolby Audio Processing is initialized successfully.
     * @param {Function} fail A callback that executes when an error happened during Dolby Audio Processing is initialized, the PluginResult includes the error message.
     * This callback is invoked when Dolby Audio Processing is not available on a device or some internal error happens inside the Dolby service or Android OS.
     * 
     * @example
     *	dolby.dap.initialize(DapProfile.GAME, onSuccess,onFail);
	 *	onSuccess: function() {
	 *		alert("Dolby Audio Processing is ready to use.");
	 *	},
	 *	onFail: function(err) {
	 *		alert(err.message);
	 *	},
     * 
     * @see DapProfile
     * @see DapError
     */
    initialize: function(profile,success,fail) {
        exec(success, fail, "DolbyDapPlugin", "initialize", [profile]);
    },
	
    /**
     * Releases all resources, restoring the Dolby Audio Processing system configuration to the state prior to application control.
     * 
     * After this call, Dolby Audio Processing methods are not accessible.
     * 
     * It is suggested to be called in HTML body's onunload event(when the HTML page is closed).
     * Exactly the release() API is called internally to make sure all of resources will be released when the plug-in was destroyed, it is optional in your code.
     * 
     * @example
     *	dolby.dap.release();
     */
    release: function() {
        exec(null, null, "DolbyDapPlugin", "release", []);
    },
	
    /**
     * Query the enabled state of Dolby Audio Processing.
     * 
     * @param {Function} success A callback that executes when Dolby Audio Processing status is retrieved successfully, the status is included in PluginResult.
     * @param {Function} fail (Optional) A callback that executes when Dolby Audio Processing failed to get the status, the PluginResult would include the error message.
     * The failure callback is invoked when the initialize() API is not called.
     * 
     * @example
     *	dolby.dap.isEnabled(onSuccess,onFail);
	 *	onSuccess: function(value) {
	 *		alert("Dolby Audio Processing is enabled:" + value);
	 *	},
     * 
     * @see DapError
     */
    isEnabled: function(success,fail) {
        exec(success, fail, "DolbyDapPlugin", "isEnabled", []);
    },
	
    /**
     * Enable/disable Dolby Audio Processing.
     * 
     * @param {Boolean} enable the enable/disable state to set Dolby Audio Processing to.
     * @param {Function} success (Optional) A callback that executes when Dolby Audio Processing status is set successfully
     * @param {Function} fail A callback that executes when Dolby Audio Processing failed to set the status, the PluginResult would include the error message.
     * This error callback is invoked if initialize() API is not invoked before, or run-time internal errors occurs.
     * 
     * @example
     *	dolby.dap.setEnabled(true,onSuccess,onFail);
	 *	onSuccess: function() {
	 *		alert("Dolby Audio Processing is truned on.");
	 *	},
     * 
     * @see DapError
     */
    setEnabled: function(enable,success,fail) {
        exec(success, fail, "DolbyDapPlugin", "setEnabled", [enable]);
    },
	
    /** 
     * Gets the selected Dolby Audio Processing profile. 
     * 
     * @param {Function} success A callback that executes when Dolby Audio Processing profile is got successfully, the profile name is included in PluginResult.
     * @param {Function} fail (Optional) A callback that executes when Dolby Audio Processing failed to get the selected profile, the PluginResult would include the error message.
     * This error callback is invoked if initialize() API is not called before.
     * 
     * @example
     *	dolby.dap.getSelectedProfile(onSuccess,onFail);
	 *	onSuccess: function(value) {
	 *		alert("The selected profile is:" + value);
	 *	},
     * 
     * @see DapError
     */
    getSelectedProfile: function(success,fail) {
        exec(success, fail, "DolbyDapPlugin", "getSelectedProfile", []);
    },
	
    /**
     *Select a Dolby Audio Processing profile.
     *
     * @param {String} profile The profile to be selected, except for {@link DapProfile.DOLBY_PRIVATE_PROFILE}. {@link DapProfile.DOLBY_PRIVATE_PROFILE} is reserved for internal or OEM use only.
     * @param {Function} success (Optional) A callback that executes when Dolby Audio Processing profile is activated successfully.
     * @param {Function} fail (Optional) A callback that executes when Dolby Audio Processing failed to set the profile, the PluginResult would include the error (e.g. {@link DapError.NOT_CONNECTED}, {@link DapError.ACTION_NOT_ALLOWED}, {@link DapError.RUNTIME_ERR}).
     * 
     * @example
     *	dolby.dap.setProfile(DapProfile.MOVIE,onSuccess,onFail);
	 *	onSuccess: function() {
	 *		alert("The selected profile is changed.");
	 *	},
     * 
     * @see DapProfile
     * @see DapError
     */
    setProfile: function(profile,success,fail) {
        exec(success, fail, "DolbyDapPlugin", "setProfile", [profile]);
    },
	
    /**
     * Suspends the application Dolby Audio Processing session.
     * 
     * When the application exits the foreground, suspending the application Dolby Audio Processing session and restoring the system-wide configuration.
     * Typically it would be called in the Cordova's pause  event callback function.
     *
     * @example
     *	dolby.dap.suspendSession();
     */
    suspendSession: function() {
        exec(null, null, "DolbyDapPlugin", "suspendSession", []);
    },
	
    /**
     * Resume the application Dolby Audio Processing session.
     * 
     * When the application reenters the foreground, resuming the application Dolby Audio Processing session that is suspended on foreground exit by suspendSession() API.
     * Typically it would be called *in the Cordova's resume event callback function.
     * 
     * @param {Function} success (Optional) A callback that executes when the application configuration is resumed successfully. The getSelectedProfile() API can be invoked to get the selected profile.
     * @param {Function} fail (Optional) A callback that executes when the application configuration failed to be resumed, the PluginResult would include the error ( NOT_CONNECTED or RUNTIME_ERR may happen).
     * 
     * @example
     *	dolby.dap.restartSession(function () {
	 *		dolby.dap.getSelectedProfile(function(value) {
	 *			alert("proflie: " + value);
	 *				}, null);
	 *			},
	 *	null);
     * 
     * @see DapError
     */
    restartSession: function(success,fail) {
        exec(success, fail, "DolbyDapPlugin", "restartSession", []);
    }
};

var dap = new DolbyAudioProcessing();
module.exports = dap;