/******************************************************************************
 * This program is protected under international and U.S. copyright laws as
 * an unpublished work. This program is confidential and proprietary to the
 * copyright owners. Reproduction or disclosure, in whole or in part, or the
 * production of derivative works therefrom without the express permission of
 * the copyright owners is prohibited. 
 *
 *                Copyright (C) 2014 by Dolby Laboratories.
 *                            All rights reserved.
 ******************************************************************************/
package com.dolby.dax;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import java.lang.reflect.Method;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.Config;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dolby.dap.DolbyAudioProcessing.PROFILE;
import com.dolby.dap.DolbyAudioProcessing;
import com.dolby.dap.OnDolbyAudioProcessingEventListener;


public class DolbyDapPlugin extends CordovaPlugin implements OnDolbyAudioProcessingEventListener {

    protected static final String LOG_TAG = "DolbyDapPlugin";
    
    private static final String STRING_NULL     = "null";
    
    /* DS PROFILE */
    private static final String PROFILE_MOVIE   = "MOVIE";
    private static final String PROFILE_MUSIC   = "MUSIC";
    private static final String PROFILE_GAME    = "GAME";
    private static final String PROFILE_VOICE   = "VOICE";
    private static final String DOLBY_PROFILE_PRIVATE = "DOLBY_PRIVATE_PROFILE";
    
    /* DapError error code */
    public class DapError {
        /* DS is not available on a device. */
        public static final int DAP_UNAVAILABLE     = 1;
        /* The background Dolby service is not connected. The initialize() API is suggested to be called if it occurs. */
        public static final int NOT_CONNECTED		= 2;
        /* The input parameter is invalid. */
        public static final int INVALID_PARAM		= 3;
        /* The action is not allowed temporarily, e.g. it will be returned if you try to switch the profile when DS is turned off. It is suggested to turn on Dolby Audio Processing firstly and then switch the active profile. */
        public static final int ACTION_NOT_ALLOWED  = 4;
        /* A run-time error happened, e.g. Android OS or Dolby service internal error happens. When it happens, the Dolby Audio Processing is not working correctly. */
        public static final int RUNTIME_ERR			= 5;
    };
    
    /* API Strings */
    private static final String DOLBY_INIT_DAP              = "initialize";
    private static final String DOLBY_RELEASE               = "release";
    private static final String DOLBY_GET_ENABLED           = "isEnabled";
    private static final String DOLBY_SET_ENABLED           = "setEnabled";
    private static final String DOLBY_GET_SELECTED_PROFILE  = "getSelectedProfile";
    private static final String DOLBY_SET_PROFILE           = "setProfile";
    private static final String DOLBY_SUSPEND               = "suspendSession";
    private static final String DOLBY_RESUME                = "restartSession";
    
    private CallbackContext mConnCallbackContext          = null;

    private DolbyAudioProcessing mDolbyAudioProcessing      = null;
	private boolean mDolbyAudioProcessingConnected          = false;
	
	
    /**
     * Executes the request and returns PluginResult.
     * JavaScript has no pause/restart, only Android Activity has the lifecycle
     *
     * @param action        The action to execute.
     * @param args          JSONArry of arguments for the plugin.
     * @param callbackId    The callback id used when calling back into JavaScript.
     * @return              A PluginResult object with a status and message.
     */
    //public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
    	
        PluginResult result     = null;
        
		/* initialize(profile, success, fail) */
        if (DOLBY_INIT_DAP.equals(action)) {
            String profile = args.getString(0);
            if ((null == profile) || (STRING_NULL.equals(profile))) {
                profile = PROFILE_GAME;
            }
    		Log.d(LOG_TAG,"->execute" + DOLBY_INIT_DAP + ", profile = " + profile);
    		final String p = profile;
    		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsInit(cordova.getActivity(), p.toUpperCase(), callbackContext);
                }
    		});
            
            
            return true;
		/* release() */
        } else if (DOLBY_RELEASE.equals(action)) {
    		Log.d(LOG_TAG,"->execute" + DOLBY_RELEASE);
    		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsRelease();
                }
    		});
            
            return true;
		/* isEnabled(success, fail) */
        } else if (DOLBY_GET_ENABLED.equals(action)) {
     		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsIsEnabled(callbackContext);
                }
    		});
            
            return true;
		/* setEnabled(on, success, fail) */
        } else if (DOLBY_SET_ENABLED.equals(action)) {
            final boolean enable = args.getBoolean(0);
    		Log.d(LOG_TAG,"->execute" + DOLBY_SET_ENABLED + ", enable = " + enable);
    		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsSetEnable(enable, callbackContext);
                }
    		});
            
            return true;
		/* getSelectedProfile(success, fail) */
        } else if (DOLBY_GET_SELECTED_PROFILE.equals(action)) {
    		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsGetProfile(callbackContext);
                }
    		});
            
            return true;
		/* setProfile(profile, success, fail) */
        } else if (DOLBY_SET_PROFILE.equals(action)) {
            final String profile = args.getString(0);
    		Log.d(LOG_TAG,"->execute" + DOLBY_SET_PROFILE + ", profile = " + profile);
    		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsSetProfile(profile.toUpperCase(), callbackContext);
                }
    		});
            
            return true;
		/* suspendSession() */
        } else if (DOLBY_SUSPEND.equals(action)) {
    		Log.d(LOG_TAG,"->execute" + DOLBY_SUSPEND);
    		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsSuspendSession();
                }
    		});
            
            return true;
		/* restartSession() */
        } else if (DOLBY_RESUME.equals(action)) {
    		Log.d(LOG_TAG,"->execute" + DOLBY_RESUME);
    		cordova.getThreadPool().execute( new Runnable() {
                public void run() {
                    dsRestartSession(callbackContext);
                }
    		});
            
            return true;
        } else { // Unrecognized action.
        	callbackContext.error("Invalid action");
            return false;
        }
    }
    
    private boolean checkDsStatus() {
        return ((null != mDolbyAudioProcessing) && (mDolbyAudioProcessingConnected));
    }
    
    private String profileidToString(PROFILE id) {
        String profile = null;
        
        switch (id) {
        case MOVIE:
            profile = PROFILE_MOVIE;
            break;
        case MUSIC:
            profile = PROFILE_MUSIC;
            break;
        case GAME:
            profile = PROFILE_GAME;
            break;
        case VOICE:
            profile = PROFILE_VOICE;
            break;
        case DOLBY_PRIVATE_PROFILE:
            profile = DOLBY_PROFILE_PRIVATE;
            break;
        default:
            profile = null;
            break;
        }
        
        return profile;
    }
    
    private void sendErrorResult(int errorcode, CallbackContext cb) {
        PluginResult result = new PluginResult(PluginResult.Status.ERROR, this.getDapErrorObject(errorcode));
        cb.sendPluginResult(result);
    }

    /**
     * Creates a JSONObject with the current error information
     *
     * @param code          DapError error code
     * @return a JSONObject containing the 'error code' & 'error message' information
     */
    private JSONObject getDapErrorObject(int code) {
        JSONObject obj = new JSONObject();
        String message = "";
        
        switch (code) {
        case DapError.DAP_UNAVAILABLE:
            message = "Dolby Audio Processing is not available on a device.";
            break;
        case DapError.NOT_CONNECTED:
            message = "The background Dolby service is not connected. The initialize() API is suggested to be called if it occurs.";
            break;
        case DapError.INVALID_PARAM:
            message = "The input parameter is invalid.";
            break;
        case DapError.ACTION_NOT_ALLOWED:
            message = "The action is not allowed temporarily.";
            break;
        case DapError.RUNTIME_ERR:
            message = "A run-time error happened, e.g. Android OS or Dolby service internal error happens. When it happens, the Dolby Audio Processing is not working correctly.";
            break;
        default:
            break;
        }
        
        try {
            obj.put("code", code);
            obj.put("message", message);
        } catch (JSONException e) {
            Log.e(LOG_TAG, e.getMessage(), e);
        }
        
        return obj;
    }
    
    /**
     * The final call you receive before your activity is destroyed.
     */
    public void onDestroy() {
    	dsRelease();
    }
    
    private boolean isProfileValid(String profile) {
        return (PROFILE_MOVIE.equals(profile))
				|| (PROFILE_MUSIC.equals(profile))
				|| (PROFILE_GAME.equals(profile))
				|| (PROFILE_VOICE.equals(profile));
    }
	
	private void dsInit(Context ctx, String profile, CallbackContext cb)
	{
        if (this.isProfileValid(profile)) {
            mConnCallbackContext = cb;
            
            if (null == mDolbyAudioProcessing) {
                try{
                    PROFILE p = PROFILE.valueOf(profile);
                    mDolbyAudioProcessing = DolbyAudioProcessing.getDolbyAudioProcessing(ctx, p, this);
                    
                    if (null == mDolbyAudioProcessing) {
                        this.sendErrorResult(DapError.DAP_UNAVAILABLE, cb);
                    }
                } catch (IllegalStateException ex) {
                    handleException(ex, cb);
                } catch (IllegalArgumentException ex) {
                    handleException(ex, cb);
                } catch (RuntimeException ex) {
                    handleException(ex, cb);
                }
            } else if (mDolbyAudioProcessingConnected) {
                mConnCallbackContext.success();
            }
        } else {
            this.sendErrorResult(DapError.INVALID_PARAM, cb);
        }
	}
	
    private void dsRelease()
    {
        if (mDolbyAudioProcessing != null) {
            try {
                mDolbyAudioProcessing.release();
                mDolbyAudioProcessing = null;
                mDolbyAudioProcessingConnected = false;
                mConnCallbackContext  = null;
            } catch (IllegalStateException ex) {
            	handleException(ex);
            } catch (RuntimeException ex) {
            	handleException(ex);
            }
        }
    	
    }
    
    private void dsIsEnabled(CallbackContext cb) {
    	
        if (this.checkDsStatus()) {
            try{
                boolean enabled = mDolbyAudioProcessing.isEnabled();
                
                PluginResult result = new PluginResult(PluginResult.Status.OK, enabled);
                cb.sendPluginResult(result);
            } catch (IllegalStateException ex) {
                handleException(ex, cb);
            } catch (RuntimeException ex) {
                handleException(ex, cb);
            }
        } else {
            this.sendErrorResult(DapError.NOT_CONNECTED, cb);
        }
    }
    
    private void dsSetEnable(boolean enable, CallbackContext cb) {
    	
        if (this.checkDsStatus()) {
            try {
                // Enable/disable Dolby Audio Processing 
                mDolbyAudioProcessing.setEnabled(enable);
                cb.success();
            } catch (IllegalStateException ex) {
                handleException(ex, cb);
            } catch (UnsupportedOperationException ex) {
                this.sendErrorResult(DapError.ACTION_NOT_ALLOWED, cb);
            } catch (RuntimeException ex) {
                handleException(ex, cb);
            }
        } else {
            this.sendErrorResult(DapError.NOT_CONNECTED, cb);
        }
    }
    
    private void dsGetProfile(CallbackContext cb) {
    	
        if (this.checkDsStatus()) {
            try {
                PROFILE profileId   = mDolbyAudioProcessing.getSelectedProfile();
                String profile      = this.profileidToString(profileId);
                
                if (null == profile) {
                    this.sendErrorResult(DapError.RUNTIME_ERR, cb);
                } else {
                    PluginResult result = new PluginResult(PluginResult.Status.OK, profile);
                    cb.sendPluginResult(result);
                }
            } catch (IllegalStateException ex) {
                handleException(ex, cb);
            } catch (RuntimeException ex) {
                handleException(ex, cb);
            }
        } else {
            this.sendErrorResult(DapError.NOT_CONNECTED, cb);
        }
    }
    
    private void dsSetProfile(String profile, CallbackContext cb) {
    	
        if (this.checkDsStatus()) {
            if (this.isProfileValid(profile)) {
                PROFILE profileId = PROFILE.valueOf(profile);
                try {
                    mDolbyAudioProcessing.setProfile(profileId);
                    cb.success();
                } catch (IllegalStateException ex) {
                    this.sendErrorResult(DapError.ACTION_NOT_ALLOWED, cb);
                } catch (IllegalArgumentException ex) {
                    handleException(ex, cb);
                } catch (UnsupportedOperationException ex) {
                    this.sendErrorResult(DapError.ACTION_NOT_ALLOWED, cb);
                } catch (RuntimeException ex) {
                    handleException(ex, cb);
                }
            } else {
                this.sendErrorResult(DapError.INVALID_PARAM, cb);
            }
        } else {
            this.sendErrorResult(DapError.NOT_CONNECTED, cb);
        }
    }
    
    private void dsSuspendSession() {
    	
        if (this.checkDsStatus()) {
            try{
            	Log.d(LOG_TAG,"calling suspendSession");
                mDolbyAudioProcessing.suspendSession();
            } catch (IllegalStateException ex) {
                handleException(ex);
            } catch (RuntimeException ex) {
                handleException(ex);
            }
        } else {
            //this.sendErrorResult(DapError.NOT_CONNECTED, cb);
            // do nothing...
        }
    }
    
    private void dsRestartSession(CallbackContext cb) {
    	
        if (this.checkDsStatus()) {
            try{
            	Log.d(LOG_TAG,"calling restartSession");
                mDolbyAudioProcessing.restartSession();
                cb.success();
            } catch (IllegalStateException ex) {
                handleException(ex);
            } catch (RuntimeException ex) {
                handleException(ex);
            }
        } else {
            this.sendErrorResult(DapError.NOT_CONNECTED, cb);
            // do nothing...
        }
    }
    
    private void handleException(Exception ex) {
        handleException(ex, null);
    }
    
    private void handleException(Exception ex, CallbackContext cb) {
        Log.e(LOG_TAG, Log.getStackTraceString(ex));
        if (null != cb) {
            this.sendErrorResult(DapError.RUNTIME_ERR, cb);
        }
    }
	
    public boolean dsSupported() {
        return mDolbyAudioProcessing != null ? true : false;
    }
    
    public boolean dsInitialized() {
        return mDolbyAudioProcessingConnected;
    }
    
    
    /* Override methods in OnDolbyAudioProcessingEventListener */
    @Override
	public void onDolbyAudioProcessingClientConnected() {
    	Log.d(LOG_TAG,"onDolbyAudioProcessingClientConnected is received");
    	mDolbyAudioProcessingConnected = true;
        mConnCallbackContext.success();
	}

	@Override
	public void onDolbyAudioProcessingClientDisconnected() {
    	Log.e(LOG_TAG,"onDolbyAudioProcessingClientConnected is received");
		// Application's Dolby Audio Processing handle has been abnormally disconnected from the system service
        mDolbyAudioProcessing = null;
        mDolbyAudioProcessingConnected = false;
        mConnCallbackContext  = null;
	}

	@Override
	public void onDolbyAudioProcessingEnabled(boolean on) {
		// Called when the system Dolby Audio Processing has been set 
        // by another running application.
		Log.d(LOG_TAG,"onDolbyAudioProcessingEnabled is received : "+on);
	}

	@Override
	public void onDolbyAudioProcessingProfileSelected(PROFILE profile) {
		// Called when the system Dolby Audio Processing profile has been selected 
        // by another running application.
		Log.d(LOG_TAG,"onDolbyAudioProcessingProfileSelected is received : "+profile);
	}
    
}
