import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { CreateTagDto } from './dtos/create-tag.dto';
import { handleDbException } from '@/shared/utils';
import { uniq } from 'ramda';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(term: string) {
    let tag: Tag;

    if (isUUID(term)) {
      tag = await this.tagRepository.findOne({ where: { id: term } });
    } else {
      const query = this.tagRepository.createQueryBuilder('tag');

      tag = await query
        .where('LOWER(name) =LOWER(:term)', {
          term,
        })
        .getOne();
    }

    if (!tag) throw new NotFoundException(`Tag with id ${term} not found`);

    return tag;
  }

  create(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);

    try {
      return this.tagRepository.save(newTag);
    } catch (err: unknown) {
      handleDbException(err, this.logger);
    }
  }

  async findManyOrCreate(tags: string[]) {
    if (!tags.length) return [];

    const foundTags = await this.tagRepository.find({
      where: tags.map((tag) => ({ name: tag })),
    });

    const missingTags: string[] = [];

    uniq(tags).forEach((tag) => {
      if (!foundTags.find((foundTag) => foundTag.name === tag)) {
        missingTags.push(tag);
      }
    });

    if (missingTags.length) {
      const tags = missingTags.map((tag) => ({ name: tag }));

      try {
        const newTags = await this.tagRepository.save(tags);
        foundTags.push(...newTags);
      } catch (err: unknown) {
        handleDbException(err, this.logger);
      }
    }

    return foundTags;
  }

  update(id: string) {
    return `This action updates a ${id} tag`;
  }

  delete(id: string) {
    return `This action removes a ${id} tag`;
  }
}
