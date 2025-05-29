import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Public } from 'src/login/public.decorator';
import { booking_status } from '@prisma/client';

@Controller('booking')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }
  @Public()
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll(@Query() { page, take, status }: { page?: string, take?: string, status: booking_status }) {
    return this.bookingService.findAll(+page, +take, status);
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
