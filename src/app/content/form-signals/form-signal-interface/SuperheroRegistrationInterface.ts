export const VEHICLE_TYPES = ['jet', 'horse', 'bicycle', 'tricycle', 'rickshaw-demon', 'wheelchair', 'a lame car', 'a super car'] as const;

export type VehicleType = (typeof VEHICLE_TYPES)[number];

export interface SuperheroRegistrationInterface {
  alias: string;
  realName: string;
  powers: string[];
  weakness: string;
  wearsCape: boolean;
  capeColor: string;
  archEnemy: string;
  liabilityDamage: number;
  registrationDate: Date;
  hasVehicle: boolean;
  vehicle: Vehicle;
}

export interface Vehicle {
  type: VehicleType;
  speed: number;
}
