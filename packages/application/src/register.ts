import { DependencyContainer } from "tsyringe";

import { UpdateProfileUseCase } from "./use-cases/profile/update.use-case";
import { SignUpUseCase } from "./use-cases/user/signup.use-case";
import { SignInUseCase } from "./use-cases/user/signin.use-case";
import { MeUseCase } from "./use-cases/user/me.use-case";

// Register use cases in the DI container
export const registerUseCases = (container: DependencyContainer) => {
  container.register<UpdateProfileUseCase>("UpdateProfileUseCase", {
    useClass: UpdateProfileUseCase,
  });

  container.register<SignUpUseCase>("SignUpUseCase", {
    useClass: SignUpUseCase,
  });

  container.register<SignInUseCase>("SignInUseCase", {
    useClass: SignInUseCase,
  });

  container.register<MeUseCase>("MeUseCase", {
    useClass: MeUseCase,
  });

  return container;
};
