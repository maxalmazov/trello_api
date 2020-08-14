import { NOTE_MODEL_NAME } from '../models/Note';
import BaseRepository from './BaseRepository';
import { Document } from 'mongoose';
import { DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';

class NoteRepository extends BaseRepository {
  public getAll(): Promise<Document[]> {
    return super.getAll(NOTE_MODEL_NAME);
  }

  public findById(modelId: string): Promise<Document> {
    return super.findById(modelId, NOTE_MODEL_NAME);
  }

  public updateOneById(
    modelId: string,
    modelData,
  ): Promise<UpdateWriteOpResult['result']> {
    return super.updateOneById(modelId, modelData, NOTE_MODEL_NAME);
  }

  public deleteOneById(
    modelId: string,
  ): Promise<DeleteWriteOpResultObject['result'] & { deletedCount?: number }> {
    return super.deleteOneById(modelId, NOTE_MODEL_NAME);
  }
}

export default new NoteRepository();
