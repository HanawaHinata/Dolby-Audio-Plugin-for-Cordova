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
 * Dolby Audio Processing error object
 *
 * @constructor
 * @param {Number} code Error code
 * @param {String} message Error message description 
 */
var DapError = function(code, message) {
    this.code = code || null;
    this.message = message || '';
};

/**
 * Returned when the Dolby Audio Processing is not available on a device. It will be returned in the onFail callback of initialize() API when Dolby Audio Processing is not available on a device. 
 */
DapError.DAP_UNAVAILABLE        = 1;

/**
 * Returned when the background Dolby service is not connected. The initialize() API is suggested to be called if it occurs. API will return this error if initialize() API is not invoked before.
 * In some abnormal scenario (e.g. Android OS memory is used up) the background Dolby service may be restarted, the error occurs before the initialize() API is called to initialize the Dolby Audio Processing again. 
 */
DapError.NOT_CONNECTED          = 2;

/**
 * Returned when the input parameter is invalid. 
 */
DapError.INVALID_PARAM          = 3;

/**
 * Returned when the action is not allowed temporarily, e.g. it will be returned if you try to switch the profile when Dolby Audio Processing is turned off. 
 * It is suggested to turn on Dolby Audio Processing firstly and then switch the active profile. 
 * The dolby.dap.setEnable()/dolby.dap.setProfile() API is going to return this error code if dolby.dap.suspendSession() API has been called.  
 

--------------------------------------------------------------------------------


 */
DapError.ACTION_NOT_ALLOWED     = 4;

/**
 * Returned when a run-time error happened, e.g. Android OS or Dolby service internal error happens. When it happens, the Dolby Audio Processing is not working correctly. 
 */
DapError.RUNTIME_ERR            = 5;


module.exports = DapError;
