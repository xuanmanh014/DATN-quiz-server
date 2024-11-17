import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Topic, TopicDocument } from './entities/topic.entity';
import { Model } from 'mongoose';
import { GetResponseDto } from '../../common/dtos/response.dto';
import { GetDto } from '../../common/dtos/get.dto';

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

    async findAll(query: GetDto): Promise<GetResponseDto<Topic[]>> {
        try {
            const { search, sortBy, order, page = 1, limit = 10 } = query;
            const filters: any = {};
            const sortOptions = {};
            const skip = (page - 1) * limit;

            if (search) {
                filters.topicName = { $regex: search, $options: 'i' };
            }

            if (sortBy) {
                sortOptions[sortBy] = order === 'desc' ? -1 : 1;
            }

            const topics = await this.topicModel.find()
                .find(filters)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .exec();

            const totalItems = await this.topicModel.countDocuments(filters);

            return {
                data: topics,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            };
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
