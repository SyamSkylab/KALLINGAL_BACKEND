import { booking_status } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    mobile_no: string
    @IsString()
    @IsNotEmpty()
    address: string
    @IsEnum(booking_status)
    @IsOptional()
    status: booking_status
    @IsNumber()
    total_price: number
    @IsObject()
    quantity: object
}
