import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { ClothSexEnum } from '@prisma/client';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(
    @Args('sex', { type: () => ClothSexEnum }) sex: ClothSexEnum,
      @Args('parent_id', { type: () => Int, nullable: true }) parent_id?: number,
  ): Promise<Category[]> {
    return this.categoryService.findAll(sex, parent_id);
  }

  @Query(() => [Category], { name: 'searchCategories' })
  search(
    @Args('sex', { type: () => ClothSexEnum }) sex: ClothSexEnum,
      @Args('search', { type: () => String }) search?: string,
  ): Promise<Category[]> {
    return this.categoryService.search(sex, search);
  }

  @Query(() => Category, { name: 'category', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category | null> {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category, { nullable: true })
  updateCategory(
    @Args('id', { type: () => Int }) id: number,
      @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category | null> {
    return this.categoryService.update(id, updateCategoryInput);
  }

  @Mutation(() => Category)
  removeCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
