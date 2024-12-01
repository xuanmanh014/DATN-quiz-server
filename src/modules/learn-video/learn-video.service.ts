import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLearnVideoDto } from './dto/create-learn-video.dto';
import { UpdateLearnVideoDto } from './dto/update-learn-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LearnVideo, LearnVideoDocument } from './entities/learn-video.entity';
import { Model } from 'mongoose';
import LearnVideoMapper from './learn-video.mapper';
import { GetResponseDto } from '../../common/dtos/response.dto';
import { GetDto } from '../../common/dtos/get.dto';

@Injectable()
export class LearnVideoService {
    constructor(
        @InjectModel(LearnVideo.name)
        private _model: Model<LearnVideoDocument>
    ) { }

    private _mapper = new LearnVideoMapper();

    async create(createLearnVideoDto: CreateLearnVideoDto): Promise<LearnVideo> {
        try {
            const newLearnVideo = new this._model(createLearnVideoDto);

            await this._mapper.mapFromDto(createLearnVideoDto, newLearnVideo);

            await newLearnVideo.save();

            return newLearnVideo;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async findAll(query: GetDto): Promise<GetResponseDto<LearnVideo[]>> {
        try {
            const { search, sortBy, order, page = 1, limit = 10 } = query;
            const filters: any = {};
            const sortOptions = {};
            const skip = (page - 1) * limit;

            if (search) {
                filters.name = { $regex: search, $options: 'i' };
            }

            if (sortBy) {
                sortOptions[sortBy] = order === 'desc' ? -1 : 1;
            }

            const learnVideos = await this._model
                .find(filters)
                .populate([
                    { path: "video", select: ["filePath", "fileName"] }
                ])
                .sort(sortOptions)
                .skip(skip)
                .exec();

            const totalItems = await this._model.countDocuments(filters);

            return {
                data: learnVideos,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            };
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async findOne(id: string): Promise<LearnVideo> {
        try {
            const learnVideo = await this._model.findById(id)
                .populate([
                    { path: "video", select: ["filePath", "fileName"] }
                ]);

            return learnVideo;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async update(id: string, updateLearnVideoDto: UpdateLearnVideoDto): Promise<LearnVideo> {
        const learnVideo = await this._model.findById(id);

        if (!learnVideo) throw new NotFoundException();

        const updatedLearnVideo = await this._model.findByIdAndUpdate(
            id,
            updateLearnVideoDto,
            { new: true }
        );

        if (!updatedLearnVideo) throw new BadRequestException();

        return updatedLearnVideo;

    }

    async remove(id: string): Promise<LearnVideo> {
        const learnVideo = await this._model.findById(id);

        if (!learnVideo) throw new NotFoundException();

        const deletedVideo = await this._model.findByIdAndDelete({ _id: id });

        if (!deletedVideo) throw new BadRequestException();

        return deletedVideo;
    }
}
