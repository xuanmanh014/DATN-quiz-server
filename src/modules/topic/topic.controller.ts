import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, BadRequestException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';
import { Topic } from './entities/topic.entity';
import { TopicService } from './topic.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) { }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createTopicDto: CreateTopicDto): Promise<Response<Topic>> {
        const newTopic = await this.topicService.create(createTopicDto);

        if (!newTopic) throw new BadRequestException();

        return {
            data: newTopic,
            message: "Create new topic success!"
        };
    }

    @Get()
    async findAll(): Promise<Response<Topic[]>> {
        const topics = await this.topicService.findAll();

        if (!topics) throw new BadRequestException();

        return {
            data: topics,
            message: "Get all topics success!"
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Response<Topic>> {
        const topic = await this.topicService.findOne(id);

        if (!topic) throw new BadRequestException();

        return {
            data: topic,
            message: "Get topic success!"
        };
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto): Promise<Response<Topic>> {
        const updatedTopic = await this.topicService.update(id, updateTopicDto);

        if (!updatedTopic) throw new BadRequestException();

        return {
            data: updatedTopic,
            message: "Update topic success!"
        };
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(TransformInterceptor)
    async remove(@Param('id') id: string): Promise<Response<Topic>> {
        const deletedTopic = await this.topicService.remove(id);

        if (!deletedTopic) throw new BadRequestException();

        return {
            data: deletedTopic,
            message: "Delete topic success!"
        };
    }
}
