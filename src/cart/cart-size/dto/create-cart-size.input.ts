import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateCartSizeInput {
  @IsNumber()
  @Field(() => Int)
    size_id: number;

  @IsNumber()
  @Field(() => Int)
    cart_id: number;
}
