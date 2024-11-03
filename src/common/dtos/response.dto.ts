import { IsNumber, IsOptional, IsString } from "class-validator";

export class ResponseDto<T> {
    @IsOptional()
    data: T | T[];
}

export class GetResponseDto<T> extends ResponseDto<T> {
    @IsOptional()
    @IsNumber()
    totalItems: number;

    @IsOptional()
    @IsNumber()
    totalPages: number;

    @IsOptional()
    @IsNumber()
    currentPage: number;
}