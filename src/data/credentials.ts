import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Public test account usernames for Sauce Demo
 * These are documented, demo accounts and do not contain sensitive information
 * Source: https://www.saucedemo.com/
 */
export const USERNAMES = {
  STANDARD: 'standard_user',
  LOCKED_OUT: 'locked_out_user',
  PROBLEM: 'problem_user',
  PERFORMANCE_GLITCH: 'performance_glitch_user',
  ERROR: 'error_user',
  VISUAL: 'visual_user'
} as const;

// Export SAUCE_PASSWORD from .env
export const SAUCE_PASSWORD = process.env.SAUCE_PASSWORD;
if (!SAUCE_PASSWORD) {
  throw new Error('SAUCE_PASSWORD is not defined in the environment variables.');
}