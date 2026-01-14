type EmbarkedTask = {
  id: string;
  embarked_date: Date;
  status?: "pending" | "embarked";
};
const isEmbarkedTask = (task: unknown): task is EmbarkedTask => {
  return typeof task === "object" && task !== null && "embarked_date" in task;
};

type MobTask = {
  id: string;
  manpower_deadline: number[];
};
const isMobTask = (task: unknown): task is MobTask => {
  return (
    typeof task === "object" && task !== null && "manpower_deadline" in task
  );
};

const fetchEmbarkedTasks = async (): Promise<EmbarkedTask[]> => [
  {
    id: "1234",
    embarked_date: new Date(),
  },
];
const fetchMobTasks = async (): Promise<MobTask[]> => [
  {
    id: "1234",
    manpower_deadline: [0.4, 0.1, 0.89],
  },
];

const fetchTasks = async () => {
  const tasks = await Promise.all([fetchEmbarkedTasks(), fetchMobTasks()]);
  return tasks.flat();
};

const fetchPendingTasks = async () => {
  const tasks = await fetchTasks();
  const pendingEmbarkTasks = tasks.reduce<EmbarkedTask[]>((acc, task) => {
    if (isEmbarkedTask(task) && task.embarked_date.getTime() < Date.now()) {
      task.status = "pending";
      acc.push(task);
    }
    return acc;
  }, []);

  console.log(pendingEmbarkTasks);
};

type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};
type TSharedShape = {
  singleton: boolean;
  strictVersion: string;
};
type TShared = string[] | Record<string, MakeOptional<TSharedShape>>;
type RemoteConfig = {
  name: string;
  shared: TShared;
  exposes: Record<string, string>;
  remotes?: Record<string, string>;
};

const remoteWalletConfig = {
  name: "xpto",
  shared: ["react"],
  exposes: {
    "./Wallet": "./src/features/Wallet",
  },
} satisfies RemoteConfig;

const remoteProductViewConfig = {
  name: "xpto",
  shared: {
    react: {
      singleton: true,
    },
  },
  exposes: {
    "./ProductView": "./src/features/ProductView",
  },
  remotes: {
    Wallet: "http://localhost:",
  },
} satisfies RemoteConfig;

remoteWalletConfig.shared.map((item) => console.log(item));
// remoteProductViewConfig.shared.map()// error because shared is an object
