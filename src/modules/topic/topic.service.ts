import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Topic, TopicDocument } from './entities/topic.entity';
import { Model } from 'mongoose';

@Injectable()
export class TopicService {
    constructor(
        @InjectModel(Topic.name)
        private topicModel: Model<TopicDocument>
    ) { }

    async create(createTopicDto: CreateTopicDto): Promise<Topic> {
        try {
            const newTopic = new this.topicModel(createTopicDto);

            await newTopic.save();

            return newTopic;
        } catch (error) {
            return null;
        }
    }

    async findAll(): Promise<Topic[]> {
        try {
            const topics = await this.topicModel.find();

            return topics;
        } catch (error) {
            return null;
        }
    }

    async findOne(id: string): Promise<Topic> {
        try {
            const topic = await this.topicModel.findById(id);

            if (!topic) throw new NotFoundException();

            return topic;
        } catch (error) {
            return null;
        }
    }

    async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
        try {
            const topic = await this.topicModel.findById(id);

            if (!topic) throw new NotFoundException();

            const updatedTopic = await this.topicModel.findByIdAndUpdate(
                id,
                updateTopicDto,
                { new: true }
            );

            return updatedTopic;
        } catch (error) {
            return null;
        }
    }

    async remove(id: string): Promise<Topic> {
        try {
            const topic = await this.topicModel.findById(id);

            if (!topic) throw new NotFoundException();

            const deletedTopic = await this.topicModel.findByIdAndDelete({ _id: id });

            return deletedTopic;
        } catch (error) {
            return null;
        }
    }
}
