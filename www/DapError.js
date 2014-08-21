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
 * This is the Dolby Audio Processing error object.
 *
 * @constructor
 * @param {Number} code Error code
 * @param {String} message Error message description
 */
var DapError = function (code, message) {
	this.code = code || null;
	this.message = message || '';
};

/**
 * This error returns when Dolby Audio Processing is not available on a device. The error indicates the onFail callback of initialize() API when Dolby Audio Processing is not available on a device.
 */
DapError.DAP_UNAVAILABLE = 1;

/**
 * This error returns when the background Dolby service is not connected. The initialize() API should be called if it occurs. If initialize() API is not invoked, the other APIs return this error .
 * In an unusual scenario (e.g. Android OS memory is used up), if the background Dolby service is restarted, the error can occur before the initialize() API is called to reinitialize Dolby Audio  Processing.
 */
DapError.NOT_CONNECTED = 2;

/**
 * This error returns when when the input parameter is invalid.
 */
DapError.INVALID_PARAM = 3;

/**
 * This error returns when the action is not allowed temporarily, e.g. if the user tries to switch the profile when Dolby Audio Processing is turned off.
 * We recommend first turning on Dolby Audio Processing, then switching the active profile.
 * The dolby.dap.setEnable()/dolby.dap.setProfile() API returns this error code if dolby.dap.suspendSession() API has been called.

--------------------------------------------------------------------------------


 */
DapError.ACTION_NOT_ALLOWED = 4;

/**
 * This error returns when a run-time error occurs, e.g. an Android OS or Dolby service internal error. The error indicates that Dolby Audio Processing is not working correctly.
 */
DapError.RUNTIME_ERR = 5;


module.exports = DapError;