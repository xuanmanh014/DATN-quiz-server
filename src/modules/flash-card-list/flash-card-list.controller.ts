import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { FlashCardListService } from './flash-card-list.service';
import { CreateFlashCardListDto } from './dto/create-flash-card-list.dto';
import { UpdateFlashCardListDto } from './dto/update-flash-card-list.dto';
import { FlashCardList } from './entities/flash-card-list.entity';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';

@Controller('flash-card-list')
export class FlashCardListController {
    constructor(private readonly flashCardListService: FlashCardListService) { }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createFlashCardListDto: CreateFlashCardListDto): Promise<Response<FlashCardList>> {
        const newList = await this.flashCardListService.create(createFlashCardListDto);

        return {
            data: newList,
            message: "Create list success!"
        }
    }

    @Get()
    @UseInterceptors(TransformInterceptor)
    async findAll(): Promise<Response<FlashCardList[]>> {
        const allList = await this.flashCardListService.findAll();
        return {
            data: allList,
            message: "Get all list success!"
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flashCardListService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFlashCardListDto: UpdateFlashCardListDto) {
        return this.flashCardListService.update(+id, updateFlashCardListDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.flashCardListService.remove(+id);
    }
}
