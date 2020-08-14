import Models from '../models';
import { Document } from 'mongoose';
import { DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';

class BaseRepository {
  public getAll(modelName: string): Promise<Document[]> {
    const model = Models[modelName];

    return model.find().exec();
  }

  public findById(modelId: string, modelName: string): Promise<Document> {
    const model = Models[modelName];

    return model.findById(modelId).exec();
  }

  public updateOneById(
    modelId: string,
    modelData,
    modelName: string,
  ): Promise<UpdateWriteOpResult['result']> {
    const model = Models[modelName];

    return model.updateOne({ _id: modelId }, modelData).exec();
  }

  public deleteOneById(
    modelId: string,
    modelName: string,
  ): Promise<DeleteWriteOpResultObject['result'] & { deletedCount?: number }> {
    const model = Models[modelName];

    return model.deleteOne({ _id: modelId }).exec();
  }
}

export default BaseRepository;
