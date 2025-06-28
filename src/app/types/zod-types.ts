/**
 * This file contains type definitions for Zod schemas used throughout the application
 */

import { z } from 'zod';

/**
 * A generic type that can be used as a placeholder for any Zod schema
 * This helps with TypeScript inference when the exact schema is not known
 */
export type anyZodType = z.ZodType<any, any, any>;