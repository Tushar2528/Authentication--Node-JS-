declare module 'mongoose-findorcreate' {
    import { Model, Document, Schema } from 'mongoose';
  
    function findOrCreate<T extends Document>(
      condition: object,
      callback: (err: any, document: T, created: boolean) => void
    ): void;
  
    interface MongooseFindOrCreatePluginOptions {
      errorOnCreate: boolean;
    }
  
    function findOrCreatePlugin(schema: Schema, options?: MongooseFindOrCreatePluginOptions): void;
  
    export { findOrCreate, findOrCreatePlugin };
  }
  