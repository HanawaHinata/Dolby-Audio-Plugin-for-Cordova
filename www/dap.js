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
var DolbyAudioProcessing = function () {
};

var cordova = require('cordova'),
exec = require('cordova/exec');

DolbyAudioProcessing.prototype = {
	/**
	 * The first method to initialize Dolby Audio Processing. Internally binds to the background Dolby service.
	 *
	 * NOTES:
	 *
	 * This typically can be called in the Cordova's deviceready event callback function.
	 * Defaults to DS enabled, Game profile upon initialization, unless the initial profile is defined by the profile parameter.
	 *
	 * @param {String} profile Profile is used to initialize Dolby Audio Processing; the Game profile is used by default if it is null or undefined.
	 * @param {Function} success This callback executes when Dolby Audio Processing is initialized successfully.
	 * @param {Function} fail This callback executes when an error occurs when Dolby Audio Processing is initialized. The PluginResult includes the {@link DapError.DAP_UNAVAILABLE} message.
	 * This callback is invoked when Dolby Audio Processing is not available on a device or an internal error occurs inside the Dolby service or Android OS.
	 *
	 * @example
	 *	dolby.dap.initialize(dolby.DapProfile.GAME, onSuccess, onFail);
	 *	function onSuccess() {
	 *		alert("Dolby Audio Processing is ready to use.");
	 *	},
	 *	function onFail(err) {
	 *		alert(err.message);
	 *	},
	 *
	 * @see DapProfile
	 * @see DapError
	 */
	initialize: function (profile, success, fail) {
		exec(success, fail, "DolbyDapPlugin", "initialize",[profile]);
	},
	
	/**
	 * Releases all resources, restoring the Dolby Audio Processing system configuration to the state prior to application control.
	 *
	 * After this call, Dolby Audio Processing methods are not accessible.
	 *
	 * We recommend this call in HTML body's onunload event (when the HTML page is closed).
	 * Using release() API makes sure all resources are released when the plug-in is destroyed. This call is optional in your code.
	 *
	 * @example
	 *	dolby.dap.release();
	 */
	release: function () {
		exec(null, null, "DolbyDapPlugin", "release",[]);
	},
	
	/**
	 * Query the enabled state of Dolby Audio Processing.
	 *
	 * @param {Function} success This callback executes when Dolby Audio Processing status is retrieved successfully; the status is included in PluginResult.
	 * @param {Function} fail This callback executes when Dolby Audio Processing failed to get the status, the PluginResult would include the {@link DapError.NOT_CONNECTED} message.
	 * The failure callback is invoked when the initialize() API is not called.
	 *
	 * @example
	 *	dolby.dap.isEnabled(onSuccess, onFail);
	 *	function onSuccess(value) {
	 *		alert("Dolby Audio Processing is enabled:" + value);
	 *	},
	 *
	 * @see DapError
	 */
	isEnabled: function (success, fail) {
		exec(success, fail, "DolbyDapPlugin", "isEnabled",[]);
	},
	
	/**
	 * Enable/disable Dolby Audio Processing.
	 *
	 * @param {Boolean} enable The enable/disable state to set Dolby Audio Processing.
	 * @param {Function} success This callback executes when Dolby Audio Processing status is set successfully
	 * @param {Function} fail This callback executes when Dolby Audio Processing fails to set the status. The PluginResult would include {@link DapError.NOT_CONNECTED} or {@link DapError.ACTION_NOT_ALLOWED} message.
	 * This error callback is invoked if initialize() API is not invoked before the enable/disable call, or run-time internal errors occur.
	 *
	 * @example
	 *	dolby.dap.setEnabled(true,onSuccess, onFail);
	 *	function onSuccess() {
	 *		alert("Dolby Audio Processing is truned on.");
	 *	},
	 *
	 * @see DapError
	 */
	setEnabled: function (enable, success, fail) {
		exec(success, fail, "DolbyDapPlugin", "setEnabled",[enable]);
	},
	
	/**
	 * Applies the selected Dolby Audio Processing profile.
	 *
	 * @param {Function} success A callback that executes when a Dolby Audio Processing profile is applied successfully. The profile name is included in PluginResult.
	 * @param {Function} fail A callback that executes when Dolby Audio Processing failed to apply the selected profile. The PluginResult would include the {@link DapError.NOT_CONNECTED} message.
	 * This error callback is invoked if initialize() API is not called before the background Dolby service connects. 
	 *
	 * @example
	 *	dolby.dap.getSelectedProfile(onSuccess, onFail);
	 *	function onSuccess(value) {
	 *		alert("The selected profile is:" + value);
	 *	},
	 *
	 * @see DapError
	 */
	getSelectedProfile: function (success, fail) {
		exec(success, fail, "DolbyDapPlugin", "getSelectedProfile",[]);
	},
	
	/**
	 *Select a Dolby Audio Processing profile.
	 *
	 * @param {String} profile Specifies the profile selection.
	 * Exception: {@link DapProfile.DOLBY_PRIVATE_PROFILE}. {@link DapProfile.DOLBY_PRIVATE_PROFILE} is reserved for internal or OEM use only.
	 * @param {Function} success This callback executes when Dolby Audio Processing profile activates successfully.
	 * @param {Function} fail This callback executes when Dolby Audio Processing fails to set the profile. The PluginResult includes an error message, {@link DapError.NOT_CONNECTED}, {@link DapError.ACTION_NOT_ALLOWED}, or {@link DapError.RUNTIME_ERR}.
	 *
	 * @example
	 *	dolby.dap.setProfile(dolby.DapProfile.MOVIE, onSuccess, onFail);
	 *	function onSuccess() {
	 *		alert("The selected profile is changed.");
	 *	},
	 *
	 * @see DapProfile
	 * @see DapError
	 */
	setProfile: function (profile, success, fail) {
		exec(success, fail, "DolbyDapPlugin", "setProfile",[profile]);
	},
	
	/**
	 * Suspends the application Dolby Audio Processing session.
	 *
	 * When the application exits the foreground, this suspends the application Dolby Audio Processing session and restores the system-wide configuration.
	 * Typically it would be called in the Cordova's pause  event callback function.
	 *
	 * @example
	 *	dolby.dap.suspendSession();
	 */
	suspendSession: function () {
		exec(null, null, "DolbyDapPlugin", "suspendSession",[]);
	},
	
	/**
	 * Resumes the application Dolby Audio Processing session.
	 *
	 * When the application reenters the foreground, this call resumes the application Dolby Audio Processing session that was suspended on foreground exit by suspendSession() API.
	 * Typically it would be called in the Cordova's resume event callback function.
	 *
	 * @param {Function} success This callback executes when the application configuration is resumed successfully. The getSelectedProfile() API can be invoked to get the selected profile.
	 * @param {Function} fail A callback that executes when the application configuration failed to resume.  The PluginResult would include the error {@link DapError.NOT_CONNECTED} or {@link DapError.RUNTIME_ERR}.
	 *
	 * @example
	 *	dolby.dap.restartSession(function () {
	 *		dolby.dap.getSelectedProfile(function(value) {
	 *			alert("proflie: " + value);
	 *				}, null);
	 *			}, null);
	 *
	 * @see DapError
	 */
	restartSession: function (success, fail) {
		exec(success, fail, "DolbyDapPlugin", "restartSession",[]);
	}
};

var dap = new DolbyAudioProcessing();
module.exports = dap;