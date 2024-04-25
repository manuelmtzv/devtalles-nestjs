import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getTags() {
    return this.tagsService.findAll();
  }

  @Get(':term')
  getTag(@Param('term') term: string) {
    return this.tagsService.findOne(term);
  }

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Patch(':id')
  updateTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagsService.update(id);
  }

  @Delete(':id')
  deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagsService.delete(id);
  }
}
