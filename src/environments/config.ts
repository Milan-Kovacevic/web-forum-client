import developmentConfiguration from "@/environments/config.development.json";

export default () => {
  switch (process.env.NODE_ENV) {
    case "development":
    case "test": {
      return developmentConfiguration;
    }
    case "production": {
      return developmentConfiguration;
    }

    default: {
      throw new Error("NODE_ENV not being set");
    }
  }
};
