import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';

@Controller('products')
export class ProductsController {

	@Get()
	getProducts(
		@Query('limit') limit = 10,
		@Query('offset') offset = 0,
		@Query('brand') brand = 'XYZ',
	) {
		return {
			message: `products limit: ${limit}, offset: ${offset}, brand: ${brand}`
		};
	}

	@Get('filter')
	getProductFilter() {
		return {
			message: 'get product filter',
		};
	}

	@Get(':productId')
	getProduct(@Param('productId') productId: string) {
		return {
			message: `product id: ${productId}`
		};
	}

	@Post()
	create(@Body() payload: any) {
		return {
			message: 'create product',
			payload,
		};
	}
}
