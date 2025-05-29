import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/database/database.service';
import { booking_status } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createBookingDto: CreateBookingDto) {
    await this.prisma.booking.create({ data: { ...createBookingDto, status: 'BOOKED' } })
    return { success: true, message: "booking successfully" }
  }

  async findAll(page?: number, take?: number, status: booking_status = 'BOOKED') {
    const skip = (page - 1) * take
    const bookings = await this.prisma.booking.findMany({ where: { status }, orderBy: { created_at: 'asc' }, skip: skip || 0, take: take || 10 })
    return { success: true, data: bookings }
  }


  async update(id: number, updateBookingDto: UpdateBookingDto) {
    await this.prisma.booking.update({ where: { id }, data: updateBookingDto })
    return { success: true, message: "updated successfull" }
  }

  async remove(id: number) {
    await this.prisma.booking.delete({ where: { id } })
    return { success: true, message: 'deleted successfully' }
  }
}
