export type TSession = {
  access_token: string;
  refresh_token: string;
};

export type TProfile = {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  storageUsed: bigint;
  storageLimit: bigint;
  createdAt: Date;
  updatedAt: Date;
};

export class ProfileEntity {
  public readonly id: string;
  public email: string;
  public fullName?: string;
  public avatarUrl?: string;
  public storageUsed: bigint;
  public storageLimit: bigint;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: TProfile) {
    this.id = props.id;
    this.email = props.email;
    this.fullName = props.fullName;
    this.avatarUrl = props.avatarUrl;
    this.storageUsed = props.storageUsed;
    this.storageLimit = props.storageLimit;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
