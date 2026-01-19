import { DependencyContainer } from "tsyringe";

import { ProcessFileUseCase } from "./use-cases/file/process.use-case";
import { UpdateProfileUseCase } from "./use-cases/profile/update.use-case";
import { MeUseCase } from "./use-cases/user/me.use-case";
import { SignInUseCase } from "./use-cases/user/signin.use-case";
import { SignUpUseCase } from "./use-cases/user/signup.use-case";

// Register use cases in the DI container
export const registerUseCases = (container: DependencyContainer) => {
  container.register<ProcessFileUseCase>("ProcessFileUseCase", {
    useClass: ProcessFileUseCase,
  });
  container.register<UpdateProfileUseCase>("UpdateProfileUseCase", {
    useClass: UpdateProfileUseCase,
  });

  container.register<MeUseCase>("MeUseCase", {
    useClass: MeUseCase,
  });

  container.register<SignInUseCase>("SignInUseCase", {
    useClass: SignInUseCase,
  });

  container.register<SignUpUseCase>("SignUpUseCase", {
    useClass: SignUpUseCase,
  });

  return container;
};
