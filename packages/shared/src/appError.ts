type AppErrorProps = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

export class AppError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(props: AppErrorProps) {
    super(props.message);
    this.status = props.status ?? 500;
    this.code = props.code;
    this.details = props.details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
