/**
 * api.js - Central data access layer (currently mock).
 * BACKEND INTEGRATION: Replace each return with a real fetch() call.
 */
import { mockData } from './helpers.js';

export const getSports     = async () => mockData.sports;
export const getInstitutes = async () => mockData.institutes;
export const getSchedule   = async () => mockData.schedule;
export const getMedalTally = async () => mockData.medalTally;
