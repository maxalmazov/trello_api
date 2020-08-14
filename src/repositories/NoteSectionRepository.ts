import { NOTES_SECTION_MODEL_NAME } from '../models/NotesSection';
import BaseRepository from './BaseRepository';
import { Document } from 'mongoose';
import { DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';

class NoteSectionRepository extends BaseRepository {
  public getAll(): Promise<Document[]> {
    return super.getAll(NOTES_SECTION_MODEL_NAME);
  }

  public findById(modelId: string): Promise<Document> {
    return super.findById(modelId, NOTES_SECTION_MODEL_NAME);
  }

  public updateOneById(
    modelId: string,
    modelData,
  ): Promise<UpdateWriteOpResult['result']> {
    return super.updateOneById(modelId, modelData, NOTES_SECTION_MODEL_NAME);
  }

  public deleteOneById(
    modelId: string,
  ): Promise<DeleteWriteOpResultObject['result'] & { deletedCount?: number }> {
    return super.deleteOneById(modelId, NOTES_SECTION_MODEL_NAME);
  }
}

export default new NoteSectionRepository();
