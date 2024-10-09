// Import our crypto shim
import './crypto-shim.js';

// Import the original Kinde module
import * as kindeOriginal from '@kinde-oss/kinde-node-express';

// Export a wrapped version of the Kinde module
export const setupKinde = kindeOriginal.setupKinde;
export const protectRoute = kindeOriginal.protectRoute;
export const getUser = kindeOriginal.getUser;
export const GrantType = kindeOriginal.GrantType;

// Export any other functions you need from kindeOriginal