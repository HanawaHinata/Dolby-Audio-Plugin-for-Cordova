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
 * This class provides the Dolby Audio Processing profiles available to DolbyAudioProcessing API clients.
 * The Dolby Audio Processing profiles on the devices with integrated Dolby technology have Dolby Audio Processing are MOVIE, MUSIC, GAME, and VOICE.
 * DOLBY_PRIVATE_PROFILE is reserved for internal or OEM use only. It can't be selected by setProfile(profile, success, fail) API.
 * DOLBY_PRIVATE_PROFILE is returned by getSelectedProfile(success, fail) if the current system-side profile is the reserved profile.
 * @constructor
 *
 */
var DapProfile = function () {
};

/**
 * Enhances the dialogue focus while providing the best possible representation of the full dynamic range of the program.
 */
DapProfile.MOVIE = "MOVIE";
/**
 * Applies equalization and dynamic range control to enrich instrumental and vocal quality in recorded music.
 */
DapProfile.MUSIC = "MUSIC";
/**
 * Creates a simulated live space to best bring out the effect of fast-moving objects in the audio.
 */
DapProfile.GAME = "GAME";
/**
 *Customized for the reproduction of speech patterns and the tonal range of the human voice.
 */
DapProfile.VOICE = "VOICE";
/**
 * Reserved for internal or OEM use only.
 */
DapProfile.DOLBY_PRIVATE_PROFILE = "DOLBY_PRIVATE_PROFILE";

module.exports = DapProfile;