import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { RolePermissionsModule } from './role_permissions/role_permissions.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ProductModule, CategoriesModule, RolePermissionsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
