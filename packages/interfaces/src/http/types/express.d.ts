// Extend the Request interface to include the traceId property
declare global {
  namespace Express {
    interface Request {
      traceId?: string;
      user?: import("@supabase/supabase-js").User;
    }
  }
}

export {};
