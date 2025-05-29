import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { RegDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }
    async register(body: RegDto) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(body.password, salt)
        await this.prisma.user.create({ data: { ...body, password: hash } })
        return { success: true, message: "register successfully" }
    }

    async login(mobile_no: string, password: string) {
        const user = await this.prisma.user.findFirst({ where: { mobile_no } })
        if (!user) {
            throw new BadRequestException("not a valid number")
        }
        const compare = await bcrypt.compare(password, user.password)
        if (compare) {
            const access_token = await this.jwtService.signAsync(user)
            return { success: true, data: { user, access_token } }
        }
        else {
            return { success: false, message: "Invalid credentials" }
        }
    }
}
