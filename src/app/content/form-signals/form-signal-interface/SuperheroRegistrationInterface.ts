export interface SuperheroRegistrationInterface {
  alias: string;
  realName: string | null;
  superPower: string | null;
  weakness: string;
  wearsCape: boolean;
  archEnemy: string;
  liabilityDamage: number;
  registrationDate: Date;
}
