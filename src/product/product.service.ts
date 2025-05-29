import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    await this.prisma.product.create({ data: createProductDto })
    return { success: true, message: "product successfully created" }
  }

  async findAll() {
    const products = await this.prisma.product.findMany()
    return { success: true, data: products }
  }



  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.prisma.product.update({ where: { id }, data: updateProductDto })
    return { success: true, message: "updated successfully" }
  }

  async remove(id: number) {
    await this.prisma.product.delete({ where: { id } })
    return { success: true, message: "successfully deleted" }
  }
}