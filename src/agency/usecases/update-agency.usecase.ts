import { Injectable } from '@nestjs/common';
import { AgencyEntity, AgencyRepository, UpdateAgencyDto } from '@lib/modules/agency';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventRepository } from '@lib/modules/event';

@Injectable()
export class UpdateAgencyUseCase extends ExecuteHandler<AgencyEntity> {
	constructor(
		private readonly agencyRepository: AgencyRepository,
		private readonly eventRepository: EventRepository
	) {
		super();
	}

	async execute(id: string, data: UpdateAgencyDto): Promise<AgencyEntity> {
		const { eventIds, ...rest } = data;

		const result = await this.agencyRepository.updateById({ id, data: rest });

		if (eventIds) {
			await Promise.all(
				eventIds.map(async (eventId) =>
					this.eventRepository.findByIdOrThrow({
						id: eventId,
						select: ['id']
					})
				)
			);
			await this.agencyRepository.replaceEvents(id, eventIds);
		}

		return result;
	}
}
