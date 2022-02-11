import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {

	@Get()
	getOrders() {
		return {
			message: 'get orders',
		};
	}

}
