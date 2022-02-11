import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

	@Get()
	getCategories() {
		return {
			message: 'get categories',
		};
	}

	@Get(':categoryId/products/:productId')
	getCategory(
		@Param('categoryId') categoryId: string,
		@Param('productId') productId: string,
	) {
		return {
			message: `category id: ${categoryId}, product id: ${productId}`,
		};
	}

}
