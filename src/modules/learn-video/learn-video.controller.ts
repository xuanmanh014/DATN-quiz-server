import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { LearnVideoService } from './learn-video.service';
import { CreateLearnVideoDto } from './dto/create-learn-video.dto';
import { UpdateLearnVideoDto } from './dto/update-learn-video.dto';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';
import { LearnVideo } from './entities/learn-video.entity';
import { GetResponseDto } from '../../common/dtos/response.dto';
import { GetDto } from '../../common/dtos/get.dto';

@Controller('learn-video')
export class LearnVideoController {
    constructor(private readonly learnVideoService: LearnVideoService) { }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createLearnVideoDto: CreateLearnVideoDto): Promise<Response<LearnVideo>> {
        const newLearnVideo = await this.learnVideoService.create(createLearnVideoDto);

        if (!newLearnVideo) throw new BadRequestException();

        return {
            data: newLearnVideo,
            message: "Create new learn video success!"
        }
    }

    @Get()
    @UseInterceptors(TransformInterceptor)
    async findAll(@Query() query: GetDto): Promise<Response<GetResponseDto<LearnVideo[]>>> {
        const learnVideos = await this.learnVideoService.findAll(query);

        if (!learnVideos) throw new BadRequestException();

        return {
            data: learnVideos,
            message: "Get all learn videos success!"
        }
    }

    @Get(':id')
    @UseInterceptors(TransformInterceptor)
    async findOne(@Param('id') id: string): Promise<Response<LearnVideo>> {
        const learnVideo = await this.learnVideoService.findOne(id);

        if (!learnVideo) throw new NotFoundException();

        return {
            data: learnVideo,
            message: "Get learn video success!"
        }
    }

    @Patch(':id')
    @UseInterceptors(TransformInterceptor)
    async update(@Param('id') id: string, @Body() updateLearnVideoDto: UpdateLearnVideoDto): Promise<Response<LearnVideo>> {
        const updatedLearnVideo = await this.learnVideoService.update(id, updateLearnVideoDto);

        if (!updatedLearnVideo) throw new BadRequestException();

        return {
            data: updatedLearnVideo,
            message: "Update learn video success!"
        }
    }

    @Delete(':id')
    @UseInterceptors(TransformInterceptor)
    async remove(@Param('id') id: string): Promise<Response<LearnVideo>> {
        const deletedLearnVideo = await this.learnVideoService.remove(id);

        if (!deletedLearnVideo) throw new BadRequestException();

        return {
            data: deletedLearnVideo,
            message: "Delete learn video success!"
        }
    }
}
